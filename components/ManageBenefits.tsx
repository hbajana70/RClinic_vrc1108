import React, { useState } from 'react';
import { ALL_OFFERS_DATA } from '../constants';
import type { Offer } from '../types';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, PlusIcon, ArrowUturnLeftIcon } from './Icons';
import BenefitForm from './BenefitForm';

const ManageBenefits: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [benefits, setBenefits] = useState<Offer[]>(ALL_OFFERS_DATA);
    const [editingBenefit, setEditingBenefit] = useState<Offer | null>(null);

    const handleToggleStatus = (id: number) => {
        setBenefits(benefits.map(b => 
            b.id === id ? { ...b, status: b.status === 'visible' ? 'hidden' : 'visible' } : b
        ));
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este beneficio?')) {
            setBenefits(benefits.filter(b => b.id !== id));
        }
    };

    const handleEdit = (benefit: Offer) => {
        setEditingBenefit(benefit);
        setView('form');
    };

    const handleCreateNew = () => {
        setEditingBenefit(null);
        setView('form');
    };
    
    const handleSave = (benefitData: Offer) => {
        if (editingBenefit) {
            // Update existing
            setBenefits(benefits.map(b => b.id === benefitData.id ? benefitData : b));
        } else {
            // Create new
            const newBenefit = { ...benefitData, id: Date.now() }; // Mock ID
            setBenefits([...benefits, newBenefit]);
        }
        setView('list');
        setEditingBenefit(null);
    };

    if (view === 'form') {
        return (
            <div>
                 <button onClick={() => setView('list')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-dark-blue mb-6">
                    <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                    Volver a la lista de beneficios
                </button>
                <BenefitForm 
                    initialData={editingBenefit}
                    onSave={handleSave}
                    onCancel={() => setView('list')}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-dark-blue">Gestionar Beneficios de Salud</h1>
                <button onClick={handleCreateNew} className="flex items-center justify-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Crear Nuevo Beneficio
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {benefits.map(benefit => (
                            <tr key={benefit.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{benefit.title}</div>
                                    <div className="text-sm text-gray-500">{benefit.category}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {benefit.provider}
                                </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {benefit.placement === 'featured' ? 
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Carrusel Principal</span> : 
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Secundaria</span>
                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button onClick={() => handleToggleStatus(benefit.id)} className={`p-1.5 rounded-full ${benefit.status === 'visible' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                        {benefit.status === 'visible' ? <EyeIcon className="h-5 w-5"/> : <EyeSlashIcon className="h-5 w-5" />}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(benefit)} className="text-primary hover:text-blue-700 p-2">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(benefit.id)} className="text-red-500 hover:text-red-700 p-2 ml-2">
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

export default ManageBenefits;