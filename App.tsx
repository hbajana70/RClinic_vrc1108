import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import FeaturedOffers from './components/FeaturedOffers';
import TechServices from './components/TechServices';
import About from './components/About';
import OnlineServices from './components/OnlineServices';
import Associates from './components/Associates';
import Footer from './components/Footer';
import SchedulingPage from './components/SchedulingPage';
import SpecialistResultsPage from './components/SpecialistResultsPage';
import ResultsPage from './components/ResultsPage';
import ConfigurationPage from './components/ConfigurationPage';
import MoreOffersPage from './components/MoreOffersPage';
import MoreCouponsPage from './components/MoreCouponsPage';
import CouponDetailPage from './components/CouponDetailPage';
import AdminPage from './components/AdminPage';
import ScheduleConfigPage from './components/ScheduleConfigPage';
import CouponVerifierPage from './components/CouponVerifierPage';
import RClinicPage from './components/RClinicPage';
import ReferralPage from './components/ReferralPage';
import ReferralDashboardPage from './components/ReferralDashboardPage';
import MedicalAgendaPage from './components/MedicalAgendaPage';

const HomePage = () => (
    <>
        <Navigation />
        <Header />
        <FeaturedOffers />
        <OnlineServices />
        <TechServices />
        <About />
        <Associates />
        <Footer />
    </>
);

const App: React.FC = () => {
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange, false);
        return () => {
            window.removeEventListener('hashchange', handleHashChange, false);
        };
    }, []);

    useEffect(() => {
        const [path] = route.split('?');
        // Only scroll to top on page-level navigation (routes starting with '#/'),
        // not for in-page anchor links (like '#nosotros').
        if (path.startsWith('#/')) {
            window.scrollTo(0, 0);
        }
    }, [route]);

    const [path] = route.split('?');

    switch (path) {
        case '#/agendamiento':
            return <SchedulingPage />;
        case '#/busqueda-especialistas':
            return <SpecialistResultsPage />;
        case '#/resultados':
            return <ResultsPage />;
        case '#/configuracion':
            return <ConfigurationPage />;
        case '#/configuracion-horarios':
            return <ScheduleConfigPage />;
        case '#/mas-ofertas':
            return <MoreOffersPage />;
        case '#/mas-cupones':
            return <MoreCouponsPage />;
        case '#/cupon-detalle':
            return <CouponDetailPage />;
        case '#/admin':
            return <AdminPage />;
        case '#/verificador-cupones':
            return <CouponVerifierPage />;
        case '#/rclinic-software':
            return <RClinicPage />;
        case '#/referidos':
            return <ReferralPage />;
        case '#/portal-referidos':
            return <ReferralDashboardPage />;
        case '#/agenda-medica':
            return <MedicalAgendaPage />;
        default:
            return <HomePage />;
    }
};

export default App;