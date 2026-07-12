from typing import Generator
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core import exceptions
from app.db.session import SessionLocal
from app.models.user import User, UserRole
from app import crud, schemas

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = schemas.TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise exceptions.CredentialsException()
    
    user = crud.user.get(db, id=int(token_data.sub))
    if not user:
        raise exceptions.CredentialsException(detail="User not found")
    return user

def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not crud.user.is_active(current_user):
        raise exceptions.CredentialsException(detail="Inactive user")
    return current_user

def require_role(roles: list[UserRole]):
    def role_checker(current_user: User = Depends(get_current_active_user)) -> User:
        if current_user.role not in roles:
            raise exceptions.PermissionDeniedException()
        return current_user
    return role_checker
