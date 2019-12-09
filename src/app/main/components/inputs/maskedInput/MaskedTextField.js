import React from "react";
import { TextField } from "@material-ui/core";
import MaskedInput from "react-text-mask";

const TextMaskCustom = props => {
  const { inputRef, mask, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
      showMask
      keepCharPositions={true}
    />
  );
};

const MaskedTextField = props => {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: TextMaskCustom
      }}
    />
  )
}

export default MaskedTextField