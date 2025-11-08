import React, { useState, useEffect } from 'react';
import { RClinicLogo, Bars3Icon } from './Icons';

const navigation = [
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Beneficios', href: '#beneficios' },
  { name: 'Portal del Paciente', href: '#portal-paciente' },
  { name: 'Soluciones', href: '#soluciones' },
  { name: 'Asociados', href: '#asociados' },
  { name: 'Configuración', href: '#/configuracion' },
];

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#/')) {
            e.preventDefault();
            window.location.hash = href;
        } else if (href.startsWith('#')) {
             e.preventDefault();
             const id = href.substring(1);
             const element = document.getElementById(id);
             if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Replaced pushState with a safer hash assignment for sandboxed environments
                window.location.hash = href;
             }
        }
        if (isOpen) {
            setIsOpen(false);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <a href="#home" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex-shrink-0">
                           <RClinicLogo />
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-md font-medium transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:block">
                         <a 
                            href="#/agendamiento" 
                            onClick={(e) => handleNavClick(e, '#/agendamiento')}
                            className="bg-primary text-white font-bold rounded-full px-6 py-3 text-sm transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-primary/40">
                            Agendar Cita
                        </a>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="text-gray-700 hover:text-primary hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {item.name}
                            </a>
                        ))}
                         <a 
                            href="#/agendamiento" 
                            onClick={(e) => handleNavClick(e, '#/agendamiento')}
                            className="bg-primary text-white font-bold block w-full text-center mt-2 mx-auto max-w-[calc(100%-1rem)] px-6 py-3 text-sm rounded-full shadow-md">
                            Agendar Cita
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;