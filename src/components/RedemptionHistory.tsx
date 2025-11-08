import React from 'react';
import { COUPON_INSTANCES_DATA, COUPONS_DATA } from '../constants';

const RedemptionHistory: React.FC = () => {
    // In a real app, this data would be fetched and joined on the backend.
    const redeemedCoupons = COUPON_INSTANCES_DATA
        .filter(instance => instance.status === 'redeemed')
        .map(instance => {
            const couponTemplate = COUPONS_DATA.find(c => c.id === instance.couponId);
            return {
                ...instance,
                couponTitle: couponTemplate?.title || 'Desconocido',
                brandName: couponTemplate?.brandName || 'N/A'
            };
        })
        .sort((a, b) => new Date(b.redeemedAt!).getTime() - new Date(a.redeemedAt!).getTime());

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-dark-blue">Historial de Canjes de Cupones</h1>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código de Cupón</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora de Canje</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canjeado Por</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {redeemedCoupons.length > 0 ? redeemedCoupons.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-mono font-medium text-gray-900">{item.id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">{item.couponTitle}</div>
                                     <div className="text-sm text-gray-500">{item.brandName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.redeemedAt ? new Date(item.redeemedAt).toLocaleString('es-ES') : 'N/A'}
                                </td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.redeemedBy || 'N/A'}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    No hay cupones canjeados todavía.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RedemptionHistory;