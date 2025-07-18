import UserList from "../features/users/UserList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../features/users/userSlice";

const UsersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div style={{ padding: 24 }}>
        <h2>Користувачі:</h2>
      <UserList />
    </div>
  );
};

export default UsersPage;
