import React from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { TextButton, IconButton } from "../../components/Button/Button";
import {
  faPencil,
  faTrashCan,
  faPlusCircle,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
function Requisitions() {
  const navigate = new useNavigate();
  const columns = [
    {
      name: "ID Req",
      selector: (row) => row.IDReq,
      sortable: true,
    },
    {
      name: "Area",
      selector: (row) => row.area,
      sortable: true,
    },
    {
      name: "Tipo",
      selector: (row) => row.actionType,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Acción",
      center: true,
      cell: () => (
        <>
          <IconButton
            bgColor={`bg-blue-500`}
            hoverBgColor={`hover:bg-blue-500`}
            hoverTextColor={`hover:text-black`}
            otherProperties="w-auto my-1"
            icon={faPencil}
            onClick={(e) => navigate("/priceListform", {})}
          />{" "}
          <IconButton
            bgColor={`bg-red-500`}
            hoverBgColor={`hover:bg-red-500`}
            hoverTextColor={`hover:text-black`}
            otherProperties="w-auto ml-2"
            icon={faTrashCan}
            onClick={(e) => navigate("/priceListform", {})}
          />
        </>
      ),
    },
  ];

  const data = [
    {
      IDReq: 17913,
      area: "Production AP",
      actionType: "Renuncia",
      name: "Jose Luis Sequeira Góngora",
      date: "21/04/2025",
      status: "Procesado",
    },
    {
      IDReq: 12784,
      area: "Media AP",
      actionType: "Promoción",
      name: "Luis Jose Góngora Sequeira ",
      date: "21/04/2025",
      status: "Iniciado",
    },
    {
      IDReq: 10914,
      area: "Finanzas",
      actionType: "Promoción",
      name: "Juan Luis Góngora Sequeira ",
      date: "21/04/2025",
      status: "Ingreso",
    },
  ];

  return (
    <Layout>
      <div className="m-4 w-full">
        <div className="border-b  bg-white rounded-sm w-[86%] h-full">
          <div className="flex items-center border-b p-4 mx-2 justify-between">
            {/*Titulo */}
            <div className="flex items-center">
              <TextButton
                type={"submit"}
                onClick={() => {
                  navigate("/home");
                }}
                text={"Atras"}
              />
              <h1 className="px-9 text-3xl p-4">Lista de Requisiciones</h1>{" "}
            </div>
            <div className="flex items-center">
              <IconButton
                bgColor={`bg-gray-500`}
                hoverBgColor={`hover:bg-gray-500`}
                hoverTextColor={`hover:text-black`}
                otherProperties="w-auto mr-2"
                icon={faFilter}
                onClick={(e) => navigate("/priceListform", {})}
              />
              <IconButton
                bgColor={`bg-blue-500`}
                hoverBgColor={`hover:bg-blue-500`}
                hoverTextColor={`hover:text-black`}
                otherProperties="w-auto ml-2"
                icon={faPlusCircle}
                onClick={(e) => navigate("/priceListform", {})}
              />
            </div>
          </div>

          <div className=" bg-white  p-5 ">
            {" "}
            {/*tabla*/}
            <div className="border rounded-md">
              {/*header*/}
              <div className="flex items-center bg-slate-50 p-4 rounded-md">
                <div>
                  <p>
                    Solicitud: <span className="font-bold">456</span>
                  </p>
                </div>
                <div className=" ml-5 p-2 bg-green-400 rounded-md">
                  <p>En curso</p>
                </div>
              </div>{" "}
              {/*data*/}
              <DataTable
                columns={columns}
                data={data}
                striped
                highlightOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Requisitions;
