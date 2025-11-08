import React, { useState } from 'react';
import { RClinicLogo, KeyIcon, UserIcon, BuildingStorefrontIcon, TicketIcon, HeartIcon, UsersIcon, BuildingOffice2Icon, ClipboardDocumentListIcon, IdentificationIcon, MegaphoneIcon } from './Icons';
import ManageCoupons from './ManageCoupons';
import ManageBenefits from './ManageBenefits';
import ManageAssociates from './ManageAssociates';
import ManageScheduleUsers from './ManageScheduleUsers';
import ManageMedicalCenters from './ManageMedicalCenters';
import RedemptionHistory from './RedemptionHistory';
import ManageSpecialists from './ManageSpecialists';
import ManageReferrers from './ManageReferrers';

const AdminLoginView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
            <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} aria-label="Volver al Inicio">
                <RClinicLogo className="mx-auto h-10 w-auto" />
            </a>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-blue">
                Panel de Administración
            </h2>
            <p className="mt-2 text-center text-md text-gray-600">
                Ingresa tus credenciales para continuar.
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="rounded-md shadow-sm space-y-4">
                <div>
                    <label htmlFor="admin-user" className="sr-only">Usuario</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="admin-user" name="user" type="text" required className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md" placeholder="admin@rclinic.ec" />
                    </div>
                </div>
                <div>
                    <label htmlFor="admin-password" className="sr-only">Contraseña</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <KeyIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="admin-password" name="password" type="password" required className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md" placeholder="••••••••" />
                    </div>
                </div>
            </div>
            <div>
                <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-full text-white bg-dark-blue hover:bg-opacity-90">
                    Ingresar
                </button>
            </div>
        </form>
        <div className="text-center mt-6">
            <a 
                href="#/configuracion" 
                onClick={(e) => { e.preventDefault(); window.location.hash = '#/configuracion'; }} 
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
                &larr; Volver al Portal de Administración
            </a>
        </div>
    </div>
);

const AdminPanelView: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [activeSection, setActiveSection] = useState('medical-centers');

    return (
        <div className="w-full h-full flex">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-blue text-white flex flex-col flex-shrink-0">
                <div className="h-20 flex items-center justify-center px-4 border-b border-gray-700">
                    <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} aria-label="Volver al Inicio">
                        <RClinicLogo className="[&>span]:text-white [&>svg]:text-white" />
                    </a>
                </div>
                <nav className="flex-grow px-2 py-4">
                     <a
                        href="#/admin/medical-centers"
                        onClick={(e) => { e.preventDefault(); setActiveSection('medical-centers'); }}
                        className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-colors ${activeSection === 'medical-centers' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                    >
                        <BuildingOffice2Icon className="h-5 w-5 mr-3" />
                        Centros Médicos
                    </a>
                     <a
                        href="#/admin/specialists"
                        onClick={(e) => { e.preventDefault(); setActiveSection('specialists'); }}
                        className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-colors ${activeSection === 'specialists' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                    >
                        <IdentificationIcon className="h-5 w-5 mr-3" />
                        Especialistas
                    </a>
                     <a
                        href="#/admin/schedule-users"
                        onClick={(e) => { e.preventDefault(); setActiveSection('schedule-users'); }}
                        className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-colors ${activeSection === 'schedule-users' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                    >
                        <UsersIcon className="h-5 w-5 mr-3" />
                        Usuarios Horarios
                    </a>
                    <a
                        href="#/admin/benefits"
                        onClick={(e) => { e.preventDefault(); setActiveSection('benefits'); }}
                        className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-colors ${activeSection === 'benefits' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                    >
                        <HeartIcon className="h-5 w-5 mr-3" />
                        Beneficios Salud
                    </a>
                    <a
                        href="#/admin/coupons"
                        onClick={(e) => { e.preventDefault(); setActiveSection('coupons'); }}
                        className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-colors ${activeSection === 'coupons' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                    >
                        <TicketIcon className="h-5 w-5 mr-3" />
                        Cupones
                    </a>
                     <a
                        href="#/admin/referrers"
                        onClick={(e) => { e.preventDefault(); setActiveSection('referrers'); }}
                        className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-colors ${activeSection === 'referrers' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                    >
                        <MegaphoneIcon className="h-5 w-5 mr-3" />
                        Referidores
                    </a>
                    <a
                        href="#/admin/redemption-history"
                        onClick={(e) => { e.preventDefault(); setActiveSection('redemption-history'); }}
                        className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-colors ${activeSection === 'redemption-history' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                    >
                        <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
                        Historial de Canjes
                    </a>
                     <a
                        href="#/admin/associates"
                        onClick={(e) => { e.preventDefault(); setActiveSection('associates'); }}
                        className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-colors ${activeSection === 'associates' ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                    >
                        <BuildingStorefrontIcon className="h-5 w-5 mr-3" />
                        Asociados
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={onLogout} className="w-full text-left flex items-center px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-700">
                        Cerrar Sesión
                    </button>
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 bg-gray-100 overflow-y-auto">
                <div className="p-8">
                    {activeSection === 'benefits' && <ManageBenefits />}
                    {activeSection === 'coupons' && <ManageCoupons />}
                    {activeSection === 'redemption-history' && <RedemptionHistory />}
                    {activeSection === 'associates' && <ManageAssociates />}
                    {activeSection === 'medical-centers' && <ManageMedicalCenters />}
                    {activeSection === 'specialists' && <ManageSpecialists />}
                    {activeSection === 'schedule-users' && <ManageScheduleUsers />}
                    {activeSection === 'referrers' && <ManageReferrers />}
                </div>
            </main>
        </div>
    );
};

const AdminPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {isLoggedIn ? (
                <AdminPanelView onLogout={() => setIsLoggedIn(false)} />
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <AdminLoginView onLogin={() => setIsLoggedIn(true)} />
                </div>
            )}
        </div>
    );
};

export default AdminPage;