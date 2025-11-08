import React from 'react';
import { ALL_OFFERS_DATA, COUPONS_DATA } from '../constants';
import type { Offer, Coupon } from '../types';
import { Carousel } from './Carousel';
import { HeartIcon, EyeIcon, BeakerIcon, StethoscopeIcon } from './Icons';

const iconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    HeartIcon,
    EyeIcon,
    BeakerIcon,
    StethoscopeIcon,
};

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
    const IconComponent = iconComponents[offer.icon];
    if (!IconComponent) return null;

    return (
        <div className="flex-shrink-0 w-80 snap-center">
            <div className="group relative flex flex-col h-full bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-accent overflow-hidden">
                <div className="flex items-start justify-between">
                    <div className="flex-shrink-0 h-16 w-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="h-9 w-9" />
                    </div>
                    <div className="ml-4 text-right">
                        <span className="inline-block bg-accent text-dark-blue font-bold px-4 py-1.5 rounded-full text-sm shadow-sm">{offer.highlight}</span>
                    </div>
                </div>
                <div className="mt-4 flex-grow">
                    <p className="text-sm font-medium text-gray-500">{offer.category}</p>
                    <h3 className="text-xl font-bold text-dark-blue mt-1">{offer.title}</h3>
                    <p className="mt-2 text-gray-600">Ofrecido por: <span className="font-semibold">{offer.provider}</span></p>
                </div>
                <a href="#/agendamiento" onClick={(e) => { e.preventDefault(); window.location.hash = '#/agendamiento'; }} className="mt-6 w-full text-center bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                    Agendar Oferta
                </a>
            </div>
        </div>
    );
};

const CouponCard: React.FC<{ coupon: Coupon }> = ({ coupon }) => {
    const handleCouponClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
        e.preventDefault();
        window.location.hash = `#/cupon-detalle?id=${id}`;
    };

    return (
        <a href={`#/cupon-detalle?id=${coupon.id}`} onClick={(e) => handleCouponClick(e, coupon.id)} className="flex-shrink-0 w-64 snap-center block">
            <div className="group relative flex flex-col h-full bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-200/50 hover:-translate-y-1 overflow-hidden border-2 border-transparent hover:border-purple-400">
                <div className="p-4 bg-white flex justify-center items-center border-b h-24">
                    {coupon.brandLogoUrl === 'TEXT_ONLY' ? (
                        <h2 className={`text-3xl font-extrabold tracking-tight ${coupon.brandName === 'Pharmacys' ? 'text-red-600' : 'text-blue-800'}`}>{coupon.brandName}</h2>
                    ) : (
                        <img src={coupon.brandLogoUrl} alt={`${coupon.brandName} logo`} className="max-h-16 object-contain"/>
                    )}
                </div>
                <div className="relative pt-[60%] bg-gray-100">
                     <img src={coupon.productImageUrl} alt={coupon.title} className="absolute inset-0 w-full h-full object-cover"/>
                </div>
                <div className="p-4 text-center bg-white flex-grow flex flex-col justify-between">
                    <div>
                        <h3 className="text-5xl font-extrabold text-primary leading-none">{coupon.discount}</h3>
                        <p className="text-sm font-semibold text-gray-500 -mt-1">Dscto.</p>
                    </div>
                    <p className="mt-3 font-bold text-dark-blue h-12 flex items-center justify-center">{coupon.title}</p>
                </div>
            </div>
        </a>
    );
};


const FeaturedOffers: React.FC = () => {
    const featuredOffers = ALL_OFFERS_DATA.filter(offer => offer.placement === 'featured' && offer.status === 'visible');
    const featuredCoupons = COUPONS_DATA.filter(coupon => coupon.placement === 'featured' && coupon.status === 'visible');

    return (
        <section id="beneficios" className="bg-gray-50 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-12">
                    <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Beneficios Exclusivos</h2>
                    <p className="mt-2 text-3xl font-extrabold text-dark-blue tracking-tight sm:text-4xl">
                        Ofertas que Cuidan tu Salud
                    </p>
                </div>
                <Carousel>
                    {featuredOffers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </Carousel>
                 <div className="mt-12 text-center">
                    <a 
                        href="#/mas-ofertas" 
                        onClick={(e) => { e.preventDefault(); window.location.hash = '#/mas-ofertas'; }}
                        className="inline-block bg-white text-primary font-bold rounded-full px-8 py-3 text-lg transform transition-transform duration-300 hover:scale-105 shadow-md border border-primary hover:bg-primary/5"
                    >
                        Ver más ofertas
                    </a>
                </div>

                <div id="cupones" className="mt-24">
                    <div className="text-left mb-12">
                        <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">Cupones y Descuentos</h2>
                        <p className="mt-2 text-3xl font-extrabold text-dark-blue tracking-tight sm:text-4xl">
                            Beneficios Adicionales para Ti
                        </p>
                    </div>
                    <Carousel>
                        {featuredCoupons.map((coupon) => (
                            <CouponCard key={coupon.id} coupon={coupon} />
                        ))}
                    </Carousel>
                    <div className="mt-12 text-center">
                        <a 
                            href="#/mas-cupones" 
                            onClick={(e) => { e.preventDefault(); window.location.hash = '#/mas-cupones'; }}
                            className="inline-block bg-white text-purple-600 font-bold rounded-full px-8 py-3 text-lg transform transition-transform duration-300 hover:scale-105 shadow-md border border-purple-600 hover:bg-purple-50"
                        >
                            Ver más cupones
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedOffers;