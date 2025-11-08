import React, { useState, useMemo } from 'react';
import { RClinicLogo, UserIcon, KeyIcon, ClockIcon, PhoneIcon, EnvelopeIcon, CheckCircleIcon, XMarkIcon, CalendarDaysIcon } from './Icons';
import { APPOINTMENTS_DATA, SCHEDULE_USERS_DATA, SPECIALISTS_DATA, MEDICAL_CENTERS } from '../constants';
import type { Appointment, ScheduleUser } from '../types';

const LoginView: React.FC<{ onLogin: (user: ScheduleUser) => void }> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = SCHEDULE_USERS_DATA.find(u => u.username.toLowerCase() === username.toLowerCase());
        // In a real app, password would be hashed and checked securely.
        // For this demo, we'll just check if the user exists.
        if (user) {
            onLogin(user);
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
            <div className="text-center">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-blue">
                    Portal de Agenda Médica
                </h2>
                <p className="mt-2 text-center text-md text-gray-600">
                    Ingresa para ver las citas programadas.
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="rounded-md shadow-sm space-y-4">
                    <div>
                        <label htmlFor="username" className="sr-only">Usuario</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                                placeholder="Usuario"
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
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                                placeholder="Contraseña"
                            />
                        </div>
                    </div>
                </div>
                {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-full text-white bg-dark-blue hover:bg-opacity-90"
                    >
                        Ingresar
                    </button>
                </div>
            </form>
        </div>
    );
};

const DashboardView: React.FC<{ user: ScheduleUser; onLogout: () => void }> = ({ user, onLogout }) => {
    type FilterType = 'today' | 'tomorrow' | 'week';
    const [filter, setFilter] = useState<FilterType>('today');
    const [selectedDoctorFilter, setSelectedDoctorFilter] = useState<string>('all');
    const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS_DATA);
    const [modal, setModal] = useState<{ isOpen: boolean; date: string | null; count: number }>({ isOpen: false, date: null, count: 0 });
    
    // Swipe state for mobile
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    const medicalCenter = MEDICAL_CENTERS.find(mc => mc.id === user.medicalCenterId);
    const specialistMap = new Map(SPECIALISTS_DATA.map(s => [s.id, s]));
    
    const statusConfig: { [key in Appointment['status']]: { text: string; bg: string; textColor: string; dotColor: string } } = {
        'agendada': { text: 'Agendada', bg: 'bg-gray-100', textColor: 'text-gray-800', dotColor: 'bg-gray-400' },
        'recordatorio-enviado': { text: 'Recordatorio', bg: 'bg-blue-100', textColor: 'text-blue-800', dotColor: 'bg-blue-500' },
        'confirmada': { text: 'Confirmada', bg: 'bg-green-100', textColor: 'text-green-800', dotColor: 'bg-green-500' },
        'cancelada': { text: 'Cancelada', bg: 'bg-red-100', textColor: 'text-red-800', dotColor: 'bg-red-500' },
        'reprogramar': { text: 'Reprogramar', bg: 'bg-orange-100', textColor: 'text-orange-800', dotColor: 'bg-orange-500' },
    };

    const handleUpdateStatus = (appointmentId: number, status: Appointment['status']) => {
        setAppointments(currentAppointments =>
            currentAppointments.map(app =>
                app.id === appointmentId ? { ...app, status } : app
            )
        );
    };

    const doctorsInCenter = useMemo(() => 
        SPECIALISTS_DATA.filter(s => s.medicalCenterId === user.medicalCenterId),
        [user.medicalCenterId]
    );

    const baseFilteredAppointments = useMemo(() => {
        let specialistIdsToDisplay: number[];
        if (user.role === 'doctor' && user.specialistId) {
            specialistIdsToDisplay = [user.specialistId];
        } else {
            if (selectedDoctorFilter === 'all') {
                specialistIdsToDisplay = doctorsInCenter.map(d => d.id);
            } else {
                specialistIdsToDisplay = [parseInt(selectedDoctorFilter, 10)];
            }
        }
        return appointments.filter(app => specialistIdsToDisplay.includes(app.specialistId));
    }, [user, selectedDoctorFilter, doctorsInCenter, appointments]);

    const calculateStats = (apps: Appointment[]) => {
        return apps.reduce((acc, app) => {
            acc.total++;
            acc[app.status]++;
            return acc;
        }, { total: 0, agendada: 0, 'recordatorio-enviado': 0, confirmada: 0, cancelada: 0, reprogramar: 0 });
    };

    const stats = useMemo(() => {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);
        const tomorrowEnd = new Date(tomorrowStart);
        tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
        const weekEnd = new Date(todayStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const toYYYYMMDD = (date: Date) => date.toISOString().split('T')[0];

        const todayApps = baseFilteredAppointments.filter(app => app.date === toYYYYMMDD(todayStart));
        const tomorrowApps = baseFilteredAppointments.filter(app => app.date === toYYYYMMDD(tomorrowStart));
        const weekApps = baseFilteredAppointments.filter(app => {
            const appDate = new Date(`${app.date}T00:00:00`);
            return appDate >= todayStart && appDate < weekEnd;
        });

        return {
            today: calculateStats(todayApps),
            tomorrow: calculateStats(tomorrowApps),
            week: calculateStats(weekApps),
        };
    }, [baseFilteredAppointments]);

    const filteredAppointments = useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        const toYYYYMMDD = (date: Date) => date.toISOString().split('T')[0];
        
        return baseFilteredAppointments.filter(app => {
            const appDate = new Date(`${app.date}T00:00:00`);
            switch (filter) {
                case 'today':
                    return app.date === toYYYYMMDD(today);
                case 'tomorrow':
                    return app.date === toYYYYMMDD(tomorrow);
                case 'week':
                     return appDate >= today && appDate < nextWeek;
                default:
                    return false;
            }
        }).sort((a,b) => a.time.localeCompare(b.time));
    }, [filter, baseFilteredAppointments]);
    
    const groupedAppointments = useMemo(() => {
         return filteredAppointments.reduce((acc, app) => {
            if (!acc[app.date]) {
                acc[app.date] = [];
            }
            acc[app.date].push(app);
            return acc;
        }, {} as { [date: string]: Appointment[] });
    }, [filteredAppointments]);
    
    const sortedDates = Object.keys(groupedAppointments).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const formatDateHeader = (dateString: string) => {
        const date = new Date(`${dateString}T00:00:00`);
        return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const handleOpenReminderModal = (date: string) => {
        const appointmentsOnDate = groupedAppointments[date] || [];
        const count = appointmentsOnDate.filter(app => app.status === 'agendada').length;
        if (count > 0) {
            setModal({ isOpen: true, date, count });
        }
    };

    const handleConfirmSendReminders = () => {
        if (!modal.date) return;
        setAppointments(currentAppointments =>
            currentAppointments.map(app =>
                app.date === modal.date && app.status === 'agendada'
                    ? { ...app, status: 'recordatorio-enviado' }
                    : app
            )
        );
        setModal({ isOpen: false, date: null, count: 0 });
    };

    // Mobile Swipe Handlers
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEndX(null);
        setTouchStartX(e.targetTouches[0].clientX);
    };
    
    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };
    
    const onTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
    
        const filters: FilterType[] = ['today', 'tomorrow', 'week'];
        const currentIndex = filters.indexOf(filter);
    
        if (isLeftSwipe && currentIndex < filters.length - 1) {
            setFilter(filters[currentIndex + 1]);
        }
    
        if (isRightSwipe && currentIndex > 0) {
            setFilter(filters[currentIndex - 1]);
        }
        
        setTouchStartX(null);
        setTouchEndX(null);
    };
    
    const StatCard: React.FC<{ title: string; type: FilterType; stats: ReturnType<typeof calculateStats> }> = ({ title, type, stats }) => (
        <div 
            onClick={() => setFilter(type)} 
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${filter === type ? 'bg-primary-light ring-2 ring-primary' : 'bg-white shadow-md hover:shadow-lg hover:-translate-y-1'}`}
        >
            <div className="flex justify-between items-center gap-4">
                <div>
                    <h3 className="font-bold text-lg text-dark-blue">{title}</h3>
                    <p className="text-5xl font-extrabold text-primary mt-1">{stats.total}</p>
                    <p className="text-sm text-gray-500 -mt-1">Citas Agendadas</p>
                </div>
                <ul className="text-sm space-y-1.5 text-gray-700 flex-shrink-0">
                    <li className="flex items-center justify-between"><div className="flex items-center"><span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span><span>Confirmadas</span></div><span className="font-bold ml-3">{stats.confirmada}</span></li>
                    <li className="flex items-center justify-between"><div className="flex items-center"><span className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2"></span><span>Recordatorio</span></div><span className="font-bold ml-3">{stats['recordatorio-enviado']}</span></li>
                    <li className="flex items-center justify-between"><div className="flex items-center"><span className="h-2.5 w-2.5 rounded-full bg-gray-400 mr-2"></span><span>Agendadas</span></div><span className="font-bold ml-3">{stats.agendada}</span></li>
                </ul>
            </div>
        </div>
    );
    
    const MobileDashboard: React.FC = () => {
        const filterOptions: { key: FilterType, label: string }[] = [
            { key: 'today', label: 'Hoy' },
            { key: 'tomorrow', label: 'Mañana' },
            { key: 'week', label: 'Próx. 7 días' },
        ];

        const currentStats = stats[filter];

        return (
            <div>
                <div className="flex justify-around border-b border-gray-200 mb-4">
                    {filterOptions.map(opt => (
                        <button 
                            key={opt.key}
                            onClick={() => setFilter(opt.key)}
                            className={`py-2 px-1 text-sm font-bold w-full transition-colors ${filter === opt.key ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
                <div 
                    onTouchStart={onTouchStart} 
                    onTouchMove={onTouchMove} 
                    onTouchEnd={onTouchEnd}
                    className="bg-white p-4 rounded-xl shadow-md"
                >
                    <div className="text-center border-b pb-3 mb-3">
                        <p className="text-4xl font-extrabold text-primary">{currentStats.total}</p>
                        <p className="text-md text-gray-600">Citas Agendadas</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {[
                            { label: 'Confirmadas', count: currentStats.confirmada, color: 'bg-green-500' },
                            { label: 'Recordatorio', count: currentStats['recordatorio-enviado'], color: 'bg-blue-500' },
                            { label: 'Agendadas', count: currentStats.agendada, color: 'bg-gray-400' },
                            { label: 'Canceladas', count: currentStats.cancelada, color: 'bg-red-500' },
                        ].map(item => (
                             <div key={item.label} className="flex items-center">
                                <span className={`h-2.5 w-2.5 rounded-full ${item.color} mr-2`}></span>
                                <span className="text-gray-700">{item.label}:</span>
                                <span className="font-bold ml-auto text-dark-blue">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
             <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-dark-blue">Agenda de Citas</h1>
                    <p className="text-lg text-gray-600">
                        {user.role === 'doctor' ? specialistMap.get(user.specialistId as number)?.name : medicalCenter?.name}
                    </p>
                </div>
                <button onClick={onLogout} className="text-md font-medium text-gray-700 hover:text-primary transition-colors self-start sm:self-center">
                    Cerrar Sesión &rarr;
                </button>
            </div>
            
             <div className="mb-8">
                {user.role === 'admin' && (
                     <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
                        <label htmlFor="doctor-filter" className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Médico</label>
                        <select
                            id="doctor-filter"
                            value={selectedDoctorFilter}
                            onChange={(e) => setSelectedDoctorFilter(e.target.value)}
                            className="block w-full sm:w-80 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            <option value="all">Todos los médicos</option>
                            {doctorsInCenter.map(doc => (
                                <option key={doc.id} value={doc.id}>{doc.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                {/* Desktop Dashboard */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard title="Hoy" type="today" stats={stats.today} />
                    <StatCard title="Mañana" type="tomorrow" stats={stats.tomorrow} />
                    <StatCard title="Próximos 7 días" type="week" stats={stats.week} />
                </div>
                {/* Mobile Dashboard */}
                <div className="block md:hidden">
                    <MobileDashboard />
                </div>
            </div>

            {sortedDates.length > 0 ? (
                <div className="space-y-8">
                    {sortedDates.map(date => {
                        const appointmentsOnDate = groupedAppointments[date] || [];
                        const pendingReminders = appointmentsOnDate.filter(a => a.status === 'agendada').length;
                        return (
                        <div key={date}>
                             <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2 mb-4 border-b-2 border-primary">
                                <h2 className="text-xl font-bold text-dark-blue">{formatDateHeader(date)}</h2>
                                <button
                                    onClick={() => handleOpenReminderModal(date)}
                                    disabled={pendingReminders === 0}
                                    className="flex items-center gap-2 mt-2 sm:mt-0 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                                >
                                    <EnvelopeIcon className="h-4 w-4" />
                                    Enviar Recordatorios ({pendingReminders})
                                </button>
                            </div>
                            <div className="space-y-4">
                                {appointmentsOnDate.map(app => (
                                    <div key={app.id} className="bg-white p-4 rounded-lg shadow-md">
                                        <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 sm:flex sm:items-center sm:gap-4">
                                            {/* Time */}
                                            <div className="flex items-center gap-3 text-lg font-bold text-primary sm:w-28">
                                                <ClockIcon className="h-5 w-5" />
                                                <span>{app.time}</span>
                                            </div>
                                            {/* Status Badge */}
                                            <div className="row-start-1 col-start-2 flex justify-end sm:order-last sm:w-auto">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusConfig[app.status].bg} ${statusConfig[app.status].textColor}`}>
                                                    {statusConfig[app.status].text}
                                                </span>
                                            </div>
                                            {/* Patient Name / Doctor */}
                                            <div className="row-start-2 col-start-1 sm:flex-grow">
                                                <p className="font-bold text-dark-blue">{app.patientName}</p>
                                                {user.role === 'admin' && (
                                                    <p className="text-sm text-gray-500">con <span className="font-semibold">{specialistMap.get(app.specialistId)?.name || 'Dr. Desconocido'}</span></p>
                                                )}
                                            </div>
                                            {/* Phone */}
                                            <div className="row-start-2 col-start-2 flex justify-end items-center gap-2 text-sm text-gray-600">
                                                <PhoneIcon className="h-4 w-4" />
                                                <span>{app.patientPhone}</span>
                                            </div>
                                        </div>
                                         {app.status === 'recordatorio-enviado' && (
                                            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2 justify-end">
                                                <button onClick={() => handleUpdateStatus(app.id, 'confirmada')} className="flex items-center gap-1 text-xs font-bold bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors">
                                                    <CheckCircleIcon className="h-4 w-4" /> Confirmar
                                                </button>
                                                <button onClick={() => handleUpdateStatus(app.id, 'cancelada')} className="flex items-center gap-1 text-xs font-bold bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors">
                                                    <XMarkIcon className="h-4 w-4" /> Cancelar
                                                </button>
                                                <button onClick={() => handleUpdateStatus(app.id, 'reprogramar')} className="flex items-center gap-1 text-xs font-bold bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600 transition-colors">
                                                    <ClockIcon className="h-4 w-4" /> Reprogramar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )})}
                </div>
            ) : (
                <div className="text-center bg-white p-12 rounded-lg shadow-md">
                     <CalendarDaysIcon className="h-16 w-16 mx-auto text-gray-300"/>
                    <h3 className="mt-4 text-xl font-bold text-dark-blue">No hay citas programadas</h3>
                    <p className="mt-1 text-gray-500">No se encontraron citas para el período y médico seleccionado.</p>
                </div>
            )}
            
            {modal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
                        <EnvelopeIcon className="h-12 w-12 mx-auto text-blue-500" />
                        <h3 className="mt-4 text-lg font-bold text-dark-blue">Confirmar Envío</h3>
                        <p className="mt-2 text-sm text-gray-600">
                           Se enviará un recordatorio (vía Email/WhatsApp) a <span className="font-bold">{modal.count}</span> paciente(s) con citas agendadas. ¿Deseas continuar?
                        </p>
                        <div className="mt-6 flex justify-center gap-4">
                            <button onClick={() => setModal({ isOpen: false, date: null, count: 0 })} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                                Cancelar
                            </button>
                             <button onClick={handleConfirmSendReminders} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                                Sí, Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const MedicalAgendaPage: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<ScheduleUser | null>(null);

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
                <div className="max-w-7xl w-full">
                    {loggedInUser ? (
                        <DashboardView user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
                    ) : (
                        <div className="flex justify-center">
                             <LoginView onLogin={setLoggedInUser} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MedicalAgendaPage;