import React from "react";
import AuthForm from "../../components/AuthForm";
import { signUpSchema } from "../../lib/validations";
const SignUp = () => (
  <AuthForm
    type="SignUp"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={() => {}}
  />
);

export default SignUp;
