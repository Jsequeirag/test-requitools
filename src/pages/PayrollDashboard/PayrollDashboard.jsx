import { React, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  faPlusSquare, // Icono para "Nueva Requisición"
  faListAlt, // Icono para "Ver Requisiciones"
  faFileAlt, // Nuevo icono relacionado a documentos/solicitudes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { removeLocalStorageItem } from "../../utils/localstore";
import formStore from "../../../stores/FormStore.js";

export default function PayrollDashboard() {
  const setForm = formStore((state) => state.setForm);
  const navigate = new useNavigate();
  const [requestCount, setRequestCount] = useState(5); // Ejemplo de número de solicitudes

  useEffect(() => {
    removeLocalStorageItem("requitool-requisition");
    setForm({});
    // Aquí podrías tener lógica para obtener el número real de solicitudes
  }, []);

  return (
    <Layout>
      <div className="flex justify-center mt-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Payroll
        </h1>
      </div>
      <div className="m-10 flex space-x-4 justify-center">
        {/* Usamos space-x-4 para la separación y justify-center para centrar */}
        <div
          onClick={() => navigate("/payrollRequests")}
          className="relative flex justify-center flex-col items-center w-[300px] h-[150px] rounded-md shadow-lg border border-gray-300 cursor-pointer bg-white hover:shadow-md transition duration-200" // Border más sutil y feedback al pasar el ratón
        >
          {requestCount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {requestCount}
            </div>
          )}
          <FontAwesomeIcon
            icon={faFileAlt} // Usamos el nuevo icono aquí
            className="mt-2 text-indigo-500" // Un color para el icono
            size="2x"
          />
          <h1 className="mt-2 font-semibold text-xl text-gray-900">
            Solicitudes
          </h1>
          {/* Texto más claro y color */}
        </div>
      </div>
    </Layout>
  );
}
