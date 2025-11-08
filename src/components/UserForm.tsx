import React, { useState } from 'react';
import type { ScheduleUser } from '../types';
// Fix: Import SPECIALISTS_DATA to populate the specialists dropdown.
import { MEDICAL_CENTERS, SPECIALISTS_DATA } from '../constants';

interface UserFormProps {
    initialData: ScheduleUser | null;
    onSave: (userData: ScheduleUser) => void;
    onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<ScheduleUser, 'id'>>(() => {
        if (initialData) {
            const { id, password, ...rest } = initialData; // Exclude password from initial form state
            return { ...rest, password: '' };
        }
        return {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            medicalCenterId: MEDICAL_CENTERS[0]?.id || '',
            status: 'visible',
            // Fix: Add missing 'role' property to satisfy the ScheduleUser type.
            role: 'doctor',
            specialistId: undefined,
        };
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'specialistId' ? (e.target.value ? Number(e.target.value) : undefined) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        
        if (!initialData && !formData.password) {
            setError('La contraseña es obligatoria para nuevos usuarios.');
            return;
        }

        const submissionData: ScheduleUser = {
            id: initialData?.id || 0,
            ...formData,
        };
        onSave(submissionData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-dark-blue mb-6">
                {initialData ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombres</label>
                        <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellidos</label>
                        <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                        <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>

                {/* Fix: Added UI fields for role and specialistId and grouped them with medicalCenterId. */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="medicalCenterId" className="block text-sm font-medium text-gray-700">Centro Médico</label>
                        <select name="medicalCenterId" id="medicalCenterId" value={formData.medicalCenterId} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            {MEDICAL_CENTERS.map(mc => <option key={mc.id} value={mc.id}>{mc.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                        <select name="role" id="role" value={formData.role} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            <option value="doctor">Doctor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {formData.role === 'doctor' && (
                    <div>
                        <label htmlFor="specialistId" className="block text-sm font-medium text-gray-700">Especialista Asociado (Opcional)</label>
                        <select
                            name="specialistId"
                            id="specialistId"
                            value={formData.specialistId || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Ninguno</option>
                            {SPECIALISTS_DATA.filter(s => s.medicalCenterId === formData.medicalCenterId).map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                         <p className="text-xs text-gray-500 mt-1">Asocia este usuario a un perfil de especialista existente para la gestión de su agenda.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required={!initialData} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                        {initialData && <p className="text-xs text-gray-500 mt-1">Dejar en blanco para no cambiar la contraseña.</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required={!initialData || !!formData.password} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>
                
                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-accent text-dark-blue font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                        Guardar Usuario
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
