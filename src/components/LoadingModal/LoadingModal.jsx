import React, { useState, useEffect } from "react"; // Importar useState y useEffect si se usa para dark mode
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getLocalStorageItem } from "../../utils/localstore"; // Asumiendo que usas esto para el dark mode

export default function LoadingModal({ openModal, text = "Cargando" }) {
  // Estado local para el modo oscuro, sincronizado con localStorage
  const [darkMode, setDarkMode] = useState(false);

  /*useEffect(() => {
    /*const storedDarkMode = getLocalStorageItem("requi-darkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []);*/

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-300
        ${openModal ? "opacity-100 visible" : "opacity-0 invisible"}
        ${"bg-gray-900/5"} // Fondo oscuro más pronunciado
        backdrop-blur-sm // Efecto de desenfoque en el fondo
      `}
      style={{ display: openModal ? "flex" : "none" }} // Usar flex para centrar
      role="dialog" // Rol para accesibilidad
      aria-modal="true" // Indica que es un modal
      aria-labelledby="loading-modal-title" // Enlaza con el título del modal
    >
      <div
        className={`
          ${"bg-white text-gray-900"}
          rounded-xl p-8 shadow-2xl // Más padding, esquinas más redondeadas, sombra más profunda
          flex flex-col items-center justify-center
          max-w-xs sm:max-w-sm w-full // Ancho responsivo
          transform transition-transform duration-300
          ${
            openModal ? "scale-100" : "scale-95"
          } // Efecto de escala al abrir/cerrar
        `}
      >
        <div className="flex items-center">
          <h2
            id="loading-modal-title"
            className="text-2xl font-semibold mr-4"
            aria-live="assertive"
            aria-atomic="true"
          >
            {text}
          </h2>
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-blue-500 animate-spin" // Color azul de acento, animación de giro
            size="2x" // Tamaño del spinner
          />
        </div>
      </div>
    </div>
  );
}
