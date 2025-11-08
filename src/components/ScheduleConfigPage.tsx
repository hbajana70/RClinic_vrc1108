import React, { useState, useMemo } from 'react';
import { RClinicLogo, UserIcon, KeyIcon, Cog6ToothIcon } from './Icons';
import { MEDICAL_CENTERS } from '../constants';

// --- Mock Data ---
const doctorsByCenter: { [key: string]: { id: number; name: string }[] } = {
    'kennedy': [
        { id: 1, name: 'Dr. Juan Pérez' },
        { id: 2, name: 'Dra. Ana García' },
    ],
    'omni': [
        { id: 4, name: 'Dra. María Fernández' },
        { id: 5, name: 'Dr. Luis Martinez' },
    ],
    'vernaza': [
        { id: 3, name: 'Dr. Carlos Rodríguez' },
        { id: 6, name: 'Dra. Laura Torres' },
    ],
};

const initialSchedules: { [doctorId: number]: { [day: string]: string[] } } = {
    1: { 'Lunes': ['09:00', '10:00', '11:00'], 'Miércoles': ['14:00', '15:00'], 'Viernes': ['09:00'] },
    2: { 'Martes': ['08:30', '09:30'], 'Jueves': ['10:30', '11:30', '12:30'] },
    4: { 'Lunes': ['15:00', '16:00'], 'Martes': ['15:00', '16:00'], 'Miércoles': ['15:00'] },
};

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// --- Components ---

const ConfigView: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [selectedCenter, setSelectedCenter] = useState(MEDICAL_CENTERS[0].id);
    const [selectedDoctor, setSelectedDoctor] = useState<number | undefined>(() => {
        const doctors = doctorsByCenter[MEDICAL_CENTERS[0].id] || [];
        return doctors.length > 0 ? doctors[0].id : undefined;
    });
    const [schedules, setSchedules] = useState(initialSchedules);
    const [newTime, setNewTime] = useState<{ [day: string]: string }>({});

    const availableDoctors = useMemo(() => doctorsByCenter[selectedCenter] || [], [selectedCenter]);

    React.useEffect(() => {
        // When center changes, update doctor to the first available in that center
        if (availableDoctors.length > 0) {
            setSelectedDoctor(availableDoctors[0].id);
        } else {
            setSelectedDoctor(undefined);
        }
    }, [selectedCenter, availableDoctors]);

    const doctorSchedule = useMemo(() => (selectedDoctor ? schedules[selectedDoctor] : {}) || {}, [schedules, selectedDoctor]);

    const handleAddTime = (day: string) => {
        const timeToAdd = newTime[day];
        if (timeToAdd && selectedDoctor) {
            const updatedDoctorSchedule = { ...doctorSchedule };
            const daySchedule = updatedDoctorSchedule[day] ? [...updatedDoctorSchedule[day]] : [];
            if (!daySchedule.includes(timeToAdd)) {
                daySchedule.push(timeToAdd);
                daySchedule.sort();
                updatedDoctorSchedule[day] = daySchedule;
                setSchedules(prev => ({ ...prev, [selectedDoctor]: updatedDoctorSchedule }));
            }
            setNewTime(prev => ({...prev, [day]: ''}));
        }
    };
    
    const handleRemoveTime = (day: string, time: string) => {
         if (selectedDoctor) {
            const updatedDoctorSchedule = { ...doctorSchedule };
            updatedDoctorSchedule[day] = updatedDoctorSchedule[day].filter(t => t !== time);
            setSchedules(prev => ({ ...prev, [selectedDoctor]: updatedDoctorSchedule }));
         }
    };

    return (
        <div className="max-w-5xl w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-dark-blue">Configuración de Horarios</h1>
                 <button onClick={onLogout} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                    Cerrar Sesión &rarr;
                </button>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl space-y-8">
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="center" className="block text-sm font-medium text-gray-700">Centro Médico</label>
                        <select id="center" value={selectedCenter} onChange={e => setSelectedCenter(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md">
                            {MEDICAL_CENTERS.map(center => <option key={center.id} value={center.id}>{center.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Médico</label>
                        <select id="doctor" value={selectedDoctor || ''} onChange={e => setSelectedDoctor(Number(e.target.value))} className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md" disabled={!selectedCenter || availableDoctors.length === 0}>
                            {availableDoctors.map(doc => <option key={doc.id} value={doc.id}>{doc.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Schedule */}
                <div>
                    <h2 className="text-xl font-bold text-dark-blue mb-4">Horarios de Atención</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {daysOfWeek.map(day => (
                            <div key={day} className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-bold text-center text-dark-blue mb-3">{day}</h3>
                                <div className="space-y-2">
                                    {doctorSchedule[day]?.length > 0 ? doctorSchedule[day].map(time => (
                                        <div key={time} className="flex items-center justify-between bg-white p-2 rounded text-sm">
                                            <span>{time}</span>
                                            <button onClick={() => handleRemoveTime(day, time)} className="text-red-500 hover:text-red-700">&times;</button>
                                        </div>
                                    )) : <p className="text-center text-xs text-gray-500">Sin horarios.</p>}
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <input type="time" value={newTime[day] || ''} onChange={e => setNewTime(prev => ({...prev, [day]: e.target.value}))} className="w-full border-gray-300 rounded-md text-sm p-1"/>
                                    <button onClick={() => handleAddTime(day)} className="bg-primary text-white text-lg font-bold rounded-md px-2 hover:bg-opacity-90">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LoginView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
            <Cog6ToothIcon className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-blue">
                Acceso a Horarios
            </h2>
            <p className="mt-2 text-center text-md text-gray-600">
                Ingresa tus credenciales para configurar los horarios.
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="rounded-md shadow-sm space-y-4">
                <div>
                    <label htmlFor="email-address" className="sr-only">Usuario</label>
                    <div className="relative">
                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="email-address" name="email" type="email" required className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md" placeholder="admin@rclinic.ec" />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Contraseña</label>
                     <div className="relative">
                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <KeyIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="password" name="password" type="password" required className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md" placeholder="••••••••" />
                    </div>
                </div>
            </div>

            <div>
                <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-full text-white bg-dark-blue hover:bg-opacity-90">
                    Ingresar
                </button>
            </div>
        </form>
    </div>
);


const ScheduleConfigPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                {isLoggedIn ? <ConfigView onLogout={() => setIsLoggedIn(false)} /> : <LoginView onLogin={() => setIsLoggedIn(true)} />}
            </main>
        </div>
    );
};

export default ScheduleConfigPage;