import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faRightFromBracket, // Logout
  faMoon, // Dark Mode
  faSun, // Light Mode
  faGauge, // Dashboard (alternativa a faBorderNone)
  faArrowAltCircleRight, // Toggle menu
  faCog, // Configuraciones (alternativa a faUsersGear)
  faFileInvoiceDollar, // Payroll (alternativa a faFilePowerpoint)
  faPiggyBank, // Finanzas (alternativa a faFileContract)
} from "@fortawesome/free-solid-svg-icons";
import {
  getLocalStorageKeyValue,
  saveLocalStorage,
  getLocalStorageItem,
} from "../../utils/localstore";
import WebsiteConfig from "../../../stores/WebsiteConfig";

function NewNav() {
  const navigate = new useNavigate();
  //local
  const [darkMode, setDarkMode] = useState(false);
  const [hiddenMenu, setHiddenMenu] = useState(false);
  const [roles, setRoles] = useState([]);
  //global
  const setShrinkMenu = WebsiteConfig((state) => state.setShrinkMenu);
  const DarkModeSeleted = () => {
    const html = document.querySelector("html");
    if (!darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  };

  useEffect(() => {
    setRoles(JSON.parse(getLocalStorageItem("requitool-roles")) || []);
    const storedShrink = getLocalStorageItem("requi-shrinkMenu");
    if (storedShrink) {
      setHiddenMenu(storedShrink === "true");
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 h-[100%] ${
        hiddenMenu ? "w-[88px]" : "w-[250px]"
      } cbg-secondary-color dark:bg-black px-[10px] py-[14px] transition-all delay-75 z-10`}
      // Puedes ajustar 'cbg-secondary-color' para un fondo más neutro
    >
      <header className="sidebar text-gray-700 relative h-full">
        <h1
          className={`text-center text-3xl mt-2 font-semibold dark:text-gray-100 ${
            hiddenMenu && "hidden"
          }`}
        >
          Requitools
        </h1>
        <div className="flex items-center justify-center mt-2">
          <img
            className="rounded-sm"
            src="/assets/resourcesLogoXs.png"
            width="100"
            alt="logo"
            // Podrías considerar reducir el tamaño o integrarlo diferente
          />
        </div>
        {/* Perfil */}
        <div className="image-text flex items-center mt-4">
          <span className="image min-w-[60px] flex items-center">
            <img
              width={50}
              className="inline-block rounded-lg shadow-md"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </span>
          <div className="text header-text flex flex-col text-md">
            <span
              className={`font-semibold dark:text-gray-200 ${
                hiddenMenu && "hidden"
              }`}
            >
              {getLocalStorageKeyValue("requitool-employeeInfo", "name")}
            </span>
            <span
              className={`profession mt-1 dark:text-gray-200 ${
                hiddenMenu && "hidden"
              }`}
            >
              Data Analyst
            </span>
          </div>
        </div>
        {/* Toggle */}
        <div
          className="absolute top-[50%] right-[-11px] translate-y-[-50%] h-[25px] w-[25px] cursor-pointer"
          onClick={() => {
            setHiddenMenu(!hiddenMenu);
            saveLocalStorage("requi-shrinkMenu", !hiddenMenu);
            setShrinkMenu(!hiddenMenu);
          }}
        >
          <FontAwesomeIcon
            className={`${
              !hiddenMenu ? "rotate-180" : ""
            } transition-transform duration-300`}
            icon={faArrowAltCircleRight}
            size="2x"
            color="#bdab78" // Ajusta este color según tu paleta
          />
        </div>
        <div className="menu-bar h-[calc(100%-250px)] flex flex-col justify-between">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link h-12 mt-2 flex items-center">
                <a
                  className="no-underline h-full w-full flex items-center rounded-md transition duration-300 hover:cbg-primary-color dark:hover:bg-slate-500 cursor-pointer"
                  onClick={() => navigate("/home")}
                >
                  <FontAwesomeIcon
                    className="min-w-[60px] flex items-center justify-center"
                    icon={faGauge} // Icono de Dashboard
                    size="2x"
                    color={darkMode ? "#bdab78" : "black"}
                  />
                  <span
                    className={`text nav-text font-semibold dark:text-gray-200 whitespace-nowrap ${
                      hiddenMenu && "hidden"
                    }`}
                  >
                    Dashboard
                  </span>
                </a>
              </li>
              {roles?.find((role) => role?.role?.name === "Payroll") && (
                <li className="nav-link h-12 mt-2 flex items-center">
                  <a
                    className="no-underline h-full w-full flex items-center rounded-md transition duration-300 hover:cbg-primary-color dark:hover:bg-slate-500 cursor-pointer"
                    onClick={() => navigate("/payroll")}
                  >
                    <FontAwesomeIcon
                      className="min-w-[60px] flex items-center justify-center"
                      icon={faFileInvoiceDollar} // Icono de Payroll
                      size="2x"
                      color={darkMode ? "#bdab78" : "black"}
                    />
                    <span
                      className={`text nav-text font-semibold dark:text-gray-200 whitespace-nowrap ${
                        hiddenMenu && "hidden"
                      }`}
                    >
                      Payroll
                    </span>
                  </a>
                </li>
              )}
              {roles?.find(
                (role) => role?.role?.name === "FinanceDepartment"
              ) && (
                <li className="nav-link h-12 mt-2 flex items-center">
                  <a
                    className="no-underline h-full w-full flex items-center rounded-md transition duration-300 hover:cbg-primary-color dark:hover:bg-slate-500 cursor-pointer"
                    onClick={() => navigate("/finance")}
                  >
                    <FontAwesomeIcon
                      className="min-w-[60px] flex items-center justify-center"
                      icon={faPiggyBank} // Icono de Finanzas
                      size="2x"
                      color={darkMode ? "#bdab78" : "black"}
                    />
                    <span
                      className={`text nav-text font-semibold dark:text-gray-200 whitespace-nowrap ${
                        hiddenMenu && "hidden"
                      }`}
                    >
                      Finanzas
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="bottom-content">
            <ul className="menu-links">
              {roles?.find((role) => role?.role?.name === "SuperAdmin") && (
                <li className="nav-link h-12 mt-2 flex items-center">
                  <a
                    className="no-underline h-full w-full flex items-center rounded-md transition duration-300 hover:cbg-primary-color dark:hover:bg-slate-500 cursor-pointer"
                    onClick={() => navigate("/ConfigurationDashboard")}
                  >
                    <FontAwesomeIcon
                      className="min-w-[60px] flex items-center justify-center"
                      icon={faCog} // Icono de Configuraciones
                      size="2x"
                      color={darkMode ? "#bdab78" : "black"}
                    />
                    <span
                      className={`text nav-text font-semibold dark:text-slate-200 whitespace-nowrap ${
                        hiddenMenu && "hidden"
                      }`}
                    >
                      Configuraciones
                    </span>
                  </a>
                </li>
              )}
              <li className="nav-link h-12 mt-2 flex items-center">
                <a
                  className="no-underline h-full w-full flex items-center rounded-md transition duration-300 hover:cbg-primary-color dark:hover:bg-slate-500 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  <FontAwesomeIcon
                    className="min-w-[60px] flex items-center justify-center"
                    icon={faRightFromBracket} // Icono de Logout
                    size="2x"
                    color={darkMode ? "#bdab78" : "black"}
                  />
                  <span
                    className={`text nav-text font-semibold dark:text-slate-200 whitespace-nowrap ${
                      hiddenMenu && "hidden"
                    }`}
                  >
                    Logout
                  </span>
                </a>
              </li>
              <li
                className={`nav-link h-12 mt-2 flex items-center ${
                  darkMode ? "bg-slate-500" : "cbg-primary-color"
                } rounded-md`}
              >
                <div
                  className={`h-[50px] w-[60px] flex items-center ${
                    hiddenMenu && "hidden"
                  }`}
                >
                  <FontAwesomeIcon
                    className={`min-w-[60px] flex items-center justify-center absolute ${
                      !darkMode && "hidden"
                    }`}
                    icon={faMoon}
                    size="2x"
                    color={darkMode ? "#bdab78" : "black"}
                  />
                  <FontAwesomeIcon
                    className={`min-w-[60px] flex items-center justify-center absolute ${
                      darkMode && "hidden"
                    }`}
                    icon={faSun}
                    size="2x"
                    color="black"
                  />
                </div>
                <span
                  className={`text nav-text font-semibold dark:text-gray-200 transition-all delay-100 whitespace-nowrap ${
                    hiddenMenu && "hidden"
                  }`}
                >
                  Dark mode
                </span>
                <div className="ml-3 flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onClick={() => {
                        setDarkMode(!darkMode), DarkModeSeleted();
                      }}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </nav>
  );
}

export default NewNav;
