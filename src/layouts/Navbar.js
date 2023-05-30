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

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-10">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="flex items-center">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-3xl text-indigo-600 mr-1 pt-2">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            Designer
          </div>

          {isLoggedIn && (
            <ul className="ml-4 hidden md:flex">
              {Links.map((link) => (
                <li key={link.name} className="text-xl my-1">
                  <a
                    href={link.link}
                    className="text-gray-800 hover:text-gray-400 duration-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded hover:bg-indigo-400 duration-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl cursor-pointer md:hidden"
        >
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in top-20 ${
            open ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          {isLoggedIn &&
            Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                <a
                  href={link.link}
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  {link.name}
                </a>
              </li>
            ))}
          {isLoggedIn && (
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <button
                className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
