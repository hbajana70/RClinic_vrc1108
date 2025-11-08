import React, { useState } from 'react';
import { RClinicLogo, KeyIcon, DocumentDuplicateIcon, BanknotesIcon, ChartBarIcon, UsersIcon } from './Icons';
import { REFERRERS_DATA } from '../constants';
import type { Referrer } from '../types';

const LoginView: React.FC<{ onLogin: (referrer: Referrer) => void }> = ({ onLogin }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const referrer = REFERRERS_DATA.find(r => r.referralCode === code.toUpperCase() && r.status === 'approved' && r.activityStatus === 'active');
        if (referrer) {
            onLogin(referrer);
        } else {
            setError('Código de referido inválido, no aprobado o inactivo.');
        }
    };
    
    return (
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
            <div className="text-center">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-blue">
                    Portal de Referidos
                </h2>
                <p className="mt-2 text-center text-md text-gray-600">
                    Ingresa tu código único para ver tu panel.
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="referral-code" className="sr-only">Código de Referido</label>
                    <div className="relative">
                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <KeyIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="referral-code" name="code" type="text" value={code} onChange={(e) => { setCode(e.target.value); setError(''); }} required className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md" placeholder="TU-CODIGO" />
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-full text-white bg-dark-blue hover:bg-opacity-90">
                        Ingresar
                    </button>
                </div>
            </form>
        </div>
    );
};

const DashboardView: React.FC<{ referrer: Referrer, onLogout: () => void }> = ({ referrer, onLogout }) => {
    const referralLink = `https://rclinic.ec/#/registro-cliente?ref=${referrer.referralCode}`;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl w-full space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-extrabold text-dark-blue">Bienvenido, {referrer.name.split(' ')[0]}</h1>
                    <p className="mt-2 text-xl text-gray-600">Este es tu panel de control de referidos.</p>
                </div>
                <button onClick={onLogout} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                    Cerrar Sesión &rarr;
                </button>
            </div>
            
            {/* Referral Link */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="font-bold text-dark-blue">Tu Enlace de Referido Único</h2>
                <p className="text-sm text-gray-500 mt-1">Comparte este enlace. Cualquier cliente que se registre a través de él será atribuido a ti.</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <input type="text" readOnly value={referralLink} className="flex-grow w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg" />
                    <button onClick={handleCopy} className="flex items-center justify-center px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                        <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                        {copied ? '¡Copiado!' : 'Copiar'}
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <BanknotesIcon className="h-10 w-10 text-green-500 mx-auto" />
                    <p className="mt-2 text-3xl font-extrabold text-dark-blue">$125.50</p>
                    <p className="text-gray-600">Ganancias Este Mes</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <UsersIcon className="h-10 w-10 text-blue-500 mx-auto" />
                    <p className="mt-2 text-3xl font-extrabold text-dark-blue">3</p>
                    <p className="text-gray-600">Clientes Activos</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <ChartBarIcon className="h-10 w-10 text-purple-500 mx-auto" />
                    <p className="mt-2 text-3xl font-extrabold text-dark-blue">12</p>
                    <p className="text-gray-600">Total de Clics</p>
                </div>
            </div>
        </div>
    );
};

const ReferralDashboardPage: React.FC = () => {
    const [loggedInReferrer, setLoggedInReferrer] = useState<Referrer | null>(null);

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
                {loggedInReferrer ? 
                    <DashboardView referrer={loggedInReferrer} onLogout={() => setLoggedInReferrer(null)} /> : 
                    <LoginView onLogin={setLoggedInReferrer} />
                }
            </main>
        </div>
    );
};

export default ReferralDashboardPage;