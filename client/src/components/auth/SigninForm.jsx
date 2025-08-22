import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useLoginUserMutation } from "../../lib/authApis";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import ErrorMessage from "../common/ErrorMessage";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading, data, isSuccess, error, isError }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  const onSubmitFormHandler = (event) => {
    event.preventDefault();

    if (!email || !password) {
      return alert("Please fill in all fields");
    }

    loginUser({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("refresh_token", data?.data?.refreshToken);
      navigate("/dashboard");
    }
  }, [isSuccess]);

  return (
    <div className="my-[70px] mx-auto max-w-[600px]">
      <div>
        <h1 className="text-3xl font-semibold">Signin</h1>
        <p className="text-[15px]">Signin to get started</p>
      </div>

      {isError && (
        <ErrorMessage
          message={error?.data?.message || "something went wrong"}
        />
      )}
      <div className="mt-[40px]">
        <form onSubmit={onSubmitFormHandler}>
          <div className="mb-[10px]">
            <input
              type="text"
              placeholder="Email"
              className={`w-full ${styles.form_input}`}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="mb-[10px]">
            <input
              type="password"
              placeholder="Password"
              className={`w-full ${styles.form_input}`}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="cursor-pointer bg-[#333] w-full h-[45px] rounded-[5px] text-[#fff] font-semibold hover:bg-[#444]"
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>

            <div className="flex justify-between items-center mt-[-10px]">
              <p>
                Forgot password? <Link to="/auth/reset-password">Reset</Link>
              </p>
              <p>
                Don't have an account? <Link to="/auth/signup">Signup</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
