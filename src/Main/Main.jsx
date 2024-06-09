
import { Outlet, useLocation } from 'react-router-dom';
import Navber from '../components/Navber';
import Footer from '../components/footer/Footer';

const Main = () => {
    const location =useLocation()
    // console.log(location)
    const noNabvarFooter =location?.pathname.includes('login') || location?.pathname.includes('signUp')
    // console.log(noNabvarFooter)
    return (
        <div className='font-lato'>
            {!noNabvarFooter && <Navber></Navber>}
            <Outlet></Outlet>
            {!noNabvarFooter && <Footer></Footer>}
            
        </div>
    );
};

export default Main;