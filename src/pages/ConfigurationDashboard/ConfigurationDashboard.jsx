import { React, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { removeLocalStorageItem } from "../../utils/localstore";
import formStore from "../../../stores/FormStore.js";
export default function ConfigurationDashboard() {
  const setForm = formStore((state) => state.setForm);
  useEffect(() => {
    removeLocalStorageItem("requitool-requisition");
    setForm({});
  }, []);

  const navigate = new useNavigate();
  return (
    <Layout>
      <div></div>
      <div className="m-10 flex">
        <a onClick={(e) => navigate("/rolesAdministrations")}>
          <div className="flex justify-center  flex-col items-center w-[300px] h-[150px] cgold-primary-color rounded-md shadow-lg border-2 border-[#dcd1b5] cursor-pointer m-2 bg-white">
            <FontAwesomeIcon icon={faIdCard} className="mt-2  " size="2x" />
            <h1 className="font-semibold text-xl">Roles</h1>
          </div>
        </a>
        <a onClick={(e) => navigate("/departmentAdministration")}>
          <div className="flex justify-center  flex-col items-center w-[300px] h-[150px] cgold-primary-color rounded-md shadow-lg border-2 border-[#dcd1b5] cursor-pointer m-2 bg-white">
            <FontAwesomeIcon icon={faIdCard} className="mt-2  " size="2x" />
            <h1 className="font-semibold text-xl">
              Asignación de depatamentos
            </h1>
          </div>
        </a>
      </div>
    </Layout>
  );
}
