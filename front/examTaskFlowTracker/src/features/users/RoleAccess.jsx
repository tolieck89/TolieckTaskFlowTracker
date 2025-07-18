import { useSelector } from 'react-redux';

const RoleAccess = ({ allowedRoles, children, fallback = null }) => {
  const role = useSelector((state) => state.auth.user?.role);
  return allowedRoles.includes(role) ? children : fallback;
};

export default RoleAccess;
