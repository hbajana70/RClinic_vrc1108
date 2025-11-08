import React, { useState, useEffect } from 'react';
import { RClinicLogo, TicketIcon, CalendarIcon } from './Icons';
import { COUPONS_DATA, COUPON_INSTANCES_DATA } from '../constants';
import type { Coupon, CouponInstance } from '../types';

const CouponDetailPage: React.FC = () => {
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const [isRedeemed, setIsRedeemed] = useState(false);
    const [couponCode, setCouponCode] = useState('');

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const id = params.get('id');
        if (id) {
            const foundCoupon = COUPONS_DATA.find(c => c.id === parseInt(id, 10));
            setCoupon(foundCoupon || null);
        }
    }, []);

    const handleRedeem = () => {
        if (!coupon) return;
        
        // Generate a unique code
        const code = `RCLINIC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        
        // Create a new coupon instance
        const newInstance: CouponInstance = {
            id: code,
            couponId: coupon.id,
            status: 'active',
            generatedAt: new Date().toISOString(),
            redeemedAt: null,
            redeemedBy: null,
        };

        // Simulate saving to the "database"
        // In a real app, this would be an API call.
        COUPON_INSTANCES_DATA.push(newInstance);
        
        setCouponCode(code);
        setIsRedeemed(true);
    };
    
    const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.location.hash = '#/';
        setTimeout(() => {
            const el = document.getElementById('cupones');
            if(el) {
                el.scrollIntoView({ behavior: 'smooth' });
                window.location.hash = 'cupones';
            }
        }, 100);
    };

    const handleGoHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.location.hash = '#/';
    };

    if (!coupon) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                 <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} aria-label="RClinic Home">
                                <RClinicLogo />
                            </a>
                        </div>
                    </div>
                </header>
                 <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-dark-blue">Cupón no encontrado</h2>
                        <p className="mt-2 text-gray-600">El cupón que buscas no existe o ha sido removido.</p>
                        <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} className="mt-6 inline-block bg-primary text-white font-bold rounded-full px-8 py-3">
                            Volver al Inicio
                        </a>
                    </div>
                </main>
            </div>
        );
    }
    
    const expiryDate = new Date(coupon.expiryDate);
    const formattedExpiryDate = expiryDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                         <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} aria-label="RClinic Home">
                            <RClinicLogo />
                        </a>
                        <a href="#cupones" onClick={handleBackClick} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                            &larr; Volver a Cupones
                        </a>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                 <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
                    <div className="flex justify-center items-center border-b pb-4 h-20">
                        {coupon.brandLogoUrl === 'TEXT_ONLY' ? (
                            <h2 className={`text-4xl font-extrabold tracking-tight ${coupon.brandName === 'Pharmacys' ? 'text-red-600' : 'text-blue-800'}`}>{coupon.brandName}</h2>
                        ) : (
                            <img src={coupon.brandLogoUrl} alt={`${coupon.brandName} logo`} className="max-h-16 object-contain"/>
                        )}
                    </div>

                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-dark-blue">{coupon.title}</h1>
                        <p className="text-md text-gray-500">Ofrecido por {coupon.brandName}</p>
                    </div>
                    
                    <div className="text-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <p className="text-lg font-semibold text-blue-800">Descuento Especial</p>
                        <p className="text-6xl font-extrabold text-primary">{coupon.discount}</p>
                    </div>

                    <div className="space-y-3 text-sm text-gray-700">
                        <div>
                            <h3 className="font-bold text-dark-blue mb-1">Detalles:</h3>
                            <p>{coupon.details}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-dark-blue mt-2 mb-1">Términos y Condiciones:</h3>
                            <p className="text-xs">{coupon.terms}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center text-sm font-semibold text-gray-600 bg-gray-100 p-2 rounded-md">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Válido hasta el {formattedExpiryDate}</span>
                    </div>

                    <div className="pt-4">
                        {isRedeemed ? (
                            <div className="text-center">
                                <p className="font-semibold text-gray-800 mb-2">Presenta este código en el local:</p>
                                <div className="p-4 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50">
                                    <p className="text-2xl font-bold tracking-widest text-dark-blue">{couponCode}</p>
                                </div>
                                <button className="mt-6 w-full py-3 px-4 rounded-full bg-green-500 text-white font-bold cursor-default" disabled>
                                    ¡Código Generado!
                                </button>
                                <a href="#/" onClick={handleGoHome} className="mt-4 inline-block text-sm text-gray-600 hover:text-primary hover:underline">
                                    Volver al Inicio
                                </a>
                            </div>
                        ) : (
                            <button
                                onClick={handleRedeem}
                                className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
                            >
                                <TicketIcon className="h-6 w-6 mr-3" />
                                Generar mi Código Único
                            </button>
                        )}
                    </div>
                 </div>
            </main>
        </div>
    );
};
export default CouponDetailPage;