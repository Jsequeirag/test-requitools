import { useState, useMemo } from "react";
import LoadingModal from "../../components/LoadingModal/LoadingModal";

import { useApiGet } from "../../api/config/customHooks";
import { getEmployees } from "../../api/urls/Employee";
import DataTable from "react-data-table-component";
import { IconButton } from "../../components/Button/Button";
import RolesAdministrationStore from "../../../stores/RolesAdministrationStore";
import GeneralModal from "../../components/modal/GeneralModal";
import SelectRoleEmployee from "../../pages/RolesAdministration/SelectRoleEmployee";
import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Roles from "../RolesAdministration/Roles";
import RoleEmployee from "../RolesAdministration/RoleEmployee";
import { getRoles } from "../../api/urls/roles";
import { getRolesByEmployeeId } from "../../api/urls/userRole";
import TextButton from "../../components/Button/TextButton";
import Layout from "../../components/Layout/Layout";
export default function RolesAdministration() {
  //global

  return (
    <Layout>
      <div className="m-4 w-full">
        <div className="border-b  bg-white rounded-sm w-[86%]">
          <div className="flex items-center border-b p-4 mx-2">
            <a href="/ConfigurationDashboard">
              <TextButton text={"Atras"} />
            </a>
            {/*Titulo */}
            <h1 className="px-9 text-3xl p-4">Asignación de Roles</h1>
          </div>
          <div className="flex flex-col items-center border-b p-4 mx-2">
            <RoleEmployee />
            <Roles />
          </div>
        </div>
      </div>
    </Layout>
  );
}
