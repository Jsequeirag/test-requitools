import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
import { convertirBase64 } from "../../../utils/Base64.js";
export default function Salida() {
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);
  //API
  var { data: requestTypeData, isSuccess: requestTypeIsSuccess } = useApiGet(
    ["RequestType"],
    getRequestType
  );
  return (
    <>
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Motivo
          </label>
          <AsyncSelect
            url={`https://localhost:7040/GetRequisitionTypeByRequestTypeId/${formValues?.requestTypeId}`}
            name={"requisitionTypeId"}
            value={formValues?.requisitionTypeId || ""} // Usamos 'value' y un fallback a ""
          />
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Carta de Renuncia
          </label>
          <input
            className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
            id="idExactus"
            type="file"
            name="attachmentBase64"
            placeholder="Dígite su usuario"
            onChange={async (e) => {
              const archivoSeleccionado = e.target.files[0];
              if (archivoSeleccionado) {
                try {
                  const base64 = await convertirBase64(archivoSeleccionado);

                  setFormValues({
                    [e.target.name]: base64,
                  });
                } catch (error) {
                  console.error("Error al convertir a Base64:", error);
                }
              }
            }}
            accept=".pdf, image/*"
            /* required*/
            autoComplete="off"
          />
        </div>

        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Tipo de Despido
          </label>
          <>
            <AsyncSelect
              url={`https://localhost:7040/getRequisitionSubtypeByRequisitionTypeId?RequisitionTypeId= ${
                formValues?.requisitionTypeId || ""
              }`}
              value={formValues?.requisitionSubtype || ""}
              name={"requisitionSubtype"}
              disabled={formValues?.requisitionTypeId !== 4}
            />
          </>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            RForm
          </label>
          <input
            disabled={formValues?.requisitionSubtype !== 1}
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            id="IdExactus"
            name="rForm"
            value={formValues?.requisitionSubtype === 1 ? formValues.rForm : ""}
            placeholder="RForm"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
          />
        </div>

        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Recontratable
          </label>
          <select
            required
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            name="rehirable"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
          >
            <option selected>Seleccionar una opción</option>
            <option value={true} selected>
              Sí
            </option>
            <option value={false} selected>
              No
            </option>
          </select>
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Fecha de Salida
          </label>
          <input
            required
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            type="date"
            id="IdExactus"
            name="employeeDepartureDate"
            placeholder="Dígite su usuario"
            /* required*/
            autoComplete="off"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            value={
              formValues.employeeDepartureDate
                ? formValues.employeeDepartureDate.split("T")[0]
                : ""
            }
          />
        </div>
      </div>{" "}
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Fecha Oficial de Salida
          </label>
          <input
            required
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            type="date"
            id="IdExactus"
            name="officialEmployeeDepartureDate"
            placeholder="Dígite su usuario"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
            value={
              formValues.officialEmployeeDepartureDate
                ? formValues.officialEmployeeDepartureDate.split("T")[0]
                : ""
            }
          />
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Fecha Entrega de Equipo
          </label>
          <input
            required
            className="shadow border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            type="date"
            name="returnWorkEquipmentDate"
            placeholder="Dígite su usuario"
            onChange={(e) => {
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={
              formValues.returnWorkEquipmentDate
                ? formValues.returnWorkEquipmentDate.split("T")[0]
                : ""
            }
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Número de teléfono
          </label>
          <input
            required
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            type="number"
            name="phoneNumber"
            placeholder="Número de Teléfono"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
            value={formValues.phoneNumber || ""}
          />
        </div>
      </div>{" "}
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Correo Personal
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            type="email"
            name="personalEmail"
            placeholder="Correo Personal"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
            value={formValues.personalEmail || ""}
          />
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Motivo
          </label>
          <AsyncSelect
            url={`https://localhost:7040/getRequisitionFeature?requisitionFeatureId=1`}
            name={"reason"}
            value={formValues.reason || ""}
          />
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Nueva Empresa
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            type="text"
            name="joinNewCompanny"
            placeholder="Nueva empresa"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
            value={formValues.joinNewCompanny || ""}
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Comentario
          </label>
          <textarea
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input h-[200px]"
            type="text"
            placeholder="Comentario"
            name="comment"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            value={formValues.comment || ""}
            /* required*/
            autoComplete="off"
          />
        </div>
      </div>
      {/*detalles requisicion*/}
    </>
  );
}
