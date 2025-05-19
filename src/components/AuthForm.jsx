import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType } from "zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FIELD_NAMES } from "@/contents";
import ImageUpload from "./ImageUpload";
import { FIELD_TYPES } from "../contents";

const AuthForm = ({ type, schema, defaultValues, onSubmit }) => {

  const mainUrl = import.meta.env.VITE_URL_MAIN;

  const isSignIn = type === "SignIn";

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (data) => {
    onSubmit(data);
    try {
      const endpoint = isSignIn ? "/api/auth/signin" : "/api/auth/signup";
      const res = await fetch(mainUrl + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if(res.status === 429) {
        alert("Too many requests. Please try again later.");
        return;
      }

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // Handle success
      if (isSignIn) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log("Logged in:", result.user);
        window.location.href = "/BookMine/";
      } else {
        console.log("Account created");
        window.location.href = "/BookMine/sign-in";
      }
    } catch (err) {
      console.error("Auth error:", err.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome Back to BookMine" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated."
          : "Please complete all the fields and upload a valid university ID to gain access to the library."}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={FIELD_TYPES[field.name]}
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          to={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign In"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
