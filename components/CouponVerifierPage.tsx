import React, { useState } from 'react';
import { RClinicLogo, ShieldCheckIcon } from './Icons';
import { COUPONS_DATA, COUPON_INSTANCES_DATA } from '../constants';
import type { Coupon, CouponInstance } from '../types';

type VerificationStatus = 'idle' | 'loading' | 'valid' | 'redeemed' | 'expired' | 'invalid';

const CouponVerifierPage: React.FC = () => {
    const [couponCode, setCouponCode] = useState('');
    const [status, setStatus] = useState<VerificationStatus>('idle');
    const [verifiedInstance, setVerifiedInstance] = useState<CouponInstance | null>(null);
    const [verifiedCoupon, setVerifiedCoupon] = useState<Coupon | null>(null);
    const [wasRedeemed, setWasRedeemed] = useState(false);

    const resetState = () => {
        setStatus('idle');
        setVerifiedInstance(null);
        setVerifiedCoupon(null);
        setWasRedeemed(false);
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!couponCode) return;
        resetState();
        setStatus('loading');

        setTimeout(() => {
            const instance = COUPON_INSTANCES_DATA.find(inst => inst.id.toUpperCase() === couponCode.toUpperCase());
            
            if (!instance) {
                setStatus('invalid');
                return;
            }

            const couponTemplate = COUPONS_DATA.find(c => c.id === instance.couponId);
            if (!couponTemplate) {
                setStatus('invalid');
                return;
            }

            setVerifiedInstance(instance);
            setVerifiedCoupon(couponTemplate);
            
            if (instance.status === 'redeemed') {
                setStatus('redeemed');
            } else if (new Date(couponTemplate.expiryDate) < new Date()) {
                setStatus('expired');
            } else {
                setStatus('valid');
            }

        }, 500);
    };

    const handleRedeem = () => {
        if (verifiedInstance) {
            // Simulate database update
            const index = COUPON_INSTANCES_DATA.findIndex(inst => inst.id === verifiedInstance.id);
            if (index !== -1) {
                COUPON_INSTANCES_DATA[index].status = 'redeemed';
                COUPON_INSTANCES_DATA[index].redeemedAt = new Date().toISOString();
                COUPON_INSTANCES_DATA[index].redeemedBy = 'Portal de Aliados';
            }
            setWasRedeemed(true);
        }
    };
    
    const ResultCard = () => {
        if (status === 'idle' || status === 'loading') return null;

        const baseClasses = "mt-8 p-6 rounded-lg border-2 text-center";
        let config = {
            title: '',
            message: '',
            classes: ''
        };

        switch (status) {
            case 'valid':
                config = { title: 'Cupón Válido', message: `El cupón para "${verifiedCoupon?.title}" está activo y listo para ser canjeado.`, classes: 'bg-green-50 border-green-500 text-green-800' };
                break;
            case 'redeemed':
                 const redeemedDate = verifiedInstance?.redeemedAt ? new Date(verifiedInstance.redeemedAt).toLocaleString('es-ES') : 'fecha desconocida';
                config = { title: 'Cupón Ya Canjeado', message: `Este cupón ya fue utilizado el ${redeemedDate}.`, classes: 'bg-red-50 border-red-500 text-red-800' };
                break;
            case 'expired':
                const expiryDate = verifiedCoupon?.expiryDate ? new Date(verifiedCoupon.expiryDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'fecha desconocida';
                config = { title: 'Cupón Expirado', message: `Este cupón ha superado su fecha de vigencia (expiró el ${expiryDate}).`, classes: 'bg-yellow-50 border-yellow-500 text-yellow-800' };
                break;
            case 'invalid':
                config = { title: 'Código Inválido', message: 'El código ingresado no se encontró en nuestro sistema.', classes: 'bg-gray-100 border-gray-400 text-gray-800' };
                break;
        }

        return (
            <div className={`${baseClasses} ${config.classes}`}>
                <h3 className="text-xl font-bold">{config.title}</h3>
                <p className="mt-2">{config.message}</p>
                {status === 'valid' && (
                    <div className="mt-6">
                        <button 
                            onClick={handleRedeem}
                            disabled={wasRedeemed}
                            className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
                        >
                           {wasRedeemed ? '¡Canjeado con Éxito!' : 'Marcar como Canjeado'}
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} aria-label="RClinic Home">
                            <RClinicLogo />
                        </a>
                        <a href="#/configuracion" onClick={(e) => { e.preventDefault(); window.location.hash = '#/configuracion'; }} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                            &larr; Volver al Portal
                        </a>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl w-full">
                    <div className="text-center">
                        <ShieldCheckIcon className="mx-auto h-12 w-12 text-primary"/>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-dark-blue sm:text-5xl">
                            Verificador de Cupones
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Ingresa el código único del cupón para validar su estado.
                        </p>
                    </div>
                    <form onSubmit={handleVerify} className="mt-10">
                        <div className="flex gap-2">
                             <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => { setCouponCode(e.target.value); resetState(); }}
                                placeholder="Ej: RCLINIC-X7T3P1"
                                required
                                className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg tracking-wider"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 disabled:bg-gray-400 transition-all"
                            >
                               {status === 'loading' ? 'Verificando...' : 'Verificar'}
                            </button>
                        </div>
                    </form>
                    
                    <ResultCard />
                </div>
            </main>
        </div>
    );
};

export default CouponVerifierPage;