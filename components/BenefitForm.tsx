import React, { useState } from 'react';
import type { Offer } from '../types';

interface BenefitFormProps {
    initialData: Offer | null;
    onSave: (benefitData: Offer) => void;
    onCancel: () => void;
}

const iconOptions = ['HeartIcon', 'EyeIcon', 'BeakerIcon', 'StethoscopeIcon'];

const BenefitForm: React.FC<BenefitFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Offer, 'id'>>(() => {
        if (initialData) {
            const { id, ...rest } = initialData;
            return rest;
        }
        return {
            icon: 'StethoscopeIcon',
            highlight: '',
            category: '',
            title: '',
            provider: '',
            price: 0,
            status: 'visible',
            placement: 'secondary',
        };
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? (value === '' ? undefined : Number(value)) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submissionData: Offer = {
            id: initialData?.id || 0, // ID is managed in parent
            ...formData,
        };
        onSave(submissionData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-dark-blue mb-6">
                {initialData ? 'Editar Beneficio' : 'Crear Nuevo Beneficio'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título del Beneficio</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label htmlFor="highlight" className="block text-sm font-medium text-gray-700">Texto Destacado (ej: 25% Descuento)</label>
                        <input type="text" name="highlight" id="highlight" value={formData.highlight} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                        <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label htmlFor="provider" className="block text-sm font-medium text-gray-700">Proveedor</label>
                        <input type="text" name="provider" id="provider" value={formData.provider} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio (ej: 75.00)</label>
                        <input type="number" name="price" id="price" value={formData.price ?? ''} onChange={handleChange} step="0.01" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                     <div>
                        <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Ícono</label>
                        <select name="icon" id="icon" value={formData.icon} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            {iconOptions.map(icon => <option key={icon} value={icon}>{icon.replace('Icon', '')}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="placement" className="block text-sm font-medium text-gray-700">Ubicación</label>
                        <select name="placement" id="placement" value={formData.placement} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            <option value="featured">Carrusel Principal (Destacado)</option>
                            <option value="secondary">Página Secundaria (Más Ofertas)</option>
                        </select>
                    </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-accent text-dark-blue font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BenefitForm;