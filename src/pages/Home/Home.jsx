import { React, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import {
  faPlusSquare, // Icono para "Nueva Requisición"
  faListAlt, // Icono para "Ver Requisiciones"
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { removeLocalStorageItem } from "../../utils/localstore";
import formStore from "../../../stores/FormStore.js";

export default function Home() {
  const setForm = formStore((state) => state.setForm);
  const navigate = new useNavigate();

  useEffect(() => {
    removeLocalStorageItem("requitool-requisition");
    setForm({});
  }, []);

  return (
    <Layout>
      <div className="flex justify-center mt-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Dashboard
        </h1>
      </div>
      <div className="m-10 flex space-x-4 justify-center">
        {" "}
        {/* Usamos space-x-4 para la separación y justify-center para centrar */}
        <div
          onClick={() =>
            navigate("/newRequisition", {
              state: {
                requisition: {},
                action: "create",
              },
            })
          }
          className="flex justify-center flex-col items-center w-[300px] h-[150px] rounded-md shadow-lg border border-gray-300 cursor-pointer bg-white hover:shadow-md transition duration-200" // Border más sutil y feedback al pasar el ratón
        >
          <FontAwesomeIcon
            icon={faPlusSquare}
            className="mt-2 text-indigo-500" // Un color para el icono
            size="2x"
          />
          <h1 className="mt-2 font-semibold text-xl text-gray-900">
            Crear Requisición
          </h1>{" "}
          {/* Texto más claro y color */}
        </div>
        <div
          onClick={() => navigate("/requisitions")}
          className="flex justify-center flex-col items-center w-[300px] h-[150px] rounded-md shadow-lg border border-gray-300 cursor-pointer bg-white hover:shadow-md transition duration-200" // Mismos estilos
        >
          <FontAwesomeIcon
            icon={faListAlt}
            className="mt-2 text-indigo-500" // Mismo color para el icono
            size="2x"
          />
          <h1 className="mt-2 font-semibold text-xl text-gray-900">
            Ver Requisiciones
          </h1>{" "}
          {/* Texto más claro y color */}
        </div>
      </div>
    </Layout>
  );
}
