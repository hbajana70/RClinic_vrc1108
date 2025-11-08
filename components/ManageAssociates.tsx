import React, { useState } from 'react';
import { ASSOCIATES_DATA } from '../constants';
import type { Associate } from '../types';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, PlusIcon, ArrowUturnLeftIcon } from './Icons';
import AssociateForm from './AssociateForm';

const ManageAssociates: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [associates, setAssociates] = useState<Associate[]>(ASSOCIATES_DATA);
    const [editingAssociate, setEditingAssociate] = useState<Associate | null>(null);

    const handleToggleStatus = (id: number) => {
        setAssociates(associates.map(a => 
            a.id === id ? { ...a, status: a.status === 'visible' ? 'hidden' : 'visible' } : a
        ));
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este asociado?')) {
            setAssociates(associates.filter(a => a.id !== id));
        }
    };

    const handleEdit = (associate: Associate) => {
        setEditingAssociate(associate);
        setView('form');
    };

    const handleCreateNew = () => {
        setEditingAssociate(null);
        setView('form');
    };
    
    const handleSave = (associateData: Associate) => {
        if (editingAssociate) {
            // Update existing
            setAssociates(associates.map(a => a.id === associateData.id ? associateData : a));
        } else {
            // Create new
            const newAssociate = { ...associateData, id: Date.now() }; // Mock ID
            setAssociates([...associates, newAssociate]);
        }
        setView('list');
        setEditingAssociate(null);
    };

    if (view === 'form') {
        return (
            <div>
                 <button onClick={() => setView('list')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-dark-blue mb-6">
                    <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                    Volver a la lista de asociados
                </button>
                <AssociateForm 
                    initialData={editingAssociate}
                    onSave={handleSave}
                    onCancel={() => setView('list')}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-dark-blue">Gestionar Asociados</h1>
                <button onClick={handleCreateNew} className="flex items-center justify-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Crear Nuevo Asociado
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sitio Web</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {associates.map(associate => (
                            <tr key={associate.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-10 w-24 flex items-center justify-center">
                                         {associate.logoUrl && associate.logoUrl !== 'TEXT_ONLY' ? (
                                            <img src={associate.logoUrl} alt={associate.name} className="max-h-full max-w-full object-contain"/>
                                         ) : (
                                            <span className="text-xs text-gray-500">TEXTO</span>
                                         )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{associate.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a href={associate.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate">
                                        {associate.website}
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button onClick={() => handleToggleStatus(associate.id)} className={`p-1.5 rounded-full ${associate.status === 'visible' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                        {associate.status === 'visible' ? <EyeIcon className="h-5 w-5"/> : <EyeSlashIcon className="h-5 w-5" />}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(associate)} className="text-primary hover:text-blue-700 p-2">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(associate.id)} className="text-red-500 hover:text-red-700 p-2 ml-2">
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

export default ManageAssociates;
