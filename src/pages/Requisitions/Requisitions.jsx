import React, { useEffect, useState, useRef } from "react";

import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../../components/Button/Button";
import TextButton from "../../components/Button/TextButton";
import formStore from "../../../stores/FormStore.js";
import {
  faPlusCircle,
  faFilter,
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApiGet } from "../../api/config/customHooks";
import { getRequestByUserId } from "../../api/urls/Request";
import { getLocalStorageKeyValue } from "../../utils/localstore";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
function Requisitions() {
  //global
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  const {
    data: requestData,
    isSuccess: requestIsSuccess,
    isPending: requestIsPending,
  } = useApiGet(["RequestByUser"], () =>
    getRequestByUserId(getLocalStorageKeyValue("requitool-employeeInfo", "id"))
  );

  const [expandedRequest, setExpandedRequest] = useState(null);
  const [requi, setRequi] = useState({});
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleExpand = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const setRequestStatus = (statusId) => {
    return statusId === 0 ? "En proceso" : "Completado";
  };

  const scrollTimeline = (scrollOffset) => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout>
      <LoadingModal openModal={requestIsPending} />
      <div className="m-4 w-full">
        <div className="border-b bg-white rounded-sm  h-full">
          <div className="flex items-center border-b p-4 mx-2 justify-between">
            <div className="flex items-center p-4 mx-2">
              <a href="/home">
                <TextButton text={"Atras"} />
              </a>
              <h1 className="px-9 text-3xl p-4"> Lista de Requisiciones</h1>#{" "}
              <h1 className="px-9 text-3xl p-4">
                {JSON.stringify(formValues)}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <IconButton
                bgColor="bg-gray-500 hover:bg-gray-600"
                icon={faFilter}
                onClick={() => navigate("/priceListform")}
              />
              <IconButton
                bgColor="bg-blue-500 hover:bg-blue-600"
                icon={faPlusCircle}
                onClick={() => navigate("/priceListform")}
              />
            </div>
          </div>

          {requestIsSuccess &&
            requestData.map((request) => (
              <div className="p-5" key={request.id}>
                <div className="border rounded-md p-4">
                  <div className="flex items-center bg-slate-50 p-4 rounded-md justify-between">
                    <p>
                      <strong>Solicitud:</strong> {request.id}
                    </p>
                    <span
                      className={`p-2 rounded-md font-semibold text-black ${
                        request.state === 0 ? "bg-yellow-400" : "bg-green-400"
                      }`}
                    >
                      {request.state}
                    </span>
                    <p className="text-sm">
                      <strong>Fecha:</strong>{" "}
                      {new Date(request.createdDate).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <strong>Creador:</strong> {request.user.name}
                    </p>
                    <button
                      onClick={() => handleExpand(request.id)}
                      className="flex items-center bg-blue-500 text-black px-3 py-2 rounded-md hover:bg-blue-600 transition-all"
                    >
                      <span>
                        {expandedRequest === request.id
                          ? "Ocultar detalles"
                          : "Ver detalles"}
                      </span>
                      <FontAwesomeIcon
                        icon={
                          expandedRequest === request.id
                            ? faChevronUp
                            : faChevronDown
                        }
                        className="ml-2"
                      />
                    </button>
                  </div>

                  {expandedRequest === request.id && (
                    <div
                      id={`request-${request.id}`}
                      className="relative w-full py-12"
                    >
                      <button
                        onClick={() => scroll("left")}
                        className="absolute left-[-2.2rem] top-1/2 transform -translate-y-1/2 z-20 bg-white text-gray-700 rounded-full border shadow hover:scale-105"
                        style={{ width: 40, height: 40 }}
                      >
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                      </button>
                      <button
                        onClick={() => scroll("right")}
                        className="absolute right-[-2.2rem] top-1/2 transform -translate-y-1/2 z-20 bg-white text-gray-700 rounded-full border shadow hover:scale-105"
                        style={{ width: 40, height: 40 }}
                      >
                        <FontAwesomeIcon icon={faChevronRight} size="lg" />
                      </button>

                      <div
                        ref={containerRef}
                        className="flex w-full overflow-x-auto items-start gap-12 px-12 py-[12px] relative scroll-smooth"
                      >
                        {request.requisitions.map((req, idx) => (
                          <>
                            <div
                              key={req.id}
                              className="flex-shrink-0 min-w-[24rem] relative flex flex-col items-center z-10"
                            >
                              {/* Punto */}
                              <div className="flex flex-col items-center mb-4 relative">
                                {/* Fecha */}
                                <p className="text-sm text-gray-500 mb-1">
                                  {new Date(req.createdDate).toLocaleString()}
                                </p>

                                {/* Punto */}
                                <div
                                  className={`h-4 w-4 rounded-full border-2 border-white shadow-md z-10 ${
                                    idx === 0 ? "bg-black" : "bg-slate-500"
                                  }`}
                                ></div>

                                {/* Línea vertical solo en el primero */}
                                {idx === 0 && (
                                  <div className="w-0.5 h-6 bg-black absolute top-full"></div>
                                )}
                              </div>
                              {/* Card */}
                              <div
                                className={`bg-white border rounded-lg ${
                                  idx === 0 ? "shadow-md" : ""
                                }  p-6 w-full hover:shadow-lg transition-shadow cursor-pointer`}
                                onClick={() => {
                                  setFormValues(req);
                                  navigate("/newRequisition", {
                                    state: {
                                      requisition: req,
                                      action: "update",
                                    },
                                  });
                                }}
                              >
                                <div className="flex justify-end">
                                  <p
                                    className={`text-black font-bold py-1 px-2 rounded-full text-xs ${
                                      req.state === 0
                                        ? "bg-yellow-400"
                                        : "bg-green-400"
                                    }`}
                                  >
                                    {req.state}
                                  </p>
                                </div>
                                <h3 className="font-semibold text-xl mb-1">
                                  Requisición {req.id}
                                </h3>
                                {req.employeeName && (
                                  <p className="text-gray-600 text-sm mb-1">
                                    Empleado: {req.employeeName}
                                  </p>
                                )}{" "}
                                {req.requestType?.name && (
                                  <>
                                    <p className="text-gray-600 text-sm ">
                                      {req.requestType.name} /{" "}
                                      {req.requisitionType.name}{" "}
                                    </p>{" "}
                                    <p className="text-gray-600 text-sm ">
                                      {" "}
                                      {req.employee.name}
                                    </p>
                                  </>
                                )}
                                <p className="text-gray-600 mb-4">
                                  {req.details}
                                </p>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export default Requisitions;
