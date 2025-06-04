import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"; // Importamos faCheck

export default function RequestItem({
  request,
  expandedRequest,
  handleExpand,
}) {
  const today = new Date().toLocaleDateString(); // Obtener la fecha de hoy

  const handleApprove = () => {
    // Aquí iría la lógica para aprobar la solicitud
    alert(`Solicitud ${request?.id} aprobada.`);
  };

  return (
    <div className="border rounded-md m-4">
      <div className="flex items-center bg-slate-50 p-4 rounded-md justify-between">
        <p>
          <strong>Solicitud:</strong> {request?.id || "PRUEBA-001"}
        </p>
        <span
          className={`p-2 rounded-md font-semibold text-black ${
            request?.state === "pendiente"
              ? "bg-yellow-400"
              : request?.state === "aprobado"
              ? "bg-green-400"
              : "bg-blue-400"
          }`}
        >
          {request?.state || "prueba"}
        </span>
        <p className="text-sm">
          <strong>Fecha Creación:</strong>{" "}
          {request?.createdDate
            ? new Date(request?.createdDate).toLocaleString()
            : new Date().toLocaleString()}
        </p>
        <p className="text-sm">
          <strong>Creador:</strong> {request?.user?.name || "Usuario Prueba"}
        </p>
        <div className="flex space-x-2">
          {request?.state !== "aprobado" ? (
            <>
              <button
                onClick={handleApprove}
                className={`flex items-center ${
                  request?.state === "aprobado" ? "bg-gray-500" : "bg-green-500"
                }  text-white px-3 py-2 rounded-md hover:bg-green-600 transition-all focus:outline-none`}
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                <span>
                  {request?.state === "aprobado" ? "Aprobado" : "Aprobar"}
                </span>
              </button>
              <button
                onClick={handleApprove}
                className={`flex items-center ${
                  request?.state === "aprobado" ? "bg-gray-500" : "bg-red-500"
                }  text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all focus:outline-none`}
              >
                <FontAwesomeIcon icon={faXmark} className="mr-2" />
                <span> {"Rechazar"}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleApprove}
                className={`flex items-center ${
                  request?.state === "aprobado" ? "bg-gray-500" : "bg-green-500"
                }  text-white px-3 py-2 rounded-md hover:bg-green-600 transition-all focus:outline-none`}
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                <span>
                  {request?.state === "aprobado" ? "Aprobado" : "Aprobar"}
                </span>
              </button>
              <button
                onClick={handleApprove}
                className={`flex items-center ${
                  request?.state === "aprobado" ? "bg-gray-500" : "bg-green-500"
                }  text-white px-3 py-2 rounded-md hover:bg-green-600 transition-all focus:outline-none`}
              >
                <FontAwesomeIcon icon={faXmark} className="mr-2" />
                <span> {"Rechazar"}</span>
              </button>
            </>
          )}
          {/* Contenedor para los botones */}
          <button
            onClick={() => handleExpand(request?.id)}
            className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-all focus:outline-none"
          >
            <span>
              {expandedRequest === request?.id
                ? "Ocultar detalles"
                : "Ver detalles"}
            </span>
            <FontAwesomeIcon
              icon={
                expandedRequest === request?.id ? faChevronUp : faChevronDown
              }
              className="ml-2"
            />
          </button>
        </div>
      </div>
      {expandedRequest === request?.id && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p>
            <strong>Tipo de Acción:</strong> Cambio de supervisor
          </p>
          <p>
            <strong>Fecha:</strong> {today}
          </p>
          <p>
            <strong>Supervisor Anterior:</strong> Juan Pérez
          </p>
          <p>
            <strong>Nuevo Supervisor:</strong> María Gómez
          </p>
          <p>
            <strong>Motivo:</strong> Reorganización del equipo
          </p>
          {/* Puedes añadir más datos de prueba aquí */}
        </div>
      )}
    </div>
  );
}
