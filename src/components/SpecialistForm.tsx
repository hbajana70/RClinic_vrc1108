import React, { useState } from 'react';
import type { Specialist } from '../types';
import { MEDICAL_CENTERS, SPECIALTIES } from '../constants';

interface SpecialistFormProps {
    initialData: Specialist | null;
    onSave: (specialistData: Specialist) => void;
    onCancel: () => void;
}

const SpecialistForm: React.FC<SpecialistFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Specialist, 'id' | 'availability'>>(() => {
        if (initialData) {
            const { id, availability, ...rest } = initialData;
            return rest;
        }
        return {
            name: '',
            specialty: SPECIALTIES[0] || '',
            address: '',
            phone: '',
            photoUrl: '',
            consultationFee: 0,
            biography: '',
            medicalCenterId: MEDICAL_CENTERS[0]?.id || '',
            status: 'visible',
        };
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'consultationFee' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submissionData: Specialist = {
            id: initialData?.id || 0, // ID is managed in parent
            availability: initialData?.availability || {}, // Keep existing availability
            ...formData,
        };
        onSave(submissionData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-dark-blue mb-6">
                {initialData ? 'Editar Especialista' : 'Crear Nuevo Especialista'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Especialidad</label>
                        <select name="specialty" id="specialty" value={formData.specialty} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="medicalCenterId" className="block text-sm font-medium text-gray-700">Centro Médico</label>
                        <select name="medicalCenterId" id="medicalCenterId" value={formData.medicalCenterId} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            {MEDICAL_CENTERS.map(mc => <option key={mc.id} value={mc.id}>{mc.name}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">URL de la Fotografía</label>
                    <input type="url" name="photoUrl" id="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="https://ejemplo.com/foto.jpg" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección de Consulta</label>
                        <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>

                 <div>
                    <label htmlFor="biography" className="block text-sm font-medium text-gray-700">Biografía / Reseña</label>
                    <textarea name="biography" id="biography" value={formData.biography} onChange={handleChange} rows={3} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                </div>

                <div>
                    <label htmlFor="consultationFee" className="block text-sm font-medium text-gray-700">Valor de la Consulta</label>
                    <input type="number" name="consultationFee" id="consultationFee" value={formData.consultationFee} onChange={handleChange} step="1" min="0" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-accent text-dark-blue font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                        Guardar Especialista
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SpecialistForm;
