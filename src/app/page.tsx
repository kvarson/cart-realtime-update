"use client";

import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { REGISTER_MUTATION } from "@/graphql/mutations";
import { Button } from "@/components/ui/button";
const RegisterPage = () => {
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    try {
      const response = await register();
      if (response.data) {
        const { token } = response.data.register;

        Cookies.set("token", token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <div>
      <h1 className='text-red-500'>Register</h1>
      <Button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Registration Successful! Token: {data.register.token}</p>}
    </div>
  );
};

export default RegisterPage;
