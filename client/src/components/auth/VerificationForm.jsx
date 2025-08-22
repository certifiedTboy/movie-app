import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useVerifyUserMutation } from "../../lib/authApis";
import ErrorMessage from "../common/ErrorMessage";
import styles from "./auth.module.css";

const VerificationForm = () => {
  const [otp, setOtp] = useState("");

  const [verifyUser, { isLoading, isSuccess, isError, error }] =
    useVerifyUserMutation();

  const navigate = useNavigate();

  const onSubmitFormHandler = (event) => {
    event.preventDefault();

    if (!otp) {
      return alert("Please fill in all fields");
    }

    verifyUser({ otp });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/signin");

      setOtp("");
    }
  }, [isSuccess]);

  return (
    <div className="my-[70px] mx-auto max-w-[600px]">
      <div>
        <h1 className="text-3xl font-semibold">Verify Account</h1>
        <p className="text-[15px]">Verify your account to get started</p>
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
              placeholder="Verification Code"
              className={`w-full ${styles.form_input}`}
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="cursor-pointer bg-[#333] w-full h-[45px] rounded-[5px] text-[#fff] font-semibold hover:bg-[#444]"
            >
              {isLoading ? "Loading..." : "Verify Account"}
            </button>

            {/* <div className="flex justify-between items-center mt-[-10px]">
              <p>
                Forgot password? <Link to="/auth/reset-password">Reset</Link>
              </p>
              <p>
                Don't have an account? <Link to="/auth/signup">Signup</Link>
              </p>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
