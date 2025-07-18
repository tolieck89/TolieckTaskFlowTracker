import {Table, Select, Tag} from 'antd';
import { useAppSelector, useAppDispatch  } from '../../app/hooks';
import { updateUserData, fetchUsers } from './userSlice';
import { updateUser } from '../auth/authSlice';
import {useEffect } from 'react';
import { isSuperadmin, SUPERADMIN_EMAIL } from '../../constants/roles';




const roleColors= {
    admin: "gold",
    user: "green",
    watcher: "blue",
};


const UserList = () => {


    const currentUser = useAppSelector((state) => state.auth.user);
    const users = useAppSelector((state) => state.users.list);
    const dispatch = useAppDispatch();
    const isAdmin = currentUser?.role === 'admin';



    
    useEffect(() => {
    dispatch(fetchUsers());
    }, [dispatch]);



    const isSuper = isSuperadmin(currentUser);

    const allowedRoles = (targetUser) => {
    if (isSuper) return ['admin', 'user', 'watcher'];
    if (isAdmin) {
        if (targetUser.email === SUPERADMIN_EMAIL) return [];
        return ['user', 'watcher'];
    }
    return [];
    };
      

const columns = [

    {title: "Ім'я", dataIndex: 'name', key: 'name'},
    {title: "Email", dataIndex: 'email', key: 'email'},
    {
    title: "Роль",
    dataIndex: 'role',
    key: 'role',
    render: (role, record) => {
  const availableRoles = allowedRoles(record);



  return availableRoles.length > 0 && record.email !== currentUser.email ? (
    <Select
      value={role}
      onChange={(newRole) => {
        dispatch(updateUserData({ id: record.id, updatedData: { role: newRole } }));
        if (record.id === currentUser.id) {
          dispatch(updateUser({ role: newRole })); 
        }
      }}
    >
      {availableRoles.map((r) => (
        <Select.Option key={r} value={r}>{r}</Select.Option>
      ))}
    </Select>
  ) : (
    <Tag color={roleColors[role]}>{role}</Tag>
  );
}
}
];

    return (
        <Table columns={columns} dataSource={users} rowKey="id" />
    );
}

export default UserList;
