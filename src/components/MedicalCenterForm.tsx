import React, { useState } from 'react';
import type { MedicalCenter } from '../types';

interface MedicalCenterFormProps {
    initialData: MedicalCenter | null;
    onSave: (centerData: MedicalCenter) => void;
    onCancel: () => void;
}

const MedicalCenterForm: React.FC<MedicalCenterFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<MedicalCenter, 'id'>>(() => {
        if (initialData) {
            const { id, ...rest } = initialData;
            return rest;
        }
        return {
            name: '',
            address: '',
            city: '',
            sector: '',
            slogan: '',
            logoUrl: '',
            status: 'visible',
        };
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submissionData: MedicalCenter = {
            id: initialData?.id || '', // ID is managed in parent
            ...formData,
        };
        onSave(submissionData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-dark-blue mb-6">
                {initialData ? 'Editar Centro Médico' : 'Crear Nuevo Centro Médico'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Centro Médico</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label htmlFor="slogan" className="block text-sm font-medium text-gray-700">Slogan (Opcional)</label>
                        <input type="text" name="slogan" id="slogan" value={formData.slogan} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                        <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                     <div>
                        <label htmlFor="sector" className="block text-sm font-medium text-gray-700">Sector</label>
                        <input type="text" name="sector" id="sector" value={formData.sector} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">URL del Logo</label>
                    <input type="url" name="logoUrl" id="logoUrl" value={formData.logoUrl} onChange={handleChange} placeholder="https://ejemplo.com/logo.png" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    <p className="text-xs text-gray-500 mt-1">Si no tienes URL, puedes escribir 'TEXT_ONLY' para mostrar solo el nombre.</p>
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

export default MedicalCenterForm;
