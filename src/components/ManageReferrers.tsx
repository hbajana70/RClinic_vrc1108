import React, { useState } from 'react';
import { REFERRERS_DATA } from '../constants';
import type { Referrer } from '../types';
import { CheckCircleIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from './Icons';

const ManageReferrers: React.FC = () => {
    const [referrers, setReferrers] = useState<Referrer[]>(REFERRERS_DATA);
    
    // In a real app, this would be an API call
    const handleUpdateStatus = (id: number, status: 'approved' | 'rejected') => {
        setReferrers(referrers.map(r => r.id === id ? { ...r, status } : r));
    };
    
    const handleToggleActivityStatus = (id: number) => {
        setReferrers(referrers.map(r => 
            r.id === id ? { ...r, activityStatus: r.activityStatus === 'active' ? 'inactive' : 'active' } : r
        ));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-dark-blue">Gestionar Referidores</h1>
                <p className="text-gray-500">Aprobar o rechazar nuevas solicitudes.</p>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código de Referido</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Aprobación</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actividad</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {referrers.map(referrer => (
                            <tr key={referrer.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{referrer.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">{referrer.email}</div>
                                     <div className="text-sm text-gray-500">{referrer.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{referrer.referralCode}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                    {referrer.status === 'approved' && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Aprobado</span>}
                                    {referrer.status === 'pending' && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>}
                                    {referrer.status === 'rejected' && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Rechazado</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                    {referrer.activityStatus === 'active' ? 
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Activo</span> :
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Inactivo</span>
                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {referrer.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleUpdateStatus(referrer.id, 'approved')} className="text-green-600 hover:text-green-900 p-2" title="Aprobar">
                                                <CheckCircleIcon className="h-5 w-5" />
                                            </button>
                                            <button onClick={() => handleUpdateStatus(referrer.id, 'rejected')} className="text-red-600 hover:text-red-900 p-2 ml-2" title="Rechazar">
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        </>
                                    )}
                                    {referrer.status === 'approved' && (
                                        <button onClick={() => handleToggleActivityStatus(referrer.id)} className={`p-1.5 rounded-full ${referrer.activityStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`} title={referrer.activityStatus === 'active' ? 'Desactivar' : 'Activar'}>
                                            {referrer.activityStatus === 'active' ? <EyeIcon className="h-5 w-5"/> : <EyeSlashIcon className="h-5 w-5" />}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageReferrers;