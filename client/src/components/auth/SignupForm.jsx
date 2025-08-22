import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useCreateNewUserMutation } from "../../lib/authApis";
import styles from "./auth.module.css";
import ErrorMessage from "../common/ErrorMessage";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formError, formIsValid, validateForm] = useFormValidation();

  const navigate = useNavigate();

  const [createNewUser, { isLoading, isSuccess, isError, error }] =
    useCreateNewUserMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      validateForm({ firstName, lastName, email, password });
    }, 500);

    return () => clearTimeout(timer);
  }, [firstName, lastName, email, password]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    createNewUser({ firstName, lastName, email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/verify");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [isSuccess]);

  return (
    <div className="my-[70px] mx-auto max-w-[600px]">
      <div>
        <h1 className="text-3xl font-semibold">Signup</h1>
        <p className="text-[15px]">Signup to get started</p>
      </div>

      {isError && (
        <ErrorMessage
          message={error?.data?.message || "Something went wrong"}
        />
      )}
      <div className="mt-[40px]">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-[10px]">
            <input
              type="text"
              placeholder="First Name"
              className={`w-full ${styles.form_input} ${
                formError.field === "firstName" && styles.form_input_error
              }`}
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
            />

            {formError.field === "firstName" && (
              <div>
                <p className="text-[red] text-[10px]">{formError.message}</p>
              </div>
            )}
          </div>
          <div className="mb-[10px]">
            <input
              type="text"
              placeholder="Last Name"
              className={`w-full ${styles.form_input} ${
                formError.field === "lastName" && styles.form_input_error
              }`}
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
            />

            {formError.field === "lastName" && (
              <div>
                <p className="text-[red] text-[10px]">{formError.message}</p>
              </div>
            )}
          </div>

          <div className="mb-[10px]">
            <input
              type="text"
              placeholder="Email"
              className={`w-full ${styles.form_input} ${
                formError.field === "email" && styles.form_input_error
              }`}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />

            {formError.field === "email" && (
              <div>
                <p className="text-[red] text-[10px]">{formError.message}</p>
              </div>
            )}
          </div>

          <div className="mb-[10px]">
            <input
              type="password"
              placeholder="Password"
              className={`w-full ${styles.form_input} ${
                formError.field === "password" && styles.form_input_error
              }`}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />

            {formError.field === "password" && (
              <div>
                <p className="text-[red] text-[10px]">{formError.message}</p>
              </div>
            )}
          </div>

          <div className="flex items-end gap-5">
            <button
              disabled={!formIsValid}
              type="submit"
              className={`cursor-pointer ${
                !formIsValid && `disabled:bg-[#dc3c3c]`
              } bg-[#333] w-[100px] h-[45px] rounded-[5px] text-[#fff] font-semibold hover:bg-[#444]`}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>

            <p>
              Already have an account? <Link to="/auth/signin">Signin</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
