import React from 'react';
import { MapPinIcon, ShieldCheckIcon } from './Icons';

const OnlineServices: React.FC = () => {
  return (
    <section id="portal-paciente" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Portal del Paciente</h2>
                <p className="mt-2 text-3xl font-extrabold text-dark-blue tracking-tight sm:text-4xl">
                    Tu Salud, a un Clic de Distancia
                </p>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    Gestiona tus citas y consulta tu información médica de forma segura y centralizada.
                </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
                {/* Card de Agendamiento */}
                <div className="p-8 bg-gray-50/70 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                    <div className="flex-shrink-0 h-14 w-14 bg-primary text-white rounded-xl flex items-center justify-center">
                        <MapPinIcon className="h-8 w-8" />
                    </div>
                    <div className="mt-6 flex-grow">
                        <h3 className="text-xl font-bold text-dark-blue">Agendamiento Inteligente</h3>
                        <p className="mt-2 text-gray-600">
                            Filtra por cercanía geográfica para encontrar el especialista más próximo, o busca por la mejor oferta para optimizar tus gastos en salud. Tú decides.
                        </p>
                    </div>
                    <div className="mt-8">
                        <a 
                            href="#/agendamiento" 
                            onClick={(e) => { e.preventDefault(); window.location.hash = '#/agendamiento'; }} 
                            className="inline-block w-full text-center bg-primary text-white font-bold rounded-full px-8 py-3 text-lg transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-primary/40">
                            Buscar Cita Ahora
                        </a>
                    </div>
                </div>
                {/* Card de Resultados */}
                <div className="p-8 bg-gray-50/70 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                    <div className="flex-shrink-0 h-14 w-14 bg-accent text-white rounded-xl flex items-center justify-center">
                        <ShieldCheckIcon className="h-8 w-8" />
                    </div>
                    <div className="mt-6 flex-grow">
                        <h3 className="text-xl font-bold text-dark-blue">Acceso Seguro a Resultados</h3>
                        <p className="mt-2 text-gray-600">
                            Ingresa a tu portal personal con usuario y contraseña para ver tus informes de laboratorio e imágenes de forma confidencial y cuando lo necesites.
                        </p>
                    </div>
                    <div className="mt-8">
                        <a 
                            href="#/resultados" 
                            onClick={(e) => { e.preventDefault(); window.location.hash = '#/resultados'; }} 
                            className="inline-block w-full text-center bg-accent text-dark-blue font-bold rounded-full px-8 py-3 text-lg transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-accent/40">
                            Ingresar al Portal
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default OnlineServices;