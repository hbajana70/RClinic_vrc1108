import React, { useState } from 'react';
import { SPECIALISTS_DATA, MEDICAL_CENTERS } from '../constants';
import type { Specialist } from '../types';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, PlusIcon, ArrowUturnLeftIcon } from './Icons';
import SpecialistForm from './SpecialistForm';

const ManageSpecialists: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [specialists, setSpecialists] = useState<Specialist[]>(SPECIALISTS_DATA);
    const [editingSpecialist, setEditingSpecialist] = useState<Specialist | null>(null);

    const medicalCenterMap = new Map(MEDICAL_CENTERS.map(mc => [mc.id, mc.name]));

    const handleToggleStatus = (id: number) => {
        setSpecialists(specialists.map(s => 
            s.id === id ? { ...s, status: s.status === 'visible' ? 'hidden' : 'visible' } : s
        ));
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este especialista?')) {
            setSpecialists(specialists.filter(s => s.id !== id));
        }
    };

    const handleEdit = (specialist: Specialist) => {
        setEditingSpecialist(specialist);
        setView('form');
    };

    const handleCreateNew = () => {
        setEditingSpecialist(null);
        setView('form');
    };
    
    const handleSave = (specialistData: Specialist) => {
        if (editingSpecialist) {
            // Update existing
            setSpecialists(specialists.map(s => s.id === specialistData.id ? specialistData : s));
        } else {
            // Create new
            const newSpecialist = { ...specialistData, id: Date.now() }; // Mock ID
            setSpecialists([...specialists, newSpecialist]);
        }
        setView('list');
        setEditingSpecialist(null);
    };

    if (view === 'form') {
        return (
            <div>
                 <button onClick={() => setView('list')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-dark-blue mb-6">
                    <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                    Volver a la lista de especialistas
                </button>
                <SpecialistForm 
                    initialData={editingSpecialist}
                    onSave={handleSave}
                    onCancel={() => setView('list')}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-dark-blue">Gestionar Especialistas</h1>
                <button onClick={handleCreateNew} className="flex items-center justify-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Crear Nuevo Especialista
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Centro Médico</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {specialists.map(specialist => (
                            <tr key={specialist.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={specialist.photoUrl} alt={specialist.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{specialist.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{specialist.specialty}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicalCenterMap.get(specialist.medicalCenterId) || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button onClick={() => handleToggleStatus(specialist.id)} className={`p-1.5 rounded-full ${specialist.status === 'visible' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                        {specialist.status === 'visible' ? <EyeIcon className="h-5 w-5"/> : <EyeSlashIcon className="h-5 w-5" />}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(specialist)} className="text-primary hover:text-blue-700 p-2">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(specialist.id)} className="text-red-500 hover:text-red-700 p-2 ml-2">
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

export default ManageSpecialists;