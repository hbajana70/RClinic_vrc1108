import React, { useState } from 'react';
import { RClinicLogo, UserIcon, KeyIcon, CameraIcon, DocumentTextIcon } from './Icons';
import { REPORTS_DATA } from '../constants';
import type { Report } from '../types';

type View = 'login' | 'selection' | 'imaging' | 'lab';

const ResultsPage: React.FC = () => {
    const [view, setView] = useState<View>('login');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd have authentication logic here
        setView('selection');
    };

    const renderLogin = () => (
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-blue">
                    Portal de Pacientes
                </h2>
                <p className="mt-2 text-center text-md text-gray-600">
                    Ingresa para ver tus informes de forma segura.
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="rounded-md shadow-sm space-y-4">
                    <div>
                        <label htmlFor="email-address" className="sr-only">Usuario</label>
                        <div className="relative">
                             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Correo electrónico o usuario"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Contraseña</label>
                         <div className="relative">
                             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <KeyIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Contraseña"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-full text-white bg-dark-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-blue transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        Ingresar
                    </button>
                </div>
            </form>
        </div>
    );

    const renderSelection = () => (
        <div className="max-w-2xl w-full space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-dark-blue">Ver tus informes</h2>
                <p className="mt-2 text-lg text-gray-600">Selecciona el tipo de informe que deseas consultar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card Imágenes */}
                <div onClick={() => setView('imaging')} className="group cursor-pointer p-8 bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex-shrink-0 h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <CameraIcon className="h-10 w-10" />
                        </div>
                        <h3 className="mt-6 text-2xl font-bold text-dark-blue">Imágenes</h3>
                        <p className="mt-2 text-gray-600">Resonancias, Rayos X, Ecografías y más.</p>
                    </div>
                </div>
                 {/* Card Laboratorio */}
                <div onClick={() => setView('lab')} className="group cursor-pointer p-8 bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-accent transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex-shrink-0 h-20 w-20 bg-accent/10 text-accent rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <DocumentTextIcon className="h-10 w-10" />
                        </div>
                        <h3 className="mt-6 text-2xl font-bold text-dark-blue">Laboratorio</h3>
                        <p className="mt-2 text-gray-600">Análisis de sangre, perfiles bioquímicos, etc.</p>
                    </div>
                </div>
            </div>
             <div className="text-center mt-8">
                <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                    &larr; Volver a la página principal
                </a>
            </div>
        </div>
    );

    const renderReports = (type: 'imaging' | 'lab') => {
        const reports = REPORTS_DATA
            .filter(report => report.type === type)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        const title = type === 'imaging' ? 'Informes de Imágenes' : 'Informes de Laboratorio';

        return (
             <div className="max-w-4xl w-full space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-extrabold text-dark-blue">{title}</h2>
                     <button onClick={() => setView('selection')} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                        &larr; Volver a seleccionar
                    </button>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-xl space-y-4">
                    {reports.map(report => (
                        <div key={report.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                            <div>
                                <p className="font-bold text-lg text-dark-blue">{report.title}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    <span className="font-semibold">Fecha:</span> {new Date(report.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} | 
                                    <span className="font-semibold ml-2">Proveedor:</span> {report.provider}
                                </p>
                            </div>
                            <a href={report.url} target="_blank" rel="noopener noreferrer" className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 inline-block bg-primary text-white font-bold rounded-full px-6 py-2 text-sm transform transition-transform duration-300 hover:scale-105 shadow-md">
                                Ver Informe (PDF)
                            </a>
                        </div>
                    ))}
                    {reports.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No hay informes disponibles en esta categoría.</p>
                    )}
                </div>
                 <div className="text-center mt-8">
                    <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                        &larr; Ir a la página principal
                    </a>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (view) {
            case 'login':
                return renderLogin();
            case 'selection':
                return renderSelection();
            case 'imaging':
                return renderReports('imaging');
            case 'lab':
                return renderReports('lab');
            default:
                return renderLogin();
        }
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
                {renderContent()}
            </main>
        </div>
    );
};

export default ResultsPage;
