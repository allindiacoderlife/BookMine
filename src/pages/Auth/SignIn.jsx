import React from "react";
import AuthForm from "../../components/AuthForm";
import { signInSchema } from "../../lib/validations";
const SignIn = () => (
  <AuthForm
    type="SignIn"
    schema={signInSchema}
    defaultValues={{ email: "", password: "" }}
    onSubmit={() => {}}
  />
);

export default SignIn;
