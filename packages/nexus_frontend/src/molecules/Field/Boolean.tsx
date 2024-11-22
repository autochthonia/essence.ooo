import React, { FunctionComponent } from "react";
import { useField } from "formik";

const BooleanField: FunctionComponent<{
  name: string;
  label?: string;
}> = ({ name, label = name }) => {
  const [props, meta] = useField({name, type: "checkbox"});
  return (
    <label>
      <span>{label}</span>
      <input type="checkbox" {...props}/>
    </label>
  );
};

export default BooleanField;
