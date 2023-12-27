import { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from './Admin';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/telegram/users');
                setUsers(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        setEditingUserId(userId);
    };

    const handleSave = async (userId) => {
        const userToEdit = users.find((user) => user.userId === userId);

        try {
            await axios.put(import.meta.env.VITE_BACKEND_URL + `/telegram/${userId}`, {
                location: userToEdit.location,
            });
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/telegram/users');
            setUsers(response.data);
            setEditingUserId(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + `/telegram/${userId}`);
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/telegram/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <Admin />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">User List</h2>

                {loading && <p className="text-gray-600">Loading...</p>}
                {error && <p className="text-red-500">Error: {error.message}</p>}

                {Array.isArray(users) && users.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 shadow-sm rounded-md overflow-hidden text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-3 text-gray-700 text-center">User ID</th>
                                    <th className="py-2 px-3 text-gray-700 text-center">Location</th>
                                    <th className="py-2 px-3 text-gray-700 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-3 text-center">{user.userId}</td>
                                        <td className="py-2 px-3 text-center">
                                            {editingUserId === user.userId ? (
                                                <input
                                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                                    type="text"
                                                    value={user.location}
                                                    onChange={(e) => {
                                                        const updatedUsers = [...users];
                                                        const editedUserIndex = updatedUsers.findIndex(
                                                            (u) => u.userId === user.userId
                                                        );
                                                        updatedUsers[editedUserIndex].location = e.target.value;
                                                        setUsers(updatedUsers);
                                                    }}
                                                />
                                            ) : (
                                                user.location
                                            )}
                                        </td>
                                        <td className="py-2 px-3 text-center space-x-2">
                                            {editingUserId === user.userId ? (
                                                <>
                                                    <button
                                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                                        onClick={() => handleSave(user.userId)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="bg-gray-500 text-white px-3 py-1 rounded"
                                                        onClick={() => setEditingUserId(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                                        onClick={() => handleEdit(user.userId)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                                        onClick={() => handleDelete(user.userId)}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserList;
