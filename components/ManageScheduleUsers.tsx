import React, { useState } from 'react';
import { SCHEDULE_USERS_DATA, MEDICAL_CENTERS } from '../constants';
import type { ScheduleUser } from '../types';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, PlusIcon, ArrowUturnLeftIcon } from './Icons';
import UserForm from './UserForm';

const ManageScheduleUsers: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [users, setUsers] = useState<ScheduleUser[]>(SCHEDULE_USERS_DATA);
    const [editingUser, setEditingUser] = useState<ScheduleUser | null>(null);
    
    const medicalCenterMap = new Map(MEDICAL_CENTERS.map(mc => [mc.id, mc.name]));

    const handleToggleStatus = (id: number) => {
        setUsers(users.map(u => 
            u.id === id ? { ...u, status: u.status === 'visible' ? 'hidden' : 'visible' } : u
        ));
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleEdit = (user: ScheduleUser) => {
        setEditingUser(user);
        setView('form');
    };

    const handleCreateNew = () => {
        setEditingUser(null);
        setView('form');
    };
    
    const handleSave = (userData: ScheduleUser) => {
        if (editingUser) {
            // Update existing
            setUsers(users.map(u => u.id === userData.id ? { ...userData, password: userData.password || u.password } : u));
        } else {
            // Create new
            const newUser = { ...userData, id: Date.now() }; // Mock ID
            setUsers([...users, newUser]);
        }
        setView('list');
        setEditingUser(null);
    };

    if (view === 'form') {
        return (
            <div>
                 <button onClick={() => setView('list')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-dark-blue mb-6">
                    <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                    Volver a la lista de usuarios
                </button>
                <UserForm 
                    initialData={editingUser}
                    onSave={handleSave}
                    onCancel={() => setView('list')}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-dark-blue">Gestionar Usuarios de Horarios</h1>
                <button onClick={handleCreateNew} className="flex items-center justify-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Crear Nuevo Usuario
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Centro Médico</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                                     <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">{medicalCenterMap.get(user.medicalCenterId) || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button onClick={() => handleToggleStatus(user.id)} className={`p-1.5 rounded-full ${user.status === 'visible' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                        {user.status === 'visible' ? <EyeIcon className="h-5 w-5"/> : <EyeSlashIcon className="h-5 w-5" />}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(user)} className="text-primary hover:text-blue-700 p-2">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 p-2 ml-2">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageScheduleUsers;
