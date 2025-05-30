import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet, useApiSend } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
import {
  getEmployeesbyBoss,
  getEmployees,
} from "../../../api/urls/Employee.js";
import LoadingModal from "../../../components/LoadingModal/LoadingModal";
import { useNavigate } from "react-router-dom";
import { getLocalStorageKeyValue } from "../../../utils/localstore";
import { createRequests } from "../../../api/urls/Request";
import { ToastContainer, toast } from "react-toastify";
import TextButton from "../../../components/Button/TextButton";
export default function RDetailPromocion() {
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);
  //reacty-router-dom
  const navigate = useNavigate();
  //localstorage
  const userLogged = getLocalStorageKeyValue("requitool-employeeInfo", "id");
  //submit
  const {
    mutateAsync,
    isPending,
    isLoading: isLoadingCreateRequest,
  } = useApiSend(
    createRequests,
    () => {
      toast.success("Solicitud creada", {
        className: "bg-grey-800",
        progressClassName: "bg-white",
      });
      navigate("/requisitions");
    },
    (e) => {
      console.log(e);
      toast.error("Inconveniente Creando la solicitud", {
        className: "bg-grey-800",
        progressClassName: "bg-white",
      });
    }
  );
  //onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({
      ...formValues,
      ["userId"]: userLogged,
    });
  };

  var {
    data: employeesData,
    isSuccess: employeesByBossIsSuccess,
    isLoading,
  } = useApiGet(
    ["employeesByBoss"],
    () => getEmployeesbyBoss(formValues?.employeeId),
    {
      // <- SOLO ejecuta si hay ID
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  return (
    <form onSubmit={onSubmit}>
      <ToastContainer position="bottom-right" theme="dark" />{" "}
      <LoadingModal openModal={isPending} text="Creando Solicitud" />
      <h1 className="text-2xl">Detalles de la Acción</h1> {/*renuncia */}
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="ChangeManager"
          >
            Cambia el encargado
          </label>
          <select
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            name="ChangeManager"
            onChange={(e) =>
              setFormValues({
                [e.target.name]: e.target.value,
              })
            }
          >
            <option selected value={""}>
              Seleccionar una opción
            </option>
            <option value={true}>Sí</option> <option value={false}>No</option>
          </select>
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Nuevo encargado
          </label>
          <AsyncSelect
            url={`https://localhost:7040/getEmployees`}
            name={"newDominoEffectManager"}
            customNameParam={"nombre"}
            value={formValues.newDominoEffectManager || ""}
          />
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="RequiresReplacement"
          >
            Requiere reemplazo
          </label>
          <select
            className="shadow border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            name="requiresReplacement"
            value={formValues.requiresReplacement} // Add this line
            required
            onChange={(e) =>
              setFormValues({
                ...formValues, // It's good practice to spread the previous state
                [e.target.name]: e.target.value,
              })
            }
          >
            <option value="">Seleccionar una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div className="flex">
        <div className=" m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="HiringProcess"
          >
            Requiere proceso de contratación
          </label>{" "}
          <select
            className="shadow border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            disabled={formValues.requiresReplacement !== "true"}
            name="hiringProcess"
            required
            value={formValues.hiringProcess} // Add this line
            onChange={(e) =>
              setFormValues({
                ...formValues, // It's good practice to spread the previous state
                [e.target.name]: e.target.value,
              })
            }
          >
            <option value="">Seleccionar una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="flex">
          <div className="w-[100%] m-5">
            <label
              className="block text-black text-lg font-bold mb-2"
              htmlFor="HiringProcess"
            >
              Nuevo Supervisor
            </label>
            <div className=""></div>
            <div className="">
              {
                <>
                  <AsyncSelect
                    url={`https://localhost:7040/getEmployees`}
                    name={"asignEmployees"}
                    customNameParam={"nombre"}
                    disabled={!employeesData?.length > 0}
                    value={formValues.asignEmployees || ""}
                    required={!formValues.requiresReplacement !== "true"}
                  />
                </>
              }
            </div>

            <>
              {employeesData?.length > 0 && (
                <p className="text-blue-600 mt-1">
                  <b>Personal a cargo</b>, por favor seleccione un nuevo
                  supervisor para el personal
                </p>
              )}
            </>
          </div>
        </div>
      </div>
      <p className="text-red-600 text-xl">
        Nota: 1-preguntar sobre los empleados de los otros departamento(Para
        enviar correo), 2- Ocupa comfirmar cambios en exactus antes de proseguir
        con la requisiciones
      </p>
      <div className="flex w-100 justify-center">
        <TextButton text={"Crear solicitud"} type={"submit"} />
      </div>
    </form>
  );
}
