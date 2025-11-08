import React from 'react';

const Header: React.FC = () => {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = '#/agendamiento';
  };

  return (
    <div className="relative bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent"></div>
      </div>
      <header id="home" className="relative pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-dark-blue sm:text-5xl md:text-6xl">
                <span className="block">La Salud que Mereces,</span>
                <span className="block text-primary">al Alcance de tu Mano.</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-xl text-gray-600 sm:max-w-xl">
                Con RClinic, accede a los mejores especialistas, gestiona tus citas y consulta tus resultados de forma fácil, rápida y segura. Tu bienestar es nuestra prioridad.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid">
                  <a
                    href="#/agendamiento"
                    onClick={handleCTAClick}
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-primary hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-primary/40 transform hover:scale-105"
                  >
                    Agendar una Cita
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;