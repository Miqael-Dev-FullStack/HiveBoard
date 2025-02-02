"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { api } from "../../utils/api";

export default function GoogleSignUpBtn({ setError }: any) {
  const handleSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;
      const res = await api.googleLogin(credential);

      console.log("loggen in", res);
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <GoogleLogin
      containerProps={{ style: { width: "100%" } }}
      text="continue_with"
      size="large"
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
