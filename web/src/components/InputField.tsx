import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/core";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

const InputField: React.FC<InputProps> = ({
  label,
  size: _,
  textarea,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let InputOrTextarea = Input;

  if (textarea) {
    InputOrTextarea = Textarea;
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
