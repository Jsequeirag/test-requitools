import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faChevronRight,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

// Función para generar una fecha aleatoria
const getRandomDate = () => {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - 1);
  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime())
  );
};

// Datos de prueba para las solicitudes padre
const parentRequestsData = [
  { id: "001", displayId: "#2383", date: getRandomDate(), isNew: true },
  { id: "002", displayId: "#9127", date: getRandomDate() },
  {
    id: "003",
    displayId: "#5678",
    date: getRandomDate(),
    hasUpdate: true,
  },
];

const Sidebar = ({ onParentSelect }) => {
  const [selectedParentId, setSelectedParentId] = useState(null);

  const handleParentClick = (parentId) => {
    setSelectedParentId(parentId);
    onParentSelect(parentId);
  };

  const handleRefreshClick = () => {
    // Aquí iría la lógica para recargar las solicitudes
    alert("Refrescando solicitudes...");
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-sm p-4 w-64 flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Solicitudes
        </h2>
        <button
          onClick={handleRefreshClick}
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-1 focus:outline-none"
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" />
        </button>
      </div>
      <nav>
        <ul>
          {parentRequestsData.map((parent) => (
            <li key={parent.id} className="mb-2">
              <div
                className={`relative flex items-center justify-between cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedParentId === parent.id
                    ? "bg-blue-100 dark:bg-blue-800"
                    : ""
                }`}
                onClick={() => handleParentClick(parent.id)}
              >
                {parent.isNew && (
                  <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
                )}
                <div className="flex flex-col">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {parent.displayId}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {parent.date.toLocaleDateString()}
                  </span>
                </div>
                <FontAwesomeIcon
                  icon={
                    selectedParentId === parent.id
                      ? faChevronRight
                      : faCaretDown
                  }
                  className="ml-2 text-gray-500 dark:text-gray-400"
                />
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
