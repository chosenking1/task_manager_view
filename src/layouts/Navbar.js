import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiConfig';

const Navbar = () => {
  const Links = [
    { name: 'HOME', link: '/task' },
    { name: 'CREATE TASK', link: '/task/create' },
    { name: 'CREATE DEPARTMENT', link: '/department/create' },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  axios.defaults.baseURL = apiUrl;


  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuthentication();
  }, [location]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      // Call the logout API
      await axios.post('/api/logout', null, {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the token from localStorage
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      // Redirect to the signup page
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onToggleMenu = () => {
    setOpen(!open);
  };
  return (
      <div className="bg-white-100">
      <nav className="flex justify-between items-center w-[100%]  mx-auto h-[20px] bg-red-200 p-[4%]">

          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-3xl text-indigo-600 mr-1 pt-2">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            Designer
          </div>
        {/*<div>*/}
        {/*  <img className="w-16 cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png" alt="..."></img>*/}
        {/*</div>*/}

<div className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-${open ? '9%':'-100%'} md:w-auto  w-full flex items-center px-5`}>
         <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
          {isLoggedIn &&
            Links.map((link) => (
              <li key={link.name} className="">
                <a
                  href={link.link}
                  className="text-blue-950 hover:text-emerald-300 hover:underline  duration-500"
                >
                  {link.name}
                </a>
              </li>
            ))
          }
 </ul>
  </div>
          {isLoggedIn && (
<div className='flex items-center gap-6'>
              <button
                className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
                onClick={handleLogout}
              >
                Logout
              </button>
  <ion-icon onclick={onToggleMenu} name={open ? 'close' : 'menu'} className="text-3xl cursor-pointer md:hidden"></ion-icon>
</div>
          )}

      </nav>
    </div>

  );
};

export default Navbar;
