import React, { useState } from 'react';
import { MEDICAL_CENTERS } from '../constants';
import type { MedicalCenter } from '../types';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, PlusIcon, ArrowUturnLeftIcon } from './Icons';
import MedicalCenterForm from './MedicalCenterForm';

const ManageMedicalCenters: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [centers, setCenters] = useState<MedicalCenter[]>(MEDICAL_CENTERS);
    const [editingCenter, setEditingCenter] = useState<MedicalCenter | null>(null);

    const handleToggleStatus = (id: string) => {
        setCenters(centers.map(c => 
            c.id === id ? { ...c, status: c.status === 'visible' ? 'hidden' : 'visible' } : c
        ));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este centro médico?')) {
            setCenters(centers.filter(c => c.id !== id));
        }
    };

    const handleEdit = (center: MedicalCenter) => {
        setEditingCenter(center);
        setView('form');
    };

    const handleCreateNew = () => {
        setEditingCenter(null);
        setView('form');
    };
    
    const handleSave = (centerData: MedicalCenter) => {
        if (editingCenter) {
            // Update existing
            setCenters(centers.map(c => c.id === centerData.id ? centerData : c));
        } else {
            // Create new
            const newCenter = { ...centerData, id: centerData.name.toLowerCase().replace(/\s+/g, '-') }; // Mock ID
            setCenters([...centers, newCenter]);
        }
        setView('list');
        setEditingCenter(null);
    };

    if (view === 'form') {
        return (
            <div>
                 <button onClick={() => setView('list')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-dark-blue mb-6">
                    <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                    Volver a la lista de centros
                </button>
                <MedicalCenterForm 
                    initialData={editingCenter}
                    onSave={handleSave}
                    onCancel={() => setView('list')}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-dark-blue">Gestionar Centros Médicos</h1>
                <button onClick={handleCreateNew} className="flex items-center justify-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Crear Nuevo Centro
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {centers.map(center => (
                            <tr key={center.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-10 w-24 flex items-center justify-center">
                                         {center.logoUrl && center.logoUrl !== 'TEXT_ONLY' ? (
                                            <img src={center.logoUrl} alt={center.name} className="max-h-full max-w-full object-contain"/>
                                         ) : (
                                            <span className="text-xs text-gray-500">TEXTO</span>
                                         )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{center.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{center.city}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{center.sector}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button onClick={() => handleToggleStatus(center.id)} className={`p-1.5 rounded-full ${center.status === 'visible' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                        {center.status === 'visible' ? <EyeIcon className="h-5 w-5"/> : <EyeSlashIcon className="h-5 w-5" />}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(center)} className="text-primary hover:text-blue-700 p-2">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(center.id)} className="text-red-500 hover:text-red-700 p-2 ml-2">
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

export default ManageMedicalCenters;
