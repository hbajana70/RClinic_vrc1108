import React from 'react';
import { RClinicLogo } from './Icons';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: 'Navegación',
            links: [
                { name: 'Inicio', href: '#home' },
                { name: 'Nosotros', href: '#nosotros' },
                { name: 'Beneficios', href: '#beneficios' },
                { name: 'Portal', href: '#portal-paciente' },
                { name: 'Soluciones', href: '#soluciones' },
                { name: 'Asociados', href: '#asociados' },
            ],
        },
        {
            title: 'Servicios',
            links: [
                { name: 'Agendar Cita', href: '#/agendamiento' },
                { name: 'Ver Resultados', href: '#/resultados' },
                { name: 'Agenda Médica', href: '#/agenda-medica' },
                { name: 'Configuración', href: '#/configuracion' },
                { name: 'Programa de Referidos', href: '#/referidos' },
                { name: 'Telemedicina', href: '#' },
                { name: 'Farmacia Online', href: '#' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacidad', href: '#' },
                { name: 'Términos y Condiciones', href: '#' },
                { name: 'Política de Cookies', href: '#' },
            ],
        },
    ];
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#/')) {
            e.preventDefault();
            window.location.hash = href;
        } else if (href.startsWith('#')) {
             e.preventDefault();
             const id = href.substring(1);
             if (id === 'home') {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
                 window.location.hash = ''; // Clear hash for home
             } else {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.location.hash = href;
                }
             }
        }
    };

    return (
        <footer className="bg-gradient-to-r from-accent-light to-white text-dark-blue" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <RClinicLogo />
                        <p className="text-gray-600 text-base">
                            Conectando tu salud con el futuro.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 xl:mt-0 xl:col-span-2">
                        <div>
                            <h3 className="text-sm font-semibold text-dark-blue tracking-wider uppercase">{sections[0].title}</h3>
                            <ul role="list" className="mt-4 space-y-4">
                                {sections[0].links.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-base text-gray-600 hover:text-primary">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-dark-blue tracking-wider uppercase">{sections[1].title}</h3>
                            <ul role="list" className="mt-4 space-y-4">
                                {sections[1].links.map((item) => (
                                     <li key={item.name}>
                                        <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-base text-gray-600 hover:text-primary">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-sm font-semibold text-dark-blue tracking-wider uppercase">{sections[2].title}</h3>
                            <ul role="list" className="mt-4 space-y-4">
                                {sections[2].links.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-base text-gray-600 hover:text-primary">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-dark-blue tracking-wider uppercase">Contacto</h3>
                            <ul role="list" className="mt-4 space-y-4">
                                <li>
                                    <a href="mailto:info@rclinic.ec" className="text-base text-gray-600 hover:text-primary">
                                        info@rclinic.ec
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+593987222111" className="text-base text-gray-600 hover:text-primary">
                                        +593 987222111
                                    </a>
                                </li>
                                <li className="text-base text-gray-600">
                                    Guayaquil - Ecuador
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-500 xl:text-center">&copy; {currentYear} RClinic. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;