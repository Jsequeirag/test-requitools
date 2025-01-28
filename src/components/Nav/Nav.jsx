import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faRightFromBracket,
  faMoon,
  faSun,
  faBorderNone,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
function NewNav() {
  const navigate = new useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [hiddenMenu, setHiddenMenu] = useState(false);

  const DarkModeSeleted = () => {
    const html = document.querySelector("html");
    if (!darkMode) return (html.className += " dark");
    return (html.className -= " dark");
  };
  useEffect(() => {
    // DarkModeSeleted();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 h-[100%] ${
        hiddenMenu ? "w-[88px]" : "w-[250px] "
      } cbg-secondary-color dark:bg-black px-[10px] py-[14] transition-all delay-75 z-10`}
    >
      <header className="sidebar text-gray-700 relative h-full">
        <h1
          className={`text-center text-3xl mt-2 font-semibold dark:text-gray-100 ${
            hiddenMenu && "hidden"
          }`}
        >
          Requitools
        </h1>
        <div className="flex items-center justify-center  mt-2 ">
          {
            <img
              className="rounded-sm"
              src={`/assets/resourcesLogoXs.png`}
              width={"100"}
              alt="logo"
            />
          }
        </div>
        {/*Perfil*/}
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
              className={`font-semibold  dark:text-gray-200  ${
                hiddenMenu && "hidden"
              } `}
            >
              Jose Luis Sequeira gongora
            </span>
            <span
              className={`profession mt-1 dark:text-gray-200 ${
                hiddenMenu && "hidden"
              } `}
            >
              Data Analist
            </span>
          </div>
        </div>
        {/*toggle*/}
        <div
          className="absolute top-[50%] right-[-20px] translate-y-(-50%) h-[25px] w-[25px] cursor-pointer"
          name="chevron-right"
          onClick={() => {
            setHiddenMenu(!hiddenMenu);
          }}
        >
          <FontAwesomeIcon
            className={!hiddenMenu && "rotate-180"}
            icon={faArrowAltCircleRight}
            size="2x"
            color="#bdab78"
          />
        </div>
        <div className="menu-bar  h-[calc(100%-250px)] flex flex-col justify-between">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link h-12  mt-2 flex items-center">
                <a
                  className="no-underline h-full w-full flex items-center rounded-md transition duration-500 hover:cbg-primary-color dark:hover:bg-slate-500   cursor-pointer"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <FontAwesomeIcon
                    className="min-w-[60px] flex items-center"
                    icon={faBorderNone}
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
            </ul>
          </div>
          <div className="bottom-content">
            <li className="nav-link h-12  mt-2 flex items-center">
              <a
                className="no-underline h-full w-full flex items-center rounded-md transition duration-500 hover:cbg-primary-color dark:hover:bg-slate-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <FontAwesomeIcon
                  className="min-w-[60px] flex items-center justify-center"
                  icon={faRightFromBracket}
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
              className={`nav-link h-12  mt-2 flex items-center   ${
                darkMode ? "bg-slate-500" : "cbg-primary-color"
              } rounded-md`}
            >
              <div
                className={`h-[50px] w-[60px] flex items-center  ${
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
              </span>{" "}
              <div className="ml-3  flex items-center  ">
                <label class="inline-flex items-center cursor-pointer ">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    onClick={() => {
                      setDarkMode(!darkMode), DarkModeSeleted();
                    }}
                  />
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </li>
          </div>
        </div>
      </header>
    </nav>
  );
}

export default NewNav;
