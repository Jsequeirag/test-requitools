import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
export default function Entrada() {
  //global
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);
  const setForm = formStore((state) => state.setFormValues);
  const employeeSelected = formStore((state) => state.employeeSelected);
  const setEmployeeSelected = formStore((state) => state.setEmployeeSelected);
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
            htmlFor="Period"
          >
            Periodo
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            id="Period"
            type="number"
            name="period"
            placeholder="Periodo"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
            value={formValues.period || ""}
          />
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            TForm
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            id="idExactus"
            name="tForm"
            placeholder="TForm"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
            value={formValues.tForm || ""}
          />
        </div>
      </div>{" "}
      <div className="flex">
        {" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="carreerSettingsID"
          >
            CarrerSettings
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            id="carreerSettingsID"
            name="carreerSettingsID"
            placeholder="Carreer Settings ID"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
            value={formValues.carreerSettingsID || ""}
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="companyEmail"
          >
            Correo empresa
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            id="companyEmail"
            name="companyEmail"
            placeholder="Correo de compañia"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
            value={formValues.companyEmail || ""}
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="ll"
          >
            LL
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            id="ll"
            name="lL"
            placeholder="LL"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
            value={formValues.name || ""}
          />
        </div>
      </div>{" "}
      <div className="flex">
        <div className="m-5">
          {" "}
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="Period"
          >
            Matriz SOD
          </label>
          <>
            <AsyncSelect
              url={`https://localhost:7040/getRequisitionFeature?requisitionFeatureId=3`}
              name={"sodMatrix"}
              value={formValues.sodMatrix || ""}
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
            /* required*/
            autoComplete="off"
            value={formValues.comment || ""}
          />
        </div>
      </div>
    </>
  );
}
