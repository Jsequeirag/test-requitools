import { React, useReducer, useEffect, useState } from "react";
import formStore from "../../../../stores/FormStore";
import { useApiGet } from "../../../api/config/customHooks";
import { getEmployeeById } from "../../../api/urls/Employee";
import { formatIsoDateToYYYYMMDD } from "../../../utils/dateFormat.js";
import { getLocalStorageKeyValue } from "../../../utils/localstore";

import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx"; // Asegúrate de que el nombre sea correcto
export default function EmployeeInfo() {
  //global
  const formValues = formStore((state) => state.formValues);
  const employeeSelected = formStore((state) => state.employeeSelected);
  const setEmployeeSelected = formStore((state) => state.setEmployeeSelected);

  const { data: employeeData, isLoading } = useApiGet(
    ["employeeById", formValues?.employeeId],
    () => getEmployeeById(formValues?.employeeId),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    // Si hay un ID de empleado en los valores del formulario
    if (formValues?.employeeId) {
      // Y si no se está cargando (isLoading == false)
      if (!isLoading) console.log(employeeData); // Mostramos los datos del empleado en consola
      // Actualizamos el estado global con los datos del empleado
      setEmployeeSelected(employeeData);
    }
    // Si no hay un ID de empleado seleccionado (se deseleccionó, por ejemplo)
    if (!formValues?.employeeId) {
      // Reseteamos el estado del empleado seleccionado a un objeto vacío
      setEmployeeSelected({});
    }
    // Este efecto se ejecuta cada vez que cambie `formValues.employeeId` o `isLoading`
  }, [formValues?.employeeId, isLoading]);

  return (
    <>
      <h1 className="text-2xl">Información de Empleado</h1>
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="HiringProcess"
          >
            Nombre
          </label>

          <AsyncSelect
            url={`https://localhost:7040/getEmployees`}
            name={"employeeId"}
            customNameParam="nombre"
            required={true}
            value={formValues?.employeeId || ""} // Usamos 'value' y un fallback a ""
          />
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            ID Empleado Exactus
          </label>
          <input
            className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
            disabled
            id="idExactus"
            type="text"
            name="idExactus"
            value={employeeSelected?.id || ""}
            onChange={() => {}}
            /* required*/
            autoComplete="off"
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            # POS_COD
          </label>
          <input
            className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
            disabled
            id="idExactus"
            type="text"
            name="idExactus"
            value={"54321"}
            onChange={() => {}}
            /* required*/
            autoComplete="off"
          />
        </div>
      </div>
      {/*row 3 - supervisor*/}
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Supervisor
          </label>
          <input
            className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
            id="name"
            type="text"
            name="name"
            disabled
            value={employeeSelected?.nombre_Supervisor || ""}
            /* required*/
            autoComplete="off"
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Grado
          </label>
          <input
            className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
            id="name"
            type="text"
            name="name"
            disabled
            value={employeeSelected?.grado || ""}
            onChange={() => {}}
            /* required*/
            autoComplete="off"
          />
        </div>
        {/*row 4 - grado - departamento*/}
        <div className="flex"></div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Proyecto
          </label>
          <input
            className="border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
            id="name"
            type="text"
            name="name"
            disabled
            value={"Proyecto A"}
            onChange={() => {}}
            /* required*/
            autoComplete="off"
          />
        </div>
      </div>
      {/*row 5 - proyecto - fecha ingreso*/}
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Fecha de Ingreso
          </label>
          <input
            className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
            disabled
            id="idExactus"
            type="date"
            name="idExactus"
            value={
              formatIsoDateToYYYYMMDD(employeeSelected?.fecha_Ingreso) || ""
            }
            onChange={() => {}}
            /* required*/
            autoComplete="off"
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Departamento
          </label>
          <input
            className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
            disabled
            id="idExactus"
            type="text"
            name="idExactus"
            value={employeeSelected?.departamento || ""}
            onChange={() => {}}
            /* required*/
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
}
