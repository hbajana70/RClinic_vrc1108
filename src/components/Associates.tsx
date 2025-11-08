import React from 'react';
import { ASSOCIATES_DATA } from '../constants';
import { ClipboardDocumentCheckIcon, BuildingOffice2Icon, UsersIcon } from './Icons';

const Associates: React.FC = () => {
  const visibleAssociates = ASSOCIATES_DATA.filter(a => a.status === 'visible');

  const stats = [
    {
      icon: ClipboardDocumentCheckIcon,
      value: '2M+',
      label: 'Citas Atendidas'
    },
    {
      icon: BuildingOffice2Icon,
      value: '60+',
      label: 'Centros Médicos'
    },
    {
      icon: UsersIcon,
      value: '1500+',
      label: 'Médicos Afiliados'
    }
  ];

  return (
    <section id="asociados" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Nuestros Asociados</h2>
          <p className="mt-2 text-3xl font-extrabold text-dark-blue tracking-tight sm:text-4xl">
            Confían en Nuestra Tecnología
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Colaboramos con las instituciones líderes en el sector de la salud para ofrecer un servicio de excelencia.
          </p>
        </div>
        <div className="mt-12">
          <div className="flow-root">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
              {visibleAssociates.map((associate) => (
                <a 
                  key={associate.id}
                  href={associate.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-gray-50 rounded-lg h-28 transition-all duration-300 hover:shadow-lg hover:bg-gray-100 transform hover:-translate-y-1"
                >
                  {associate.logoUrl && associate.logoUrl !== 'TEXT_ONLY' ? (
                    <img src={associate.logoUrl} alt={associate.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-center font-semibold text-gray-700">{associate.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-gray-200">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="p-8 bg-gray-50/70 rounded-xl">
                  <Icon className="h-12 w-12 mx-auto text-primary" />
                   {stat.label === 'Citas Atendidas' ? (
                    <p className="mt-4 text-4xl font-extrabold text-dark-blue flex justify-center items-baseline space-x-0.5">
                      <span>2</span>
                      <span className="text-5xl leading-none">M</span>
                      <span className="text-2xl font-semibold tracking-tight">illones+</span>
                    </p>
                  ) : (
                    <p className="mt-4 text-4xl font-extrabold text-dark-blue">{stat.value}</p>
                  )}
                  <p className="mt-2 text-lg text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Associates;
