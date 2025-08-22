import { useState } from "react";

export const useFormValidation = () => {
  const [formError, setFormError] = useState({ field: "", message: "" });
  const [formIsValid, setFormIsValid] = useState(false);

  const validateForm = (formData) => {
    if (!formData.firstName) {
      setFormIsValid(false);
      return setFormError({
        field: "firstName",
        message: "firstname field is required",
      });
    }

    if (!formData.lastName) {
      setFormIsValid(false);
      return setFormError({
        field: "lastName",
        message: "Lastname field is required",
      });
    }

    if (!formData.email) {
      setFormIsValid(false);
      return setFormError({
        field: "email",
        message: "Email field is required",
      });
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setFormIsValid(false);
      return setFormError({
        field: "email",
        message: "Email is not valid",
      });
    }

    if (!formData.password) {
      setFormIsValid(false);
      return setFormError({
        field: "password",
        message: "Password field is required",
      });
    }

    if (formData.password && formData.password.length < 6) {
      setFormIsValid(false);
      return setFormError({
        field: "password",
        message: "Password must be at least 6 characters long",
      });
    }

    setFormIsValid(true);
    return setFormError({ field: "", message: "" });
  };

  return [formError, formIsValid, validateForm];
};
