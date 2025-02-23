"use client";

import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { REGISTER_MUTATION } from "@/graphql/mutations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
const RegisterPage = () => {
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);
  const router = useRouter();
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
      router.push("/home");
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <div className='flex justify-center align-middle mt-5'>
      <Card>
        <div className='flex justify-center align-middle flex-col px-3 py-3 '>
          <h1>To visit as a Guest, please click the register</h1>
          <Button onClick={handleRegister} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
          {error && <p>Error: {error.message}</p>}
          {data && <p>Registration Successful!</p>}
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
