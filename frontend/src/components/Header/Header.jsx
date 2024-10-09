import { useContext } from 'react';
import logo from "../../assets/logo.png";
import { NavLink, Link } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import Resonsive from './responsive-navbar';
import { navLinks } from './nav-link';
import { Button } from '../ui/button';

const Header = () => {
  const { user, role, token } = useContext(authContext);

  return (
    <header className="bg-[url('./assets/mask.png')] bg-no-repeat bg-center backdrop-blur bg-cover w-full h-[70px] flex items-center sticky top-0 z-50 border-b">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ------ logo ------- */}
 

            <Link to={'/'}>
              <div>
                <img src={logo} alt="Logo" />
              </div>
            </Link>

          {/* ------ menu ------- */}
          <div className="navigation">
            <ul className=" flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                        : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ------ nav right ------- */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <Link to={role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}>
                <div className="flex items-center">
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img src={user?.photo} className="w-full rounded-full" alt="User Profile" />
                  </figure>
                  <h2 className="ml-2">{user?.name}</h2>
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="bg-primaryColor  text-white font-[600] h-[44px] flex items-center justify-center rounded-md">
                  Login
                </Button>
              </Link>
            )}
            <div className="md:hidden">
              <Resonsive />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
