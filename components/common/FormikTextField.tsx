import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { FieldInputProps, useField } from "formik";

type Props = { name: string } & TextFieldProps;
type TexFieldConfig = TextFieldProps & FieldInputProps<any>;

const FormikTextField = ({ name, ...props }: Props) => {
  const [field, meta] = useField(name);

  const configTextField: TexFieldConfig = {
    ...field,
    ...props,
  };

  if (meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <MuiTextField {...configTextField} />;
};

export default FormikTextField;
