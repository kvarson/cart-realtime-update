"use client";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/graphql/mutations";
import { useState } from "react";

const RegisterPage = () => {
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);
  const [token, setToken] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const response = await register();
      if (response.data) {
        const { token } = response.data.register;
        setToken(token);
        localStorage.setItem("token", token);
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Registration Successful! Token: {data.register.token}</p>}
    </div>
  );
};

export default RegisterPage;
