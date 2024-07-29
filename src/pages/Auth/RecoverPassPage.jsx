import { useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SubmitButton } from "../../components/auth/pure/submitButton";
import { IconsRight } from "../../components/auth/pure/iconsRight";
import logo from "../../assets/imgs/logoForms.png";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
// import toast from 'react-hot-toast';
import { Toaster, toast } from "sonner";
import { FaLock, FaLockOpen } from "react-icons/fa";

export const RecoverPassForm = () => {
  const { register, handleSubmit, setError } = useForm();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const { recoverPassword } = useContext(AuthContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [error, setErrorState] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (data) => {
    try {
      console.log("Formulario de recuperación de contraseña enviado:", data);
      console.log("Valor de token:", token);
      const { success } = await recoverPassword(data.confirmPassword, token); // Acceder al token desde data.token
      if (!data.token) {
        // Verificar si el token está presente en los datos del formulario
        setError("token", {
          type: "manual",
          message:
            "Token no válido. Por favor, asegúrate de tener el enlace correcto.",
        });
        return;
      }

      console.log("Token enviado al servidor:", data.token); // Mostrar el token enviado al servidor

      console.log("Respuesta del servidor:", success);

      if (success) {
        toast.success("¡Tu contraseña ha sido cambiada con éxito!", {
          position: "bottom-right",
          style: {
            fontSize: "15px",
            padding: "25px",
          },
        });
        setTimeout(() => {
          setRedirectToLogin(true);
        }, 3000);
      } else {
        toast.error("Error al cambiar la contraseña.", {
          position: "bottom-right",
          style: {
            fontSize: "15px",
            padding: "25px",
          },
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleTogglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div>
      {redirectToLogin && <Navigate to="/login" />}
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          token: token, // Agregar el token como un campo oculto en el formulario
        }}
        validate={(values) => {
          const errors = {};

          if (!values.password) {
            errors.password = "Password is required";
          }

          if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords don't match";
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        <section className="w-full mt-24 flex flex-col justify-center items-center ">
          <Form className="flex flex-col gap-4 flex-nowrap border-2 border-white rounded-xl w-[calc(100%-20px)] md:w-[700px] p-5 shadow-2xl bg-gray-200">
            <h1 className="text-[30px] font-bold tex-center">
              <span className="text-[#284B63]">Recover</span> Password
            </h1>

            <div className="border-t-2 border-gray-300 mb-2"></div>

            <span className="w-full text-center text-gray-400">
              Set your new password
            </span>

            <div className="flex flex-col h-14 w-full sm:w-[100%] px-10">
              {/*  //?box input Password */}
              <div className="flex md:w-full ">
                <span
                  className="inline-flex items-center px-2 text-lg text-gray-900 cursor-pointer bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaLockOpen /> : <FaLock />}
                </span>
                <Field
                  className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                  type={showPassword ? "text" : "password"}
                  title="Password"
                  name="password"
                  placeholder="Password"
                  maxLength="64"
                />
                <br />
              </div>
              <ErrorMessage
                name="password"
                className="text-red-600 font-semibold"
                component="span"
              />
            </div>

            <div className="flex flex-col h-14 w-full sm:w-[100%] px-10">
              {/*  //?box input Password */}
              <div className="flex md:w-full ">
                <span
                  className="inline-flex items-center px-2 text-lg text-gray-900 cursor-pointer bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-my-gray dark:text-black dark:border-gray-600"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaLockOpen /> : <FaLock />}
                </span>
                <Field
                  className={`rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-sm border-gray-300 p-2.5  dark:bg-my-gray dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                  type={showPassword ? "text" : "password"}
                  title="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  maxLength="64"
                />
                <br />
              </div>
              <ErrorMessage
                name="confirmPassword"
                className="text-red-600 font-semibold"
                component="span"
              />
            </div>

            {/* Campo oculto para enviar el token */}
            <Field type="hidden" name="token" value={token} />
            <SubmitButton text="Recover Password" />
          </Form>
        </section>
      </Formik>
    </div>
  );
};
