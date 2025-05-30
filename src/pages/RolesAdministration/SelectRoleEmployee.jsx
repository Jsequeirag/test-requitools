import { React, useState, useEffect, useCallback } from "react";
import RolesAdministrationStore from "../../../stores/RolesAdministrationStore";
import { getRolesByEmployeeId, createUserRole } from "../../api/urls/userRole";
import { getRoles } from "../../api/urls/roles";
import { useApiGet } from "../../api/config/customHooks";
import { TextButton } from "../../components/Button/Button";
import { useApiSend } from "../../api/config/customHooks";
import { getLocalStorageKeyValue } from "../../utils/localstore";
export default function SelectRoleEmployee({ setEmployeeModal }) {
  //g;obal
  const userSelected = RolesAdministrationStore(
    (state) => state.employeeSelected
  );
  //local
  //const [userRoles, setUserRoles] = useState();
  const roles = RolesAdministrationStore((state) => state.roles);
  const userRoles = RolesAdministrationStore((state) => state.userRoles);
  const setUserRoles = RolesAdministrationStore((state) => state.setUserRoles);
  //const roles = RolesAdministrationStore((state) => state.roles);
  //add, delete roles
  const handleRoleChange = (roleId, isChecked) => {
    const employeeId = getLocalStorageKeyValue("requitool-employeeInfo", "id");
    if (isChecked) {
      setUserRoles([
        ...userRoles,
        { userId: employeeId, roleId, employeeId: userSelected.id },
      ]);
    } else {
      setUserRoles(userRoles.filter((role) => role.roleId !== roleId));
    }
  };
  //fetch
  const createUserRoleCallback = useCallback(
    () => createUserRole(userRoles),
    [userRoles]
  );
  const { isPending, mutateAsync } = useApiSend(createUserRoleCallback);

  const creteuserRoles = async () => {
    await mutateAsync();
    setEmployeeModal(false);
  };
  return (
    <div className="w-full m-5">
      <>
        <h1 className="text-center text-xl">
          Roles asignados a{" "}
          <span className="font-bold">{userSelected?.nombre}</span>{" "}
        </h1>

        <div className="flex flex-col justify-between">
          {roles?.map((role) => (
            <div class="inline-flex items-center mt-4 ">
              <label
                class="flex items-center cursor-pointer relative"
                for={role.name}
              >
                <input
                  type="checkbox"
                  class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                  id={role.name}
                  checked={userRoles?.some(
                    (userRole) => userRole.roleId === role.id
                  )}
                  onChange={(e) => handleRoleChange(role.id, e.target.checked)}
                />
                <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <label
                class="cursor-pointer ml-2 text-slate-600 text-center "
                for="check-2"
              >
                {role.name}
              </label>
            </div>
          ))}
          <div className="flex justify-center">
            <div className="mt-4 w-[300px]">
              <TextButton
                text={isPending ? "Enviando" : "Enviar"}
                onClick={() => creteuserRoles()}
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
