import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
export default function CierrePlaza() {
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
            url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/GetRequisitionTypeByRequestTypeId/${formValues?.requestTypeId}`}
            name={"requisitionTypeId"}
            value={formValues?.requisitionTypeId || ""} // Usamos 'value' y un fallback a ""
          />
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="DeliverableType"
          >
            Tipo de entregable
          </label>
          <AsyncSelect
            url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getRequisitionFeature?requisitionFeatureId=2`}
            name={"deliverableType"}
            value={formValues.deliverableType || ""} // Add this line
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="projectName"
          >
            Nombre de proyecto
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            type="text"
            name="projectName"
            placeholder="Nombre de proyecto"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="rForm"
          >
            R Form
          </label>
          <input
            id="rForm"
            required
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            type="text"
            name="rForm"
            placeholder="RForm"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="OfficialSavingDate"
          >
            Fecha Oficial del Saving
          </label>
          <input
            id="OfficialSavingDate"
            required
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            type="date"
            name="officialSavingDate"
            placeholder="Oficial del Saving"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            /* required*/
            autoComplete="off"
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
            /* required*/
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
}
