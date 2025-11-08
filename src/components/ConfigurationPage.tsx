import React from 'react';
import { RClinicLogo, Cog6ToothIcon, TicketIcon, ShieldCheckIcon, MegaphoneIcon, CalendarDaysIcon } from './Icons';

const ConfigurationPage: React.FC = () => {
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
                <div className="max-w-6xl w-full">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold tracking-tight text-dark-blue sm:text-5xl">
                            Portal de Administración
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Selecciona el panel al que deseas acceder.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card para Agenda Médica */}
                        <a 
                            href="#/agenda-medica" 
                            onClick={(e) => { e.preventDefault(); window.location.hash = '#/agenda-medica'; }}
                            className="group block p-8 bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-indigo-400 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="flex-shrink-0 h-20 w-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <CalendarDaysIcon className="h-10 w-10" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-dark-blue">Agenda Médica</h3>
                                <p className="mt-2 text-gray-600">Consulta las citas agendadas por día o semana.</p>
                            </div>
                        </a>
                        {/* Card para Horarios */}
                        <a 
                            href="#/configuracion-horarios" 
                            onClick={(e) => { e.preventDefault(); window.location.hash = '#/configuracion-horarios'; }}
                            className="group block p-8 bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="flex-shrink-0 h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <Cog6ToothIcon className="h-10 w-10" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-dark-blue">Gestión de Horarios</h3>
                                <p className="mt-2 text-gray-600">Configura la disponibilidad de los médicos.</p>
                            </div>
                        </a>
                        {/* Card para Verificador de Cupones */}
                        <a 
                            href="#/verificador-cupones" 
                            onClick={(e) => { e.preventDefault(); window.location.hash = '#/verificador-cupones'; }}
                            className="group block p-8 bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="flex-shrink-0 h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <ShieldCheckIcon className="h-10 w-10" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-dark-blue">Verificador de Cupones</h3>
                                <p className="mt-2 text-gray-600">Portal para que los aliados validen cupones.</p>
                            </div>
                        </a>
                        {/* Card para Portal de Referidos */}
                         <a 
                            href="#/portal-referidos" 
                            onClick={(e) => { e.preventDefault(); window.location.hash = '#/portal-referidos'; }}
                            className="group block p-8 bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="flex-shrink-0 h-20 w-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <MegaphoneIcon className="h-10 w-10" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-dark-blue">Portal de Referidos</h3>
                                <p className="mt-2 text-gray-600">Accede a tu enlace y revisa tus estadísticas.</p>
                            </div>
                        </a>
                        {/* Card para Panel de Administración */}
                        <a 
                            href="#/admin" 
                            onClick={(e) => { e.preventDefault(); window.location.hash = '#/admin'; }}
                            className="group block p-8 bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="flex-shrink-0 h-20 w-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <TicketIcon className="h-10 w-10" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-dark-blue">Panel de Control</h3>
                                <p className="mt-2 text-gray-600">Administra el sitio, usuarios y más.</p>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConfigurationPage;
