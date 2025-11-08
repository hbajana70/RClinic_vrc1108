import React from 'react';
import { SERVICES_DATA } from '../constants';
import type { Service } from '../types';
import { StethoscopeIcon, PresentationChartLineIcon, ShieldCheckIcon, ComputerDesktopIcon } from './Icons';

const iconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    StethoscopeIcon,
    PresentationChartLineIcon,
    ShieldCheckIcon,
    ComputerDesktopIcon,
};


const FeatureCard: React.FC<{ service: Service }> = ({ service }) => {
    const IconComponent = iconComponents[service.icon];
    if (!IconComponent) return null;

    const cardContent = (
        <div className="flex flex-col bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 h-full">
            <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <IconComponent className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-dark-blue">{service.title}</h3>
            <p className="mt-2 text-gray-600 flex-grow">{service.description}</p>
        </div>
    );

    if (service.href) {
        return (
            <a href={service.href} onClick={(e) => { e.preventDefault(); window.location.hash = service.href as string; }} className="group">
                {cardContent}
            </a>
        );
    }

    return <div className="group">{cardContent}</div>;
}

const TechServices: React.FC = () => {
  return (
    <section id="soluciones" className="relative py-16 sm:py-24 bg-gray-50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
             <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-gradient-to-tr from-accent to-primary opacity-10 rounded-full blur-3xl"></div>
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Nuestras Soluciones</h2>
          <p className="mt-2 text-3xl font-extrabold text-dark-blue tracking-tight sm:text-4xl">
            Herramientas para una Salud Conectada
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Desarrollamos productos que potencian la eficiencia y la comunicación en el sector salud.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES_DATA.map(service => <FeatureCard key={service.id} service={service} />)}
        </div>
      </div>
    </section>
  );
};

export default TechServices;
