import { useSelector } from 'react-redux';

const RoleAccess = ({ allowedRoles, children }) => {
  const role = useSelector((state) => state.auth.user.role);

  if (!allowedRoles.includes(role)) return null;

  return children;
};

export default RoleAccess;
