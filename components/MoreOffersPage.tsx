import React from 'react';
import { RClinicLogo, CurrencyDollarIcon } from './Icons';
import { ALL_OFFERS_DATA } from '../constants';
import type { Offer } from '../types';

const OfferListItem: React.FC<{ offer: Offer }> = ({ offer }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-grow">
            <p className="text-sm font-semibold text-primary">{offer.category}</p>
            <h3 className="text-xl font-bold text-dark-blue mt-1">{offer.title}</h3>
            <p className="mt-2 text-gray-600">Ofrecido por: <span className="font-semibold">{offer.provider}</span></p>
        </div>
        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto mt-4 sm:mt-0">
            {offer.price !== undefined && (
                <div className="flex items-center text-2xl font-bold text-dark-blue mb-3">
                     <CurrencyDollarIcon className="h-6 w-6 mr-1 text-gray-400" />
                    <span>{offer.price.toFixed(2)}</span>
                </div>
            )}
            <a href="#/agendamiento" onClick={(e) => { e.preventDefault(); window.location.hash = '#/agendamiento'; }} className="w-full sm:w-auto text-center bg-accent text-dark-blue font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105">
                Agendar
            </a>
        </div>
    </div>
);

const MoreOffersPage: React.FC = () => {
    const visibleOffers = ALL_OFFERS_DATA.filter(offer => offer.status === 'visible');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} aria-label="RClinic Home">
                            <RClinicLogo />
                        </a>
                        <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                            &larr; Volver al Inicio
                        </a>
                    </div>
                </div>
            </header>
            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold tracking-tight text-dark-blue sm:text-5xl">
                            Todas las Ofertas
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Encuentra el beneficio perfecto para ti y tu familia.
                        </p>
                    </div>
                    <div className="space-y-6">
                        {visibleOffers.map(offer => (
                            <OfferListItem key={offer.id} offer={offer} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MoreOffersPage;