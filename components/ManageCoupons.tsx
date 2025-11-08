import React, { useState } from 'react';
import { COUPONS_DATA } from '../constants';
import type { Coupon } from '../types';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, PlusIcon, ArrowUturnLeftIcon } from './Icons';
import CouponForm from './CouponForm';

const ManageCoupons: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [coupons, setCoupons] = useState<Coupon[]>(COUPONS_DATA);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

    const handleToggleStatus = (id: number) => {
        setCoupons(coupons.map(c => 
            c.id === id ? { ...c, status: c.status === 'visible' ? 'hidden' : 'visible' } : c
        ));
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cupón?')) {
            setCoupons(coupons.filter(c => c.id !== id));
        }
    };

    const handleEdit = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        setView('form');
    };

    const handleCreateNew = () => {
        setEditingCoupon(null);
        setView('form');
    };
    
    const handleSave = (couponData: Coupon) => {
        if (editingCoupon) {
            // Update existing
            setCoupons(coupons.map(c => c.id === couponData.id ? couponData : c));
        } else {
            // Create new
            const newCoupon = { ...couponData, id: Date.now() }; // Mock ID
            setCoupons([...coupons, newCoupon]);
        }
        setView('list');
        setEditingCoupon(null);
    };

    if (view === 'form') {
        return (
            <div>
                 <button onClick={() => setView('list')} className="flex items-center text-sm font-semibold text-gray-600 hover:text-dark-blue mb-6">
                    <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                    Volver a la lista de cupones
                </button>
                <CouponForm 
                    initialData={editingCoupon}
                    onSave={handleSave}
                    onCancel={() => setView('list')}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-dark-blue">Gestionar Cupones</h1>
                <button onClick={handleCreateNew} className="flex items-center justify-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Crear Nuevo Cupón
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimiento</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {coupons.map(coupon => (
                            <tr key={coupon.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{coupon.brandName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">{coupon.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {coupon.placement === 'featured' ? 
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Carrusel Principal</span> : 
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Secundaria</span>
                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(coupon.expiryDate).toLocaleDateString('es-ES')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button onClick={() => handleToggleStatus(coupon.id)} className={`p-1.5 rounded-full ${coupon.status === 'visible' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                        {coupon.status === 'visible' ? <EyeIcon className="h-5 w-5"/> : <EyeSlashIcon className="h-5 w-5" />}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(coupon)} className="text-primary hover:text-blue-700 p-2">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(coupon.id)} className="text-red-500 hover:text-red-700 p-2 ml-2">
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

export default ManageCoupons;