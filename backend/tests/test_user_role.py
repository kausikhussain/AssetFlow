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
