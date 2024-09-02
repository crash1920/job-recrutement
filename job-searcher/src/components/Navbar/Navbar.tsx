import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import './Navbar.css';
import { logout } from '../../pages/Login/store/LoginSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountsDropdown, setShowAccountsDropdown] = useState(false);
  const token = localStorage.getItem('token');
  const loggedInUser = token ? JSON.parse(token).user : null;
  const loggedInUsername = loggedInUser ? loggedInUser.username : null;
  const loggedInUserRole = loggedInUser ? loggedInUser.role : null;

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAccountsDropdownClick = () => {
    setShowAccountsDropdown(!showAccountsDropdown);
  };

  const pages = [
    { name: 'Jobs page', link: '/featuredJobs' },
    loggedInUserRole === 'RH' ? { name: 'Candidates', link: '/Candidates' } : null,
    { name: 'Login profile', link: '/Login' },
    { name: 'Sign up', link: '/signUp' },
  ].filter(Boolean);
  const handleLogout = () => {
    // Clean the local storage
    localStorage.removeItem('token');

    // Dispatch the logout action
    dispatch(logout());

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <header>
      <nav className="fixed top-0 w-full h-auto bg-white-standard z-10">
        <div className="flex items-center justify-between px-24">
          <div>
            <a href="/">
              <img
                className="h-2/5 w-2/5 ml-10 "
                src={`${process.env.PUBLIC_URL}/assets/logo/sqli_logo_blue.png`}
                alt="SQLI Logo"
              />
            </a>
          </div>
          <div className="flex justify-center items-center flex-row ml-auto">
            <div className="flex justify-center items-center h-full relative list-none">
              <a className="navbar-items" href="/">
                Home
              </a>
              <a className="navbar-items">About</a>
              <div
                className="navbar-dropdown-container"
                onMouseEnter={handleDropdownClick}
                onMouseLeave={handleDropdownClick}
              >
                <a className="navbar-items">
                  Pages <FontAwesomeIcon className="w-1/12" icon={faAngleDown} />
                </a>
                {showDropdown && (
                  <div className="navbar-dropdown">
                    <ul className="navbar-dropdown-column grid grid-cols-2 gap-2">
                      {pages.length === 4 ? pages.slice(0, 2).map((page, index) => (
                        <li key={index}>
                          <a href={page?.link}>{page?.name}</a>
                        </li>
                      )) : pages.slice(0, 1).map((page, index) => (
                        <li key={index}>
                          <a href={page?.link}>{page?.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <a className="navbar-items">Blog</a>
              <div
                className="navbar-dropdown-container"
                onMouseEnter={handleAccountsDropdownClick}
                onMouseLeave={handleAccountsDropdownClick}
              >
                <a className="navbar-items">
                  Accounts <FontAwesomeIcon className="w-1/12" icon={faAngleDown} />
                </a>
                {showAccountsDropdown && (
                  <div className=" navbar-dropdown navbar-dropdown-accounts">
                    <ul className="navbar-dropdown-column grid grid-cols-1 gap-2">
                      {pages.length === 4 ? pages.slice(2, 4).map((page, index) => (
                        <li key={index}>
                          <a href={page?.link}>{page?.name}</a>
                        </li>
                      )) : pages.slice(1, 3).map((page, index) => (
                        <li key={index}>
                          <a href={page?.link}>{page?.name}</a>
                        </li>))}
                    </ul>
                  </div>
                )}
              </div>
              <a className="navbar-items">Contact</a>
            </div>
            {loggedInUser && loggedInUserRole === 'RH' ? (
              <div className='flex flex-row mx-4'>
                <div className="flex flex-col items-center mx-4 text-green-500">
                  <div>{loggedInUsername}</div>
                  <div>Logged In</div>
                </div>
                <Button onClick={() => navigate('/jobPost')}>Job Post</Button>
              </div>
            ) : (
              loggedInUsername && (
                <div className="flex flex-col items-center mx-4 text-green-500">
                  <div>{loggedInUsername}</div>
                  <div>Logged In</div>
                </div>
              )
            )}
            {loggedInUser && (
              <Button onClick={handleLogout}>Logout</Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
