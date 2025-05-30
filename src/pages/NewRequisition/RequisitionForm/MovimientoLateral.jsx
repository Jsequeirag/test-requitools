import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
import RMovimientoLateral from "../RequisitionDetail/RDetailMovimientoLateral.jsx";
export default function MovimientoLateral() {
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
        <div className=" m-5">
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
        </div>{" "}
        <div className="flex">
          <div className="m-5">
            <label
              className="block text-black text-lg font-bold mb-2"
              htmlFor="CreatedDate"
            >
              Fecha Oficial del Movimiento
            </label>
            <input
              id="CreatedDate"
              required
              className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
              type="date"
              name="createdDate"
              placeholder="Fecha oficial del Movimiento"
              onChange={(e) => {
                setFormValues({
                  [e.target.name]: e.target.value,
                });
              }}
              /* required*/
              autoComplete="off"
              value={formValues.createdDate || ""}
            />
          </div>
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
