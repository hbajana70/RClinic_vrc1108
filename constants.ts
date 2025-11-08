import type { Offer, Coupon, CouponInstance, Service, Report, Specialist, MedicalCenter, Associate, ScheduleUser, Referrer, Appointment } from './types';

export const ALL_OFFERS_DATA: Offer[] = [
    { id: 1, icon: 'HeartIcon', highlight: 'Cardiología', category: 'Chequeo Preventivo', title: 'Evaluación Cardiovascular Completa', provider: 'Clínica Kennedy', price: 120.00, status: 'visible', placement: 'featured' },
    { id: 2, icon: 'EyeIcon', highlight: '25% Descuento', category: 'Oftalmología', title: 'Consulta y Medida de la Vista', provider: 'OmniHospital', price: 45.00, status: 'visible', placement: 'featured' },
    { id: 3, icon: 'BeakerIcon', highlight: 'Resultados en 24h', category: 'Laboratorio', title: 'Perfil Lipídico Completo', provider: 'Interlab', price: 35.00, status: 'visible', placement: 'featured' },
    { id: 4, icon: 'StethoscopeIcon', highlight: 'Precio Especial', category: 'Medicina General', title: 'Consulta Médica General + Bioimpedancia', provider: 'Hospital Vernaza', price: 30.00, status: 'visible', placement: 'featured' },
    { id: 5, icon: 'HeartIcon', highlight: 'Nuevo', category: 'Dermatología', title: 'Mapeo de Lunares (Dermatoscopía)', provider: 'Clínica Kennedy', price: 80.00, status: 'visible', placement: 'secondary' },
];

export const COUPONS_DATA: Coupon[] = [
    { id: 1, brandName: 'Pharmacys', brandLogoUrl: 'TEXT_ONLY', productImageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=2070&auto=format&fit=crop', discount: '15%', title: 'En Medicinas Seleccionadas', details: 'Aplica a medicinas sin receta.', terms: 'No acumulable con otras promociones.', expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), status: 'visible', placement: 'featured' },
    { id: 3, brandName: 'Cruz Azul', brandLogoUrl: 'TEXT_ONLY', productImageUrl: 'https://images.unsplash.com/photo-1571771894821-39A389511a78?q=80&w=2070&auto=format&fit=crop', discount: '20%', title: 'En Dermocosméticos', details: 'Productos seleccionados de cuidado de la piel.', terms: 'No acumulable con otras promociones.', expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), status: 'visible', placement: 'featured' },
    { id: 4, brandName: 'Netlife', brandLogoUrl: 'TEXT_ONLY', productImageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop', discount: '1 Mes', title: 'Gratis por Instalación', details: 'Contrata cualquier plan y obtén el primer mes gratis.', terms: 'Válido para nuevos clientes. Aplican restricciones.', expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), status: 'visible', placement: 'featured' },
    { id: 2, brandName: 'SanaSana', brandLogoUrl: 'TEXT_ONLY', productImageUrl: 'https://images.unsplash.com/photo-1585435557343-35f229b2f98d?q=80&w=2070&auto=format&fit=crop', discount: '10%', title: 'En toda la línea de Cuidado Personal', details: 'Shampoos, jabones, cremas y más.', terms: 'Válido en compras superiores a $20.', expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), status: 'visible', placement: 'featured' },
];

export let COUPON_INSTANCES_DATA: CouponInstance[] = [
    { id: 'RCLINIC-ABC123', couponId: 1, status: 'redeemed', generatedAt: new Date().toISOString(), redeemedAt: new Date().toISOString(), redeemedBy: 'Portal de Aliados' },
];

export const SERVICES_DATA: Service[] = [
    { id: 1, icon: 'StethoscopeIcon', title: 'RClinic', description: 'Software para llevar historias clínicas electrónicas, tanto para el ámbito "Particular" como para "Prestadores Externos IESS".', href: '#/rclinic-software' },
    { id: 2, icon: 'PresentationChartLineIcon', title: 'Agendamiento Inteligente', description: 'Plataforma de citas online que reduce la inasistencia y mejora la experiencia del paciente.' },
    { id: 3, icon: 'ShieldCheckIcon', title: 'Portal de Pacientes Seguro', description: 'Acceso confidencial a resultados de laboratorio e imágenes, cumpliendo con normativas de protección de datos.' },
    { id: 4, icon: 'ComputerDesktopIcon', title: 'Digital Signage', description: 'Uso de pantallas informativas y kioscos virtuales para mejorar la experiencia del cliente y la comunicación en sus instalaciones.' },
];

export const REPORTS_DATA: Report[] = [
    { id: 1, type: 'lab', title: 'Biometría Hemática', date: '2023-10-15T10:00:00Z', provider: 'Interlab', url: '#' },
    { id: 2, type: 'imaging', title: 'Radiografía de Tórax', date: '2023-09-22T14:30:00Z', provider: 'Clínica Kennedy', url: '#' },
];

export const SPECIALISTS_DATA: Specialist[] = [
    { id: 1, name: 'Dr. Juan Pérez', specialty: 'Cardiología', address: 'Av. del Bombero, Clínica Kennedy', phone: '0991234567', photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16e?q=80&w=2070&auto=format&fit=crop', consultationFee: 60, biography: 'Cardiólogo con más de 15 años de experiencia en el diagnóstico y tratamiento de enfermedades cardiovasculares.', medicalCenterId: 'kennedy', availability: { '2025-11-08': ['09:00', '10:00', '11:00'], '2025-11-09': ['14:00', '15:00'] }, status: 'visible' },
    { id: 2, name: 'Dra. Ana García', specialty: 'Dermatología', address: 'Av. del Bombero, Clínica Kennedy', phone: '0987654321', photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop', consultationFee: 50, biography: 'Especialista en dermatología clínica y estética, con enfoque en tratamientos de acné y rejuvenecimiento facial.', medicalCenterId: 'kennedy', availability: { '2025-11-08': ['08:30', '09:30'], '2025-11-09': ['10:30', '11:30', '12:30'] }, status: 'visible' },
];

export const MEDICAL_CENTERS: MedicalCenter[] = [
    { id: 'kennedy', name: 'Clínica Kennedy', address: 'Av. del Bombero km 5.5', city: 'Guayaquil', sector: 'Ceibos', logoUrl: 'https://www.clinicakennedy.med.ec/images/logo-kennedy-g-ceibos-web.png', status: 'visible' },
    { id: 'omni', name: 'OmniHospital', address: 'Av. Abel Romeo Castillo', city: 'Guayaquil', sector: 'Kennedy', logoUrl: 'https://www.omnihospital.ec/wp-content/uploads/2021/03/logo-omni-azul.png', status: 'visible' },
    { id: 'vernaza', name: 'Hospital Luis Vernaza', address: 'Loja 700 y Escobedo', city: 'Guayaquil', sector: 'Centro', logoUrl: 'https://www.jbg.org.ec/files/images/logo-hospital-luis-vernaza.png', status: 'visible' },
];

export const ASSOCIATES_DATA: Associate[] = [
    { id: 1, name: 'Novamedic', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
    { id: 2, name: 'Totalmedic', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
    { id: 3, name: 'Medicaldent', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
    { id: 4, name: 'Medimaster', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
    { id: 5, name: 'Clínica San Vicente', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
    { id: 6, name: 'Medisol', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
    { id: 7, name: 'Labmedent', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
    { id: 8, name: 'Medfam', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
    { id: 9, name: 'Hospital Granados', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
    { id: 10, name: 'Aprofe', logoUrl: 'TEXT_ONLY', website: '#', status: 'visible' },
];

export const SCHEDULE_USERS_DATA: ScheduleUser[] = [
    { id: 1, firstName: 'Admin', lastName: 'RClinic', username: 'admin', email: 'admin@rclinic.ec', medicalCenterId: 'kennedy', status: 'visible', role: 'admin' },
    { id: 2, firstName: 'Juan', lastName: 'Pérez', username: 'jperez', email: 'jperez@rclinic.ec', medicalCenterId: 'kennedy', status: 'visible', role: 'doctor', specialistId: 1 },
];

export let REFERRERS_DATA: Referrer[] = [
    { id: 1, name: 'Carlos Vera', email: 'cvera@example.com', phone: '0991234567', status: 'approved', referralCode: 'CARLOSA1B2', createdAt: new Date().toISOString(), activityStatus: 'active' },
    { id: 2, name: 'Ana Gomez', email: 'agomez@example.com', phone: '0987654321', status: 'pending', referralCode: 'ANAGB4C5', createdAt: new Date().toISOString(), activityStatus: 'active' }
];

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(today.getDate() + 2);
const fiveDaysFromNow = new Date();
fiveDaysFromNow.setDate(today.getDate() + 5);

const toYYYYMMDD = (date: Date) => date.toISOString().split('T')[0];

export let APPOINTMENTS_DATA: Appointment[] = [
    { id: 1, specialistId: 1, patientName: 'Elena Rodriguez', patientPhone: '0987654321', date: toYYYYMMDD(today), time: '09:00', status: 'agendada' },
    { id: 2, specialistId: 2, patientName: 'Carlos Sanchez', patientPhone: '0991234567', date: toYYYYMMDD(today), time: '09:30', status: 'agendada' },
    { id: 3, specialistId: 1, patientName: 'Sofia Martinez', patientPhone: '0988887777', date: toYYYYMMDD(today), time: '10:00', status: 'agendada' },
    { id: 4, specialistId: 1, patientName: 'Luis Gonzalez', patientPhone: '0977776666', date: toYYYYMMDD(tomorrow), time: '11:00', status: 'agendada' },
    { id: 5, specialistId: 2, patientName: 'Isabel Castillo', patientPhone: '0966665555', date: toYYYYMMDD(tomorrow), time: '12:30', status: 'agendada' },
    { id: 6, specialistId: 2, patientName: 'Jorge Torres', patientPhone: '0955554444', date: toYYYYMMDD(dayAfterTomorrow), time: '08:30', status: 'agendada' },
    { id: 7, specialistId: 1, patientName: 'Fernanda Diaz', patientPhone: '0944443333', date: toYYYYMMDD(fiveDaysFromNow), time: '15:00', status: 'agendada' },
];


export const SPECIALTIES: string[] = [
    'Medicina General', 'Cardiología', 'Dermatología', 'Gastroenterología', 'Ginecología', 'Neurología', 'Oftalmología', 'Pediatría', 'Traumatología', 'Urología'
];

const allSectors: { [city: string]: string[] } = {
    'Guayaquil': ['Norte', 'Centro', 'Sur', 'Ceibos', 'Kennedy', 'Samborondón'],
    'Quito': ['Norte', 'Centro', 'Sur', 'Cumbayá', 'Tumbaco'],
    'Cuenca': ['Centro Histórico', 'El Ejido', 'Yanuncay']
};

export const getCities = (): string[] => Object.keys(allSectors);
export const getSectorsByCity = (): { [city: string]: string[] } => allSectors;
