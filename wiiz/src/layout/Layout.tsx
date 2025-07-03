import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 text-secondary dark:text-white font-inter transition-colors duration-300">
      <Navbar />
      <main className={isHomePage ? '' : 'pt-24'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
