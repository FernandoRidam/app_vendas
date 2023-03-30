import {
  Control,
  Controller,
  RegisterOptions,
} from "react-hook-form";

import {
  Input,
  InputProps,
} from "../Input";

export interface InputFormProps extends InputProps {
  control: Control<any, any>;
  name: string;
};

export const InputForm: React.FC<InputFormProps> = ({
  control,
  name,
  ...rest
}) => {
  return (
    <Controller
      control={ control }
      render={({
        field: {
          onChange,
          onBlur,
          value,
        },
        fieldState: {
          error,
        },
      }) => (
        <Input
          onBlur={ onBlur }
          onChangeText={ onChange }
          value={ value }
          error={ error?.message }
          formError
          { ...rest }
        />
      )}
      name={ name }
    />
  );
};
