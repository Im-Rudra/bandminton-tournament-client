import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from 'antd';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { MdSpaceDashboard } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import { RiLoginBoxFill } from 'react-icons/ri';
import { HiMenu } from 'react-icons/hi';

import FloatingMenu from '../components/FloatingMenu/FloatingMenu';
import MainMenuButton from '../components/MainMenu/MainMenuButton';

const menuList = [
  {
    title: 'Home',
    url: '/',
    icon: <AiFillHome />
  },
  {
    title: 'About Us',
    url: '/',
    icon: <BsFillInfoCircleFill />
  },
  {
    title: 'Dashboard',
    url: '/',
    icon: <MdSpaceDashboard />
  },
  {
    title: 'Login',
    url: 'login',
    icon: <RiLoginBoxFill />
  }
];

const RootLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const collapseHandler = () => setCollapse((prev) => !prev);
  return (
    <div>
      <div>
        <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <a href="https://flowbite.com/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-6 mr-3 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>
            <div className="flex md:order-2">
              {/* <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get started
              </button> */}
              <Button type="primary">Get Started</Button>
              <button
                onClick={collapseHandler}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg> */}
                <HiMenu className="text-3xl" />
              </button>
              <div id="targetEl" className="fixed right-2 top-16">
                <FloatingMenu collapse={collapse} menuList={menuList} />
              </div>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {/* Main menu here */}
                {menuList.map((menu, i) => (
                  <li key={i + 1}>
                    <MainMenuButton config={menu} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
