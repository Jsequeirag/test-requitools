import React from "react";
import Layout from "../../components/Layout/Layout";
import {
  faWindowRestore,
  faWindowMaximize,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = new useNavigate();
  return (
    <Layout>
      <div></div>
      <div className="m-10 flex">
        <a onClick={(e) => navigate("/newRequisition")}>
          <div className="flex justify-center  flex-col items-center w-[300px] h-[150px] cgold-primary-color rounded-md shadow-lg border-2 border-[#dcd1b5] cursor-pointer m-2 bg-white">
            <FontAwesomeIcon
              icon={faWindowMaximize}
              className="mt-2  "
              size="2x"
            />
            <h1 className="font-semibold text-xl">Nueva Requisición</h1>
          </div>
        </a>
        <a onClick={(e) => navigate("/requisitions")}>
          <div className="flex justify-center  flex-col items-center w-[300px] h-[150px] cgold-primary-color rounded-md shadow-lg border-2 border-[#dcd1b5] cursor-pointer m-2 bg-white">
            <FontAwesomeIcon
              icon={faWindowRestore}
              className="mt-2  "
              size="2x"
            />
            <h1 className="font-semibold text-xl">Requisiciones</h1>
          </div>
        </a>
      </div>
    </Layout>
  );
}
