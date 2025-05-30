import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
import { convertirBase64 } from "../../../utils/Base64.js";

export default function Promocion() {
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);
  const setForm = formStore((state) => state.setFormValues);
  const employeeSelected = formStore((state) => state.employeeSelected);
  const setEmployeeSelected = formStore((state) => state.setEmployeeSelected);
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
            htmlFor="levelUp"
          >
            Level Up
          </label>
          <select
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            name="levelUp"
            value={formValues.levelUp}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
          >
            <option selected value={""}>
              Seleccionar una opción
            </option>
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="attachmentBase64"
          >
            Carta de Promocion
          </label>
          <input
            className=" border rounded-sm w-full py-2 px-3 text-grey-darker text-lg  bg-slate-100 focus:outline-none "
            id="attachmentBase64"
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
      </div>{" "}
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="recordDate"
          >
            Fecha Oficial del Movimiento (Fecha efectiva)
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            id="recordDate"
            type="date"
            name="recordDate"
            value={
              formValues.recordDate ? formValues.recordDate.split("T")[0] : ""
            }
            onChange={(e) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
            /* required*/
            autoComplete="off"
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="promotionMoth"
          >
            Ventana de Promocion
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            id="promotionMoth"
            type="date"
            name="promotionMoth"
            value={
              formValues.promotionMoth
                ? formValues.promotionMoth.split("T")[0]
                : ""
            }
            onChange={(e) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
            /* required*/
            autoComplete="off"
          />
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="promotionJustification"
          >
            Justificación de Promocion (Ingles)
          </label>
          <input
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            id="promotionJustification"
            name="promotionJustification"
            placeholder="Justificación de Promocion"
            value={formValues.PromotionJustification}
            onChange={(e) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
            /* required*/
            autoComplete="off"
          />
        </div>
      </div>{" "}
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
            name="Comment"
            value={formValues.Comment}
            onChange={(e) => {
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
            /* required*/
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
}
