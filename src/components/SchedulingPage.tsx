import React, { useState, useEffect, useMemo } from 'react';
import { RClinicLogo } from './Icons';
import { getCities, getSectorsByCity, SPECIALTIES } from '../constants';

const SchedulingPage: React.FC = () => {
    // Call functions to get dynamic data, memoizing the result
    const CITIES = useMemo(() => getCities(), []);
    const SECTORS_BY_CITY = useMemo(() => getSectorsByCity(), []);

    // Safely set initial city
    const initialCity = CITIES.includes('Guayaquil') ? 'Guayaquil' : CITIES[0] || '';
    
    const [city, setCity] = useState(initialCity);
    const [sector, setSector] = useState('');
    const [specialty, setSpecialty] = useState('Medicina General');
    const [availableSectors, setAvailableSectors] = useState<string[]>(SECTORS_BY_CITY[initialCity] || []);

    useEffect(() => {
        setAvailableSectors(SECTORS_BY_CITY[city] || []);
        setSector(''); // Reset sector when city changes
    }, [city, SECTORS_BY_CITY]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
            ciudad: city,
            sector,
            especialidad: specialty,
        }).toString();
        window.location.hash = `#/busqueda-especialistas?${queryParams}`;
    };

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
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                 <div className="max-w-2xl w-full">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-dark-blue sm:text-5xl">
                            Encuentra tu Especialista
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Busca por ciudad, sector y especialidad.
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="mt-12 bg-white p-8 rounded-2xl shadow-xl space-y-6">
                        {/* City */}
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                            <select
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            >
                                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        
                        {/* Sector */}
                        <div>
                            <label htmlFor="sector" className="block text-sm font-medium text-gray-700">Sector (Opcional)</label>
                            <select
                                id="sector"
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                disabled={availableSectors.length === 0}
                            >
                                <option value="">Todos los sectores</option>
                                {availableSectors.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Specialty */}
                        <div>
                            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Especialidad</label>
                            <select
                                id="specialty"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            >
                                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105"
                            >
                                Buscar Especialistas
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SchedulingPage;