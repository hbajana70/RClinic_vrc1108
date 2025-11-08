import React from 'react';

const About: React.FC = () => {
  return (
    <section id="nosotros" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Acerca de Nosotros</h2>
            <p className="mt-2 text-3xl font-extrabold text-dark-blue tracking-tight sm:text-4xl">
              Impulsando la Transformación Digital en Ecuador
            </p>
            <p className="mt-4 text-lg text-gray-600">
              COMUTECH propietaria de RClinic Software, es una empresa ecuatoriana de tecnología con mas de 20 años de trayectoria, dedicada a la optimización inteligente de procesos en diversos sectores del mercado. Nuestra filosofía se centra en un enfoque único: la fusión de tecnología de vanguardia con un profundo conocimiento del negocio, en verticales clave como retail, salud, construcción, y más.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Contamos con un equipo de profesionales de basta experiencia, listos para transformar los desafíos operativos de nuestros clientes en oportunidades de eficiencia y crecimiento.
            </p>
            <div className="mt-10">
              <h3 className="text-xl font-bold text-dark-blue">Nuestras Soluciones Clave:</h3>
              <ul className="mt-4 space-y-4 text-gray-600 list-disc list-inside">
                <li><span className="font-semibold">Desarrollo de Software Médico Especializado:</span> Soluciones robustas para la gestión clínica y administrativa, enfocadas en la precisión y el cumplimiento normativo.</li>
                <li><span className="font-semibold">Agendamiento Online Inteligente:</span> Plataformas intuitivas que mejoran la experiencia del usuario y optimizan la gestión de recursos y citas.</li>
                <li><span className="font-semibold">Digital Signage (Pantallas y Kioscos Virtuales):</span> Implementación de soluciones interactivas y dinámicas para comunicación, autogestión y atención al cliente.</li>
                <li><span className="font-semibold">Reingeniería de Procesos:</span> Análisis exhaustivo y rediseño de flujos de trabajo, apalancados en tecnología para eliminar cuellos de botella y maximizar la productividad.</li>
              </ul>
            </div>
             <p className="mt-6 text-lg text-gray-600">
              Enfocados en la excelencia y la innovación, estamos comprometidos con llevar la eficiencia, la rentabilidad y la automatización a un nuevo nivel para su empresa.
            </p>
          </div>
          <div className="mt-10 lg:mt-0" aria-hidden="true">
             <div className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Doctora usando una tablet"
                />
                 <div className="absolute inset-0 bg-primary/20"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;