import React from 'react';
import { RClinicLogo } from './Icons';
import { COUPONS_DATA } from '../constants';
import type { Coupon } from '../types';

const CouponGridItem: React.FC<{ coupon: Coupon }> = ({ coupon }) => {
    const handleCouponClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
        e.preventDefault();
        window.location.hash = `#/cupon-detalle?id=${id}`;
    };

    return (
        <a href={`#/cupon-detalle?id=${coupon.id}`} onClick={(e) => handleCouponClick(e, coupon.id)} className="group block">
            <div className="relative flex flex-col h-full bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden border border-gray-200 hover:border-purple-400">
                <div className="p-4 bg-white flex justify-center items-center border-b h-24">
                    {coupon.brandLogoUrl === 'TEXT_ONLY' ? (
                        <h2 className={`text-2xl font-extrabold tracking-tight ${coupon.brandName === 'Pharmacys' ? 'text-red-600' : 'text-blue-800'}`}>{coupon.brandName}</h2>
                    ) : (
                        <img src={coupon.brandLogoUrl} alt={`${coupon.brandName} logo`} className="max-h-14 object-contain"/>
                    )}
                </div>
                <div className="relative pt-[60%] bg-gray-100">
                     <img src={coupon.productImageUrl} alt={coupon.title} className="absolute inset-0 w-full h-full object-cover"/>
                     <div className="absolute top-2 right-2 bg-primary text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                        {coupon.discount}
                     </div>
                </div>
                <div className="p-4 text-center bg-white flex-grow flex flex-col justify-center">
                    <p className="font-bold text-dark-blue">{coupon.title}</p>
                </div>
            </div>
        </a>
    );
};


const MoreCouponsPage: React.FC = () => {
    const visibleCoupons = COUPONS_DATA.filter(coupon => coupon.status === 'visible');

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

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} aria-label="RClinic Home">
                            <RClinicLogo />
                        </a>
                        <a href="#cupones" onClick={handleBackClick} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                            &larr; Volver al Inicio
                        </a>
                    </div>
                </div>
            </header>
            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold tracking-tight text-dark-blue sm:text-5xl">
                            Todos los Cupones
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Aprovecha todos los descuentos que tenemos para ti.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {visibleCoupons.map(coupon => (
                            <CouponGridItem key={coupon.id} coupon={coupon} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MoreCouponsPage;