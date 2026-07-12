import enum
from sqlalchemy import Column, Integer, String, Boolean, Enum
from app.db.base_class import Base

class UserRole(str, enum.Enum):
    admin = "admin"
    asset_manager = "asset_manager"
    department_head = "department_head"
    employee = "employee"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    role = Column(Enum(UserRole), default=UserRole.employee, nullable=False)
    is_active = Column(Boolean, default=True)
