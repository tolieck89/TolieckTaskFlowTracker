import {Table, Select, Tag} from 'antd';
import { useAppSelector, useAppDispatch  } from '../../app/hooks';
import { updateUserRole } from './userSlice';

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
    console.log('currentUser:', currentUser);


    const columns = [

        {title: "Ім'я", dataIndex: 'name', key: 'name'},
        {title: "Email", dataIndex: 'email', key: 'email'},
        {
            title: "Роль",
            dataIndex: 'role',
            key: 'role',
            render: (role, record) => 
        
            isAdmin && record.email !== currentUser.email ? (
                    <Select
                    value={role}
                    onChange={(newRole) => {
                      console.log('➡️ New Role:', newRole, 'для', record.name)  
                        dispatch(updateUserRole({id: record.id, role: newRole }))
                    }}
                    >
                        <Select.Option value='admin'>Admin</Select.Option>
                        <Select.Option value='user'>User</Select.Option>
                        <Select.Option value='watcher'>Watcher</Select.Option>
                    </Select>
                ) : (
                    <Tag color={roleColors[role]} dataSource={users} rowKey='id' />
                ),
        },
       

    ];

    return (
        <Table columns={columns} dataSource={users} rowKey="id" />
    );
}

export default UserList;
