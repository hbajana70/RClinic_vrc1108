import React, { useState } from 'react';
import { XMarkIcon, EnvelopeIcon } from './Icons';

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission to a backend
        setIsSubmitted(true);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative">
                <button
                    onClick={() => {
                        onClose();
                        setIsSubmitted(false); // Reset on close
                    }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="p-8">
                    {isSubmitted ? (
                        <div className="text-center py-8">
                             <EnvelopeIcon className="h-16 w-16 text-accent mx-auto" />
                            <h2 className="mt-4 text-2xl font-bold text-dark-blue">¡Mensaje Enviado!</h2>
                            <p className="mt-2 text-gray-600">Gracias por contactarnos. Nos pondremos en contacto contigo a la brevedad.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-dark-blue text-center">Contáctanos</h2>
                            <p className="mt-2 text-center text-gray-600">
                                Déjanos un mensaje y te responderemos pronto.
                            </p>
                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                <div>
                                    <label htmlFor="name" className="sr-only">Nombre</label>
                                    <input type="text" name="name" id="name" required className="w-full p-3 border border-gray-300 rounded-md" placeholder="Nombre completo" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Correo electrónico</label>
                                    <input type="email" name="email" id="email" required className="w-full p-3 border border-gray-300 rounded-md" placeholder="Correo electrónico" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Mensaje</label>
                                    <textarea name="message" id="message" rows={4} required className="w-full p-3 border border-gray-300 rounded-md" placeholder="Tu mensaje..."></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-transform">
                                        Enviar Mensaje
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;