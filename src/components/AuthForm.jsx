import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType } from "zod";
import { z } from "zod";
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

const AuthForm = ({ type, schema, defaultValues, onSubmit }) => {

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (data) => {};

  return <div>AuthForm -- {type}</div>;
};

export default AuthForm;

