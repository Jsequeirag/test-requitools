import { React, useState, useEffect, useCallback, useRef } from "react"; // Agregamos useRef
import DepartmentAdministrationStore from "../../../stores/DepartmentAdministrationStore";
import { createUserDepartment } from "../../api/urls/userDepartment";
import { TextButton } from "../../components/Button/Button";
import { useApiSend } from "../../api/config/customHooks";
import { getLocalStorageKeyValue } from "../../utils/localstore";

export default function AsignDepartment({
  setEmployeeModal,
  departments,
  selectedId,
}) {
  const userSelected = DepartmentAdministrationStore(
    (state) => state.employeeSelected
  );
  const Departments = DepartmentAdministrationStore(
    (state) => state.Departments
  );
  const userDepartmentsGlobal = DepartmentAdministrationStore(
    (state) => state.userDepartments
  );

  const setUserDepartments = DepartmentAdministrationStore(
    (state) => state.setUserDepartments
  );

  const handleRoleChange = (departmentId, isChecked) => {
    const employeeId = getLocalStorageKeyValue("requitool-employeeInfo", "id");
    if (isChecked) {
      setUserDepartments([
        ...userDepartmentsGlobal,
        { userId: employeeId, departmentId, employeeId: userSelected.id },
      ]);
    } else {
      setUserDepartments(
        userDepartmentsGlobal.filter(
          (role) => role.departmentId !== departmentId
        )
      );
    }
  };

  const createUserRoleCallback = useCallback(
    () => createUserDepartment(userDepartmentsGlobal),
    [userDepartmentsGlobal]
  );
  const { isPending, mutateAsync } = useApiSend(createUserRoleCallback);

  const handleCreateUserDepartment = async () => {
    await mutateAsync();
    setEmployeeModal(false);
  };
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = departments?.filter(
    (item) =>
      (item.departamento &&
        item.departamento.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.descriptionDepartamento &&
        item.descriptionDepartamento
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.descriptionPuesto &&
        item.descriptionPuesto.toLowerCase().includes(filterText.toLowerCase()))
  );

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

  // 👇 Ref para el contenedor con scroll
  const scrollContainerRef = useRef(null);

  // 👇 Efecto para resetear scroll cada vez que cambie `departments` (cuando se abra)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setUserDepartments([]);
  }, [selectedId]);

  return (
    <div className="w-full">
      <>
        <h1 className="text-center text-xl">
          <span className="font-bold">
            {`Departamentos asignados a ${userSelected?.nombre} (${userSelected.descrip_Centro_Costo}) `}
          </span>
        </h1>
        <div className="flex m-4">
          <input
            className="shadow border rounded-sm w-[300px] text-grey-darker text-lg focus:coutline-input py-2 px-3 mr-2"
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <TextButton text={"Limpiar"} onClick={handleClear} />
        </div>

        {/* 👇 Contenedor con scroll y ref */}
        <div
          ref={scrollContainerRef}
          className="flex flex-col justify-between overflow-y-auto max-h-64"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                {" "}
                <th className="px-4 py-3">Departamento</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Seleccionar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {filteredItems?.map((role, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <label className="cursor-pointer ml-2 text-slate-600 text-center">
                      {role.departamento}
                    </label>
                  </td>{" "}
                  <td className="px-4 py-2">
                    <label className="cursor-pointer ml-2 text-slate-600 text-center">
                      {role.descriptionDepartamento}
                    </label>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer transition-all rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                      id={role.name}
                      checked={userDepartmentsGlobal?.some(
                        (userRole) => userRole.departmentId === role.id
                      )}
                      onChange={(e) =>
                        handleRoleChange(role.id, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <div className="my-4 w-[300px]">
            <TextButton
              text={isPending ? "Enviando" : "Enviar"}
              onClick={() => handleCreateUserDepartment()}
            />
          </div>
        </div>
      </>
    </div>
  );
}
