import { useNavigate } from "react-router-dom";
import { React, useReducer, useEffect } from "react";
import "./login.css";
import { motion } from "framer-motion";
import { initialState, reducer } from "./Reducer";
import TextButton from "../../components/Button/TextButton";
import { useApiSend } from "../../api/config/customHooks";
import { login } from "../../api/urls/auth";

import { getRolesByEmployeeId } from "../../api/urls/userRole";

import { saveLocalStorage } from "../../utils/localstore";

const Login = () => {
  const navigate = new useNavigate();
  const [state, dispatcher] = useReducer(reducer, initialState);
  const { isPending, mutateAsync } = useApiSend(login);

  const onSubmit = async (e) => {
    e.preventDefault();
    mutateAsync(state.formValues)
      .then(async (data) => {
        saveLocalStorage("requitool-employeeInfo", data);
        await getRolesByEmployeeId(data.employeeId).then((res) => {
          saveLocalStorage("requitool-roles", res);
        });
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg flex flex-row justify-center items-center h-[100vh]">
        <div className="flex flex-row justify-center items-center pc:w-[45%] movil:w-[95%] bg-white/70 backdrop-blur-md rounded-lg p-8 shadow-lg">
          {/* Contenedor de la imagen */}
          <div className="flex-1 pc:flex pc:flex-col items-center justify-center h-[400px] rounded-lg overflow-hidden movil:hidden">
          <img
              className="pc:block movil:hidden"
              src="/assets/resourcesLogo.png"
              width="250"
              alt=""
            />
          </div>

          {/* Formulario */}
          <form onSubmit={onSubmit} className="flex flex-col flex-1 ml-5">
            <div className="m-4 flex justify-center items-center flex-col"></div>
            <div className="mb-4">
              <p className="text-4xl mb-4 font-semibold text-gray-800">
                Bienvenido a Requitools
              </p>
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="employeeId"
              >
                Usuario
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#bdab78] focus:border-[#bdab78]"
                id="employeeId"
                type="text"
                name="employeeId"
                placeholder="Dígite su usuario"
                onChange={(e) =>
                  dispatcher({
                    type: "SET_FORM_VALUES",
                    payload: { [e.target.name]: e.target.value },
                  })
                }
                autoComplete="off"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#bdab78] focus:border-[#bdab78]"
                id="password"
                type="password"
                name="password"
                placeholder="******"
                onChange={(e) => {
                  dispatcher({
                    type: "SET_FORM_VALUES",
                    payload: { [e.target.name]: e.target.value },
                  });
                }}
                minLength={6}
                autoComplete="off"
              />
              <p className="text-red-700 text-lg italic">{}</p>
            </div>
            <div className="flex items-center flex-col">
              <div className="mb-4">
                <TextButton
                  disabled={isPending}
                  type="submit"
                  text={"Ingresar"}
                />
              </div>
            </div>

            {/*recuperar contraseña*/}{" "}
            <div className="text-center mb-2">
              <p className="flex flex-col">¿No tienes cuenta?</p>
              <a
                className="inline-block align-baseline text-black  font-bold   text-blue hover:text-blue-darker"
                href="/register"
              >
                Registrate aquí
              </a>
            </div>

            <div className="text-center">
              <p className="flex flex-col text-gray-700">
                ¿Has olvidado tu contraseña?
              </p>
              <a

                className="inline-block align-baseline text-black  font-bold   text-blue hover:text-blue-darker"
                href="/recoverPassword"

              >
                Recuperar aquí
              </a>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;