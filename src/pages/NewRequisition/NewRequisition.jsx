import { useEffect, useReducer, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";
import TextButton from "../../components/Button/TextButton";
import { initialState, reducer } from "./Reducer";
import { createRequests, updateRequests } from "../../api/urls/Request";
import AsyncSelect from "../../components/AsyncComponents/AsyncSelect.jsx"; // Asegúrate de que el nombre sea correcto
import formStore from "../../../stores/FormStore.js";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorageItem,
  getLocalStorageKeyValue,
} from "../../utils/localstore";
import {
  Entrada,
  MovimientoLateral,
  Promocion,
  Salida,
  CierrePlaza,
} from "./RequisitionForm/RequisitionForm.jsx";
import {
  RDetailMovimientoLateral,
  RDetailPromocion,
  RDetailSalida,
} from "./RequisitionDetail/RequisitionDetail.jsx";
import EmployeeInfo from "./EmployeeInfo/EmployeeInfo.jsx";
import ModalRequisitionDetails from "../../components/ModalRequisitionDetails/ModalRequisitionDetails.jsx";
import { useApiSend } from "../../api/config/customHooks";
import { toast } from "react-toastify"; // Asegúrate de tener toast importado

function NewRequisition() {
  //reacty-router-dom
  const navigate = useNavigate();
  // ========== 📍 Location ==========
  const location = useLocation();

  // ========== 🧠 Global state (Zustand) ==========
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  // ========== 🔄 Reducer ==========
  const [state, dispatcher] = useReducer(reducer, initialState);

  // ========== 👤 Usuario logueado ==========
  const userLogged = getLocalStorageKeyValue("requitool-employeeInfo", "id");

  // ========== 📦 API: Crear solicitud ==========
  const {
    mutateAsync: createRequisition,
    isPending: isPendingCreateRequisition,
  } = useApiSend(
    createRequests,
    () => {
      navigate("/requisitions");
    },
    (e) => {
      console.error("Error al crear la solicitud:", e);
      toast.error("Error al crear la solicitud", {
        className: "bg-grey-800",
        progressClassName: "bg-white",
      });
    }
  );
  // ========== 📦 API: actualizar solicitud ==========
  const {
    mutateAsync: updateRequisition,
    isPending: isPendingUpdateRequisition,
    isError,
  } = useApiSend(
    updateRequests,
    () => {
      navigate("/requisitions");
    },
    (e) => {
      console.error("Error al crear la solicitud:", e);
      toast.error("Error al crear la solicitud", {
        className: "bg-grey-800",
        progressClassName: "bg-white",
      });
    }
  );
  // ========== 🧩 Efecto: Inicializar formulario si es UPDATE ==========
  useEffect(() => {
    if (location.state?.action === "update") {
      const requisition = location.state.requisition;
      if (requisition) {
        setFormValues(requisition);
        console.log(
          "FormValues inicializados desde location.state:",
          requisition
        );
      } else {
        const localData = getLocalStorageItem("requitool-requisition");
        if (localData) {
          setFormValues(JSON.parse(localData));
          console.log("Requisition inicializada desde localStorage");
        }
      }
    }
  }, [location.state, setFormValues]);

  // ========== 📤 Enviar solicitud de entrada ==========
  const onSubmitEntradaRequest = async () => {
    if (location.state?.action === "create") {
      await createRequisition({
        ...formValues,
        userId: userLogged,
      });
    }
    if (location.state?.action === "update") {
      await updateRequisition({
        ...formValues,
        userId: userLogged,
      });
    }
  };

  // ========== 🧠 Switch para modal de detalles ==========
  const switchRDetail = (requestTypeId) => {
    switch (requestTypeId) {
      case 1:
        return (
          <RDetailSalida
            closeModel={() => dispatcher({ type: "SET_OPEN_MODAL" })}
          />
        );
      case 3:
        return <RDetailPromocion />;
      case 4:
        return <RDetailMovimientoLateral />;
      default:
        return null;
    }
  };

  // ========== ✅ Crear solicitud ==========
  const createNewRequest = () => {
    if (formValues?.requestTypeId === 2 || formValues?.requestTypeId === 5) {
      return onSubmitEntradaRequest();
    }
    dispatcher({ type: "SET_OPEN_MODAL" });
  };

  // ========== 🛠 Actualizar solicitud (por hacer) ==========
  const updateRequest = () => {
    if (formValues?.requestTypeId === 2 || formValues?.requestTypeId === 5) {
      return onSubmitEntradaRequest();
    }
    dispatcher({ type: "SET_OPEN_MODAL" });
  };

  // ========== 🚀 Enviar según modo ==========
  const onSubmit = (e) => {
    e.preventDefault();
    if (location.state?.action === "update") {
      updateRequest();
    } else if (location.state?.action === "create") {
      createNewRequest();
    }
  };

  return (
    <Layout>
      <ModalRequisitionDetails
        openModal={state.openModal}
        setOpenModal={() =>
          dispatcher({
            type: "SET_OPEN_MODAL",
          })
        }
        childrenComponent={switchRDetail(formValues.requestTypeId)}
      />{" "}
      <LoadingModal
        openModal={isPendingCreateRequisition || isPendingUpdateRequisition}
        text={
          location.state?.action === "update"
            ? "Actualizando solicitud"
            : "Creando solicitud"
        }
      />
      <div className="m-4 w-full">
        <div className="border-b bg-white rounded-sm w-[86%]">
          <div className="flex items-center border-b p-4 mx-2">
            <a href="/home">
              <TextButton text={"Atras"} />
            </a>
            {/*Titulo */}
            <h1 className="px-9 text-3xl p-4">Formulario de Requisición</h1>

            {/* Esto debería mostrar el valor */}
          </div>
          {/*formulario*/}
          <form action="" className="p-10" onSubmit={onSubmit}>
            <p>{JSON.stringify(formValues)}</p>
            {/*seleccionar Acción*/}
            {/*row 1 */} <h1 className="text-2xl">Tipo de solicitud</h1>
            <div className="flex">
              <div className="flex-1 m-5">
                <label
                  className="block text-black text-lg font-bold mb-2"
                  htmlFor="requestTypeId"
                >
                  Acción
                </label>

                <AsyncSelect
                  url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getRequestType/${
                    location.state?.action === "update" &&
                    formValues?.requestTypeId !== 1
                      ? true
                      : false
                  }`}
                  name={"requestTypeId"}
                  value={formValues?.requestTypeId || ""} // Usamos 'value' y un fallback a ""
                />
              </div>
              <div className="flex-1 m-5"></div>
            </div>
            {/*Info Empleado */}
            {formValues?.requestTypeId !== 2 && <EmployeeInfo />}
            {/*Info acción*/}
            {formValues?.requestTypeId && (
              <h1 className="text-2xl">Información de Acción</h1>
            )}
            {/*renuncia */}
            {formValues?.requestTypeId === 1 && <Salida />}
            {/*entrada*/}
            {formValues?.requestTypeId === 2 && <Entrada />}
            {/*Salida Lateral*/}
            {formValues?.requestTypeId === 3 && <Promocion />}
            {formValues?.requestTypeId === 4 && <MovimientoLateral />}
            {formValues?.requestTypeId === 5 && <CierrePlaza />}
            {/*button*/}
            <div className="w-full flex justify-center items-center border-t py-4">
              <TextButton type={"submit"} text={"Completar"} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewRequisition;
