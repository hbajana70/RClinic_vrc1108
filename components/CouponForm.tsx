import React, { useState } from 'react';
import type { Coupon } from '../types';

interface CouponFormProps {
    initialData: Coupon | null;
    onSave: (couponData: Coupon) => void;
    onCancel: () => void;
}

const CouponForm: React.FC<CouponFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Coupon, 'id'>>(() => {
        if (initialData) {
            const { id, ...rest } = initialData;
            return {
                ...rest,
                expiryDate: initialData.expiryDate.split('T')[0] // Format for date input
            };
        }
        return {
            brandName: '',
            brandLogoUrl: '',
            productImageUrl: '',
            discount: '',
            title: '',
            details: '',
            terms: '',
            expiryDate: '',
            status: 'visible',
            placement: 'secondary',
        };
    });
    
    const [logoType, setLogoType] = useState<'image' | 'text'>(() => 
        initialData?.brandLogoUrl === 'TEXT_ONLY' ? 'text' : 'image'
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submissionData: Coupon = {
            id: initialData?.id || 0, // ID is managed in parent
            ...formData,
            brandLogoUrl: logoType === 'text' ? 'TEXT_ONLY' : formData.brandLogoUrl,
            expiryDate: new Date(formData.expiryDate).toISOString()
        };
        onSave(submissionData);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-dark-blue mb-6">
                {initialData ? 'Editar Cupón' : 'Crear Nuevo Cupón'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Nombre de la Marca</label>
                        <input type="text" name="brandName" id="brandName" value={formData.brandName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                     <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título del Cupón</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Logo de la Marca</label>
                    <div className="mt-2 flex items-center space-x-4">
                        <label><input type="radio" name="logoType" value="image" checked={logoType === 'image'} onChange={() => setLogoType('image')} className="mr-1"/> Usar Imagen</label>
                        <label><input type="radio" name="logoType" value="text" checked={logoType === 'text'} onChange={() => setLogoType('text')} className="mr-1"/> Usar Texto</label>
                    </div>
                     {logoType === 'image' && (
                        <div className="mt-2">
                             <label htmlFor="brandLogoUrl" className="block text-sm font-medium text-gray-700">URL del Logo</label>
                             <input type="text" name="brandLogoUrl" id="brandLogoUrl" value={formData.brandLogoUrl === 'TEXT_ONLY' ? '' : formData.brandLogoUrl} onChange={handleChange} placeholder="https://ejemplo.com/logo.png" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                             <p className="text-xs text-gray-500 mt-1">Por ahora, pega la URL de una imagen. La subida de archivos se implementará con el backend.</p>
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="productImageUrl" className="block text-sm font-medium text-gray-700">URL de Imagen Promocional</label>
                    <input type="text" name="productImageUrl" id="productImageUrl" value={formData.productImageUrl} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div>
                        <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Descuento (ej: 15%)</label>
                        <input type="text" name="discount" id="discount" value={formData.discount} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                     <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
                        <input type="date" name="expiryDate" id="expiryDate" value={formData.expiryDate} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label htmlFor="placement" className="block text-sm font-medium text-gray-700">Ubicación</label>
                        <select name="placement" id="placement" value={formData.placement} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            <option value="featured">Carrusel Principal (Destacado)</option>
                            <option value="secondary">Página Secundaria</option>
                        </select>
                    </div>
                </div>

                 <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">Detalles del Cupón</label>
                    <textarea name="details" id="details" value={formData.details} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                 <div>
                    <label htmlFor="terms" className="block text-sm font-medium text-gray-700">Términos y Condiciones</label>
                    <textarea name="terms" id="terms" value={formData.terms} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
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

export default CouponForm;