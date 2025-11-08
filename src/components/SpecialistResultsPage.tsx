import React, { useState, useEffect } from 'react';
import { RClinicLogo, MapPinIcon, CurrencyDollarIcon, CalendarIcon, CheckCircleIcon } from './Icons';
import { SPECIALISTS_DATA, MEDICAL_CENTERS } from '../constants';
import type { Specialist } from '../types';

type View = 'list' | 'schedule' | 'patient-data' | 'confirmation';

// --- Timezone-Safe Date Utilities ---
const toLocalYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
    return date.toLocaleDateString('es-ES', options);
};

const SpecialistResultsPage: React.FC = () => {
    // --- State Management ---
    const [view, setView] = useState<View>('list');
    const [filteredSpecialists, setFilteredSpecialists] = useState<Specialist[]>([]);
    const [searchParams, setSearchParams] = useState({ ciudad: '', sector: '', especialidad: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [patientData, setPatientData] = useState({ firstName: '', lastName: '', phone: '', email: '' });

    // --- Effects ---
    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const ciudad = params.get('ciudad') || '';
        const sector = params.get('sector') || '';
        const especialidad = params.get('especialidad') || '';

        setSearchParams({ ciudad, sector, especialidad });

        setTimeout(() => {
            const matchingCenterIds = MEDICAL_CENTERS
                .filter(mc => mc.status === 'visible' && mc.city === ciudad && (!sector || mc.sector === sector))
                .map(mc => mc.id);

            let results = SPECIALISTS_DATA.filter(s => 
                s.status === 'visible' &&
                (!especialidad || s.specialty === especialidad) &&
                matchingCenterIds.includes(s.medicalCenterId)
            );
            
            setFilteredSpecialists(results);
            setIsLoading(false);
        }, 500);
    }, []);

    // --- Event Handlers ---
    const handleSelectSpecialist = (specialist: Specialist) => {
        setSelectedSpecialist(specialist);
        
        // **DEFINITIVE FIX:** Intelligently find and set the first available date.
        // This logic runs *before* rendering the schedule view, ensuring data is ready.
        const todayStr = toLocalYYYYMMDD(new Date());
        const sortedAvailableDates = Object.keys(specialist.availability)
            .filter(d => specialist.availability[d]?.length > 0)
            .sort();
        
        const firstAvailableDate = sortedAvailableDates.find(date => date >= todayStr);

        setSelectedDate(firstAvailableDate || ''); // Set to first available date, or empty if none are in the future
        setSelectedTime('');
        
        setView('schedule');
    };
    
    const handlePatientDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatientData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleConfirmAppointment = (e: React.FormEvent) => {
        e.preventDefault();
        setView('confirmation');
    };

    const handleResetFlow = () => {
        setView('list');
        setSelectedSpecialist(null);
        setSelectedDate('');
        setSelectedTime('');
        setPatientData({ firstName: '', lastName: '', phone: '', email: '' });
    };

    // --- Sub-Components / Render Functions ---
    const SpecialistCard: React.FC<{ specialist: Specialist; onSelect: () => void }> = ({ specialist, onSelect }) => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row">
                <img className="h-48 w-full object-cover sm:h-auto sm:w-48" src={specialist.photoUrl} alt={`Dr(a). ${specialist.name}`} />
                <div className="p-6 flex flex-col flex-grow">
                    <div>
                        <p className="text-sm font-semibold text-primary uppercase tracking-wide">{specialist.specialty}</p>
                        <h3 className="mt-1 text-2xl font-bold text-dark-blue">{specialist.name}</h3>
                        <p className="mt-2 text-gray-600 text-sm">{specialist.biography}</p>
                        <div className="mt-3 space-y-2 text-gray-600 text-sm">
                            <p className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" /> {specialist.address}</p>
                             <p className="flex items-center"><CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" /> Valor Consulta: <span className="font-bold ml-1">${specialist.consultationFee}</span></p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={onSelect}
                            className="w-full text-center bg-primary text-white font-bold rounded-full px-6 py-3 text-sm transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-primary/40"
                        >
                            Ver Horarios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderListView = () => (
        <div className="max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-dark-blue sm:text-5xl">
                    Especialistas Encontrados
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Resultados para: <span className="font-semibold">{searchParams.especialidad}</span> en <span className="font-semibold">{searchParams.ciudad}{searchParams.sector && `, ${searchParams.sector}`}</span>
                </p>
            </div>
            <div className="mt-12 space-y-8">
                {isLoading ? <p className="text-center text-lg text-gray-500">Buscando especialistas...</p> :
                 filteredSpecialists.length > 0 ? filteredSpecialists.map(s => <SpecialistCard key={s.id} specialist={s} onSelect={() => handleSelectSpecialist(s)} />) :
                 <div className="text-center bg-white p-10 rounded-xl shadow-md">
                     <h3 className="text-2xl font-bold text-dark-blue">No se encontraron resultados</h3>
                     <p className="mt-2 text-gray-600">Intenta ajustar tus filtros de búsqueda.</p>
                 </div>
                }
            </div>
             <div className="text-center mt-12">
                <a href="#/agendamiento" onClick={(e) => { e.preventDefault(); window.location.hash = '#/agendamiento'}} className="text-md font-medium text-primary hover:underline transition-colors">
                   &larr; Cambiar Búsqueda
                </a>
            </div>
        </div>
    );
    
    const renderScheduleView = () => {
        if (!selectedSpecialist) return null;

        const today = new Date();
        const dates = [0, 1, 2].map(d => {
            const date = new Date();
            date.setDate(today.getDate() + d);
            return date;
        });
        
        const availableTimes = selectedSpecialist.availability[selectedDate] || [];

        return (
            <div className="max-w-2xl mx-auto w-full bg-white p-8 rounded-2xl shadow-xl">
                 <button onClick={handleResetFlow} className="text-md font-medium text-gray-700 hover:text-primary transition-colors mb-4">
                    &larr; Volver a la lista
                </button>
                <h2 className="text-3xl font-extrabold text-dark-blue">Agendar Cita con</h2>
                <p className="text-xl font-semibold text-primary mt-1">{selectedSpecialist.name}</p>

                <div className="mt-8">
                    <h3 className="text-lg font-bold text-dark-blue">1. Selecciona una fecha</h3>
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {dates.map(date => {
                            const dateString = toLocalYYYYMMDD(date);
                            return (
                                <button key={dateString} onClick={() => { setSelectedDate(dateString); setSelectedTime(''); }} className={`p-2 rounded-lg text-center transition-colors ${selectedDate === dateString ? 'bg-primary text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200'}`}>
                                    <p className="font-bold text-sm">{formatDate(date, { weekday: 'short' })}</p>
                                    <p className="text-2xl font-bold">{formatDate(date, { day: 'numeric' })}</p>
                                    <p className="text-xs">{formatDate(date, { month: 'short' })}</p>
                                </button>
                            )
                        })}
                        <div className="p-2 rounded-lg bg-gray-100 flex flex-col items-center justify-center">
                            <label htmlFor="date-picker" className="cursor-pointer flex flex-col items-center">
                                <CalendarIcon className="h-6 w-6 text-gray-600"/>
                                <span className="text-xs mt-1 font-semibold text-gray-600">Más fechas</span>
                            </label>
                           <input type="date" id="date-picker" className="sr-only" onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }} min={toLocalYYYYMMDD(today)} />
                        </div>
                    </div>
                </div>

                 <div className="mt-8">
                    <h3 className="text-lg font-bold text-dark-blue">2. Selecciona una hora</h3>
                     <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableTimes.length > 0 ? availableTimes.map(time => (
                            <button key={time} onClick={() => setSelectedTime(time)} className={`p-3 rounded-lg transition-colors text-sm font-semibold ${selectedTime === time ? 'bg-primary text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200'}`}>{time}</button>
                        )) : <p className="col-span-full text-center text-gray-500 py-4">No hay horarios disponibles para esta fecha.</p>}
                     </div>
                 </div>
                 <div className="mt-10">
                    <button onClick={() => setView('patient-data')} disabled={!selectedTime} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Siguiente: Ingresar tus Datos
                    </button>
                 </div>
            </div>
        );
    };

    const renderPatientDataView = () => (
         <div className="max-w-2xl mx-auto w-full bg-white p-8 rounded-2xl shadow-xl">
             <button onClick={() => setView('schedule')} className="text-md font-medium text-gray-700 hover:text-primary transition-colors mb-4">
                &larr; Cambiar Horario
            </button>
            <h2 className="text-3xl font-extrabold text-dark-blue">Datos del Paciente</h2>
            <p className="mt-2 text-gray-600">Casi listo. Confirma tus datos para agendar la cita.</p>
            <form onSubmit={handleConfirmAppointment} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombres</label>
                        <input type="text" name="firstName" id="firstName" required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md" value={patientData.firstName} onChange={handlePatientDataChange} />
                    </div>
                     <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellidos</label>
                        <input type="text" name="lastName" id="lastName" required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md" value={patientData.lastName} onChange={handlePatientDataChange} />
                    </div>
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono de Contacto</label>
                    <input type="tel" name="phone" id="phone" required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md" value={patientData.phone} onChange={handlePatientDataChange} />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico (Opcional)</label>
                    <input type="email" name="email" id="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md" value={patientData.email} onChange={handlePatientDataChange} />
                </div>
                 <div className="mt-10">
                    <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-accent text-dark-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300">
                        Confirmar Cita
                    </button>
                 </div>
            </form>
         </div>
    );
    
    const renderConfirmationView = () => {
        const date = new Date(`${selectedDate}T00:00:00`);
        const formattedDate = formatDate(date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return(
            <div className="max-w-2xl mx-auto w-full bg-white p-8 rounded-2xl shadow-xl text-center">
                <CheckCircleIcon className="h-20 w-20 text-accent mx-auto"/>
                <h2 className="mt-6 text-3xl font-extrabold text-dark-blue">¡Cita Confirmada!</h2>
                <p className="mt-4 text-lg text-gray-600">Tu cita ha sido agendada con éxito.</p>
                <div className="mt-8 text-left bg-gray-50 p-6 rounded-lg space-y-3">
                    <p><span className="font-bold">Paciente:</span> {patientData.firstName} {patientData.lastName}</p>
                    <p><span className="font-bold">Especialista:</span> {selectedSpecialist?.name}</p>
                    <p><span className="font-bold">Fecha:</span> {formattedDate}</p>
                    <p><span className="font-bold">Hora:</span> {selectedTime}</p>
                </div>
                <p className="mt-6 text-gray-600">Te estamos enviando la confirmación a tu correo y WhatsApp.</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                     <button onClick={() => window.location.hash = '#/agendamiento'} className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-full shadow-md text-md font-bold text-white bg-primary hover:bg-opacity-90">
                        Agendar otra cita
                    </button>
                    <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/';}} className="w-full sm:w-auto flex justify-center py-3 px-6 border border-gray-300 rounded-full shadow-sm text-md font-bold text-gray-700 bg-white hover:bg-gray-50">
                        Volver a la página principal
                    </a>
                </div>
            </div>
        )
    };

    const renderContent = () => {
        switch (view) {
            case 'list': return renderListView();
            case 'schedule': return renderScheduleView();
            case 'patient-data': return renderPatientDataView();
            case 'confirmation': return renderConfirmationView();
            default: return renderListView();
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="#/" onClick={(e) => { e.preventDefault(); handleResetFlow(); window.location.hash = '#/'; }} aria-label="RClinic Home">
                            <RClinicLogo />
                        </a>
                        <a href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} className="text-md font-medium text-gray-700 hover:text-primary transition-colors">
                            &larr; Volver al Inicio
                        </a>
                    </div>
                </div>
            </header>
            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 flex items-center">
                {renderContent()}
            </main>
        </div>
    );
};

export default SpecialistResultsPage;