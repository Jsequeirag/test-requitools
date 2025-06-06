import React from "react";
import RolesAdministrationStore from "../../../stores/RolesAdministrationStore";
import AsyncSelect from "../../components/AsyncComponents/AsyncSelect.jsx";
import { TextButton } from "../../components/Button/Button";
export default function SelectRole({ action }) {
  //global
  const roleSelected = RolesAdministrationStore((state) => state.roleSelected);
  const employeeModal = RolesAdministrationStore(
    (state) => state.employeeModal
  );
  //const departments = RolesAdministrationStore((state) => state.departments);
  return (
    <div className="w-full p-5">
      <h1 className="text-center text-2xl">
        {action === "Edit" ? "Editar role" : "Nuevo Rol"}
      </h1>
      <h1 className="text-center text-xl">
        <span className="font-bold mt-4">
          {action === "Edit" && roleSelected.name}
        </span>
      </h1>
      <form action="">
        <label
          className="block text-black text-lg font-bold mb-2"
          htmlFor="roleName"
        >
          Nombre
        </label>
        <p className="text-gray-700 italic"></p>
        <input
          className=" mb-2 shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
          id="roleName"
          type="text"
          name="roleName"
          placeholder="Ejemplo: 741676"
          /* required*/
          autoComplete="off"
          value={roleSelected.name}
          required
        />{" "}
        <label
          className="block text-black text-lg font-bold mb-2"
          htmlFor="roleName"
        >
          Descripción
        </label>
        <p className="text-gray-700 italic"></p>
        <input
          className=" mb-2 shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
          id="roleName"
          type="text"
          name="roleName"
          placeholder="Ejemplo: 741676"
          /* required*/
          autoComplete="off"
          value={roleSelected.description}
          required
        />
        <label
          className="block text-black text-lg font-bold mb-2"
          htmlFor="roleName"
        >
          Departamento
        </label>
        <AsyncSelect
          url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getDepartments`}
          name={"roleDepartment"}
          value={roleSelected.departmentId || ""}
          customNameParam="descriptionDepartamento"
        />
        <div className="flex justify-center">
          <div className="mt-4 w-[300px]">
            <TextButton
            // text={isPending ? "Enviando" : "Enviar"}
            //    onClick={() => creteuserRoles()}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
