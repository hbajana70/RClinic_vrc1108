import React, { useState } from 'react';
import { RClinicLogo, CheckCircleIcon } from './Icons';
import { REFERRERS_DATA } from '../constants';
import type { Referrer } from '../types';

const ReferralPage: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate saving the new referrer
        const newReferrer: Referrer = {
            id: Date.now(),
            ...formData,
            status: 'pending',
            referralCode: `${formData.name.split(' ')[0].toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
            createdAt: new Date().toISOString(),
            activityStatus: 'active'
        };
        REFERRERS_DATA.push(newReferrer);
        console.log('New referrer submitted:', newReferrer);
        setIsSubmitted(true);
    };


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
                <section className="relative bg-white pt-16 pb-20 text-center">
                     <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[80rem] h-[80rem] bg-gradient-to-tr from-orange-100 via-transparent to-primary/10 rounded-full blur-3xl -z-10"></div>
                     </div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-dark-blue sm:text-5xl md:text-6xl">Gana Ingresos Recurrentes con RClinic</h1>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">Recomienda la plataforma que está transformando la salud en Ecuador y obtén beneficios por cada cliente que se una gracias a ti.</p>
                         <p className="mt-8 text-2xl font-bold text-primary">
                            Gana 15% de comisión recurrente durante los primeros 12 meses de tu referido.
                        </p>
                    </div>
                </section>
                
                {/* How it works Section */}
                <section className="py-20">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-dark-blue text-center mb-12">¿Cómo Funciona? Es muy Sencillo</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-20 w-20 bg-primary/10 text-primary rounded-full mx-auto font-bold text-3xl">1</div>
                                <h3 className="mt-5 text-xl font-bold text-dark-blue">Regístrate</h3>
                                <p className="mt-2 text-gray-600">Completa nuestro formulario de registro. Es rápido, fácil y totalmente gratis.</p>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-center h-20 w-20 bg-primary/10 text-primary rounded-full mx-auto font-bold text-3xl">2</div>
                                <h3 className="mt-5 text-xl font-bold text-dark-blue">Comparte</h3>
                                <p className="mt-2 text-gray-600">Una vez aprobado, recibirás un enlace de referido único para compartir con tus contactos.</p>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-center h-20 w-20 bg-primary/10 text-primary rounded-full mx-auto font-bold text-3xl">3</div>
                                <h3 className="mt-5 text-xl font-bold text-dark-blue">Gana</h3>
                                <p className="mt-2 text-gray-600">Recibe tu comisión por cada pago que realicen tus referidos durante su primer año.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Registration Form Section */}
                <section id="registro" className="py-20 bg-white">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl border">
                             {isSubmitted ? (
                                <div className="text-center py-8">
                                    <CheckCircleIcon className="h-16 w-16 text-accent mx-auto" />
                                    <h2 className="mt-4 text-2xl font-bold text-dark-blue">¡Registro Recibido!</h2>
                                    <p className="mt-2 text-gray-600">Gracias por tu interés. Revisaremos tu solicitud y nos pondremos en contacto contigo pronto con los siguientes pasos.</p>
                                </div>
                            ) : (
                                <>
                                <h2 className="text-3xl font-extrabold text-dark-blue text-center">Únete al Programa de Socios</h2>
                                <p className="mt-2 text-center text-gray-600">Forma parte de nuestra red y empieza a ganar.</p>
                                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                    <input type="text" name="name" placeholder="Nombre completo" required value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" />
                                    <input type="email" name="email" placeholder="Correo electrónico" required value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" />
                                    <input type="tel" name="phone" placeholder="Teléfono" required value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" />
                                    <button type="submit" className="w-full bg-accent text-dark-blue font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-transform">Enviar Solicitud</button>
                                </form>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ReferralPage;