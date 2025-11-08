import React, { useState } from 'react';
import { RClinicLogo, CalendarDaysIcon, CalculatorIcon, HeartPulseIcon, DocumentDuplicateIcon, ChartBarIcon, ClipboardDocumentCheckIcon, BanknotesIcon, BeakerIcon, UsersIcon, ShieldCheckIcon } from './Icons';
import ContactForm from './ContactForm';

const features = [
    { icon: CalendarDaysIcon, title: 'Agendamiento de Citas', description: 'Gestión completa de calendarios, confirmaciones automáticas y portal de autogestión para pacientes.' },
    { icon: CalculatorIcon, title: 'Cotización de Servicios', description: 'Crea y envía cotizaciones detalladas de procedimientos y servicios médicos de forma rápida.' },
    { icon: HeartPulseIcon, title: 'Signos Vitales y Triaje', description: 'Registro estandarizado de signos vitales en cada consulta para un seguimiento preciso del paciente.' },
    { icon: DocumentDuplicateIcon, title: 'Atención Médica y Anamnesis', description: 'Formularios personalizables para registrar el historial clínico, antecedentes y evolución del paciente.' },
    { icon: ChartBarIcon, title: 'Diagnósticos (CIE-10)', description: 'Integración con el catálogo CIE-10 para una codificación de diagnósticos precisa y estandarizada.' },
    { icon: ClipboardDocumentCheckIcon, title: 'Receta e Indicaciones Online', description: 'Emisión de recetas médicas digitales seguras, con envío directo al paciente por email o WhatsApp.' },
    { icon: BeakerIcon, title: 'Órdenes de Laboratorio/Imágenes', description: 'Genera y gestiona órdenes para servicios auxiliares, integrando resultados directamente en la HCE.' },
    { icon: BanknotesIcon, title: 'Facturación y Cobranza', description: 'Módulo de facturación integrado que simplifica el proceso de cobro a pacientes y aseguradoras.' },
];

const patientJourney = [
  { name: 'Agendamiento o Cotización' },
  { name: 'Facturación' },
  { name: 'Admisión' },
  { name: 'Atención Cita' },
  { name: 'Órdenes' },
  { name: 'Documentación' },
];

const RClinicPage: React.FC = () => {
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);

    const openContactModal = () => setIsContactFormOpen(true);
    const closeContactModal = () => setIsContactFormOpen(false);

    return (
        <div className="bg-gray-50 min-h-screen">
             <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
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
            
            <main>
                {/* Hero Section */}
                <section className="relative bg-white pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
                     <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[60rem] h-[60rem] bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl -z-10"></div>
                     </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-dark-blue sm:text-5xl md:text-6xl">Software <span className="text-primary">RClinic</span></h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">La solución integral para la gestión de su práctica médica. Optimice su flujo de trabajo, mejore la atención al paciente y cumpla con las normativas locales.</p>
                    </div>
                </section>

                {/* Target Audience Section */}
                <section className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-dark-blue sm:text-4xl">Diseñado para su Éxito</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Adaptado a las necesidades del ecosistema de salud ecuatoriano.</p>
                        </div>
                        <div className="mt-12 grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-primary/10 text-primary rounded-lg p-3">
                                        <UsersIcon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-dark-blue">Atención a Pacientes Particulares</h3>
                                        <p className="mt-2 text-gray-600">Gestione su Centro Médico con herramientas que agilitan la atención, desde agendamiento online, facturación, historia clinica electrónica, ordenes de laboratorio/imágenes y consulta de resultados web, permitiéndole enfocarse en lo más importante: sus pacientes.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 bg-accent/10 text-accent rounded-lg p-3">
                                        <ShieldCheckIcon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-dark-blue">Prestadores Externos IESS</h3>
                                        <p className="mt-2 text-gray-600">Cumple con todos los requisitos y normativa del IESS. Nuestro sistema está pre-configurado para la gestión de atención medica, derivaciones, formularios MSP y como resultado primordial, la generación del Archivo Plano y sus PDF's soporte, todo a un click de distancia.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 sm:py-24 bg-white">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-dark-blue sm:text-4xl">Funcionalidades Clave</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Todo lo que necesita para digitalizar su práctica médica en una sola plataforma.</p>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
                                    <div className="bg-primary/10 p-3 rounded-full"><Icon className="h-8 w-8 text-primary"/></div>
                                    <h3 className="mt-4 text-lg font-bold text-dark-blue">{feature.title}</h3>
                                    <p className="mt-1 text-sm text-gray-600 flex-grow">{feature.description}</p>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Patient Journey Section */}
                <section className="py-16 sm:py-24">
                     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-dark-blue sm:text-4xl">El Viaje del Paciente, Simplificado</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Un flujo de trabajo cohesivo que garantiza una experiencia excepcional y una gestión eficiente.</p>
                        </div>
                        <div className="mt-16 relative">
                           <div className="absolute left-1/2 top-4 -translate-x-1/2 h-[calc(100%-2rem)] w-0.5 bg-gray-300 hidden md:block" aria-hidden="true"></div>
                            
                            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-6 md:gap-8">
                                {patientJourney.map((step, index) => (
                                    <div key={step.name} className="flex flex-col items-center text-center">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl z-10">
                                            {index + 1}
                                        </div>
                                        <h3 className="mt-3 font-semibold text-dark-blue">{step.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                     </div>
                </section>

                 {/* CTA Section */}
                <section className="bg-white py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-dark-blue sm:text-4xl">¿Listo para Transformar su Práctica Médica?</h2>
                        <p className="mt-4 text-lg text-gray-600">Descubra cómo RClinic puede ayudarle a ser más eficiente, rentable y a ofrecer una mejor atención. Contáctenos hoy mismo.</p>
                        <div className="mt-8">
                            <button onClick={openContactModal} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-md font-bold rounded-full text-primary bg-primary-light hover:bg-primary/20">
                                Contactar Ahora
                            </button>
                        </div>
                    </div>
                </section>
            </main>
             <ContactForm isOpen={isContactFormOpen} onClose={closeContactModal} />
        </div>
    );
};

export default RClinicPage;