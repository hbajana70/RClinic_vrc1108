import React, { useState } from 'react';
import type { Associate } from '../types';

interface AssociateFormProps {
    initialData: Associate | null;
    onSave: (associateData: Associate) => void;
    onCancel: () => void;
}

const AssociateForm: React.FC<AssociateFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Associate, 'id'>>(() => {
        if (initialData) {
            const { id, ...rest } = initialData;
            return rest;
        }
        return {
            name: '',
            logoUrl: '',
            website: '',
            status: 'visible',
        };
    });
    
    const [logoType, setLogoType] = useState<'image' | 'text'>(() => 
        initialData?.logoUrl === 'TEXT_ONLY' ? 'text' : 'image'
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submissionData: Associate = {
            id: initialData?.id || 0, // ID is managed in parent
            ...formData,
            logoUrl: logoType === 'text' ? 'TEXT_ONLY' : formData.logoUrl,
        };
        onSave(submissionData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-dark-blue mb-6">
                {initialData ? 'Editar Asociado' : 'Crear Nuevo Asociado'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Asociado</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                     <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Sitio Web (Opcional)</label>
                        <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} placeholder="https://ejemplo.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Logo del Asociado</label>
                    <div className="mt-2 flex items-center space-x-4">
                        <label><input type="radio" name="logoType" value="image" checked={logoType === 'image'} onChange={() => setLogoType('image')} className="mr-1"/> Usar Imagen</label>
                        <label><input type="radio" name="logoType" value="text" checked={logoType === 'text'} onChange={() => setLogoType('text')} className="mr-1"/> Usar solo Texto</label>
                    </div>
                     {logoType === 'image' && (
                        <div className="mt-2">
                             <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">URL del Logo</label>
                             <input type="text" name="logoUrl" id="logoUrl" value={formData.logoUrl === 'TEXT_ONLY' ? '' : formData.logoUrl} onChange={handleChange} placeholder="https://ejemplo.com/logo.png" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                             <p className="text-xs text-gray-500 mt-1">Por ahora, pega la URL de una imagen. La subida de archivos se implementará con el backend.</p>
                        </div>
                    )}
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

export default AssociateForm;