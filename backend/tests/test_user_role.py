from app.models.user import UserRole

def test_user_role_enum():
    assert UserRole.ADMIN == "ADMIN"
    assert UserRole.ASSET_MANAGER == "ASSET_MANAGER"
    assert UserRole.DEPARTMENT_HEAD == "DEPARTMENT_HEAD"
    assert UserRole.EMPLOYEE == "EMPLOYEE"

    roles = [role.value for role in UserRole]
    assert "ADMIN" in roles
    assert "EMPLOYEE" in roles
    assert "super_admin" not in roles

import pytest
from sqlalchemy.future import select
from app.models.user import User, UserRole
from app.crud import user as crud_user
from app.schemas.user import UserCreate

@pytest.mark.asyncio
async def test_user_signup_default_role(db):
    user_in = UserCreate(
        email="new_emp@example.com",
        password="secret_password",
        full_name="New Employee"
    )
    
    def run_create(sync_db):
        return crud_user.create(sync_db, obj_in=user_in)
        
    new_user = await db.run_sync(run_create)
    
    assert new_user.id is not None
    assert new_user.email == "new_emp@example.com"
    assert new_user.role == UserRole.EMPLOYEE
    
    # Verify it is persisted correctly in the database
    await db.commit()
    
    # Retrieve it back
    result = await db.execute(select(User).where(User.id == new_user.id))
    persisted_user = result.scalars().first()
    assert persisted_user is not None
    assert persisted_user.role == UserRole.EMPLOYEE
