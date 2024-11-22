import React, { FunctionComponent, CSSProperties } from "react";
import { Field as FormikField } from "formik";

const Field: FunctionComponent<{
  name: string;
  label?: string;
  fieldType?: string;
  placeholder?: string | null;
  flexDirection?: CSSProperties["flexDirection"];
  maxLength?: HTMLInputElement["maxLength"];
  max?: HTMLInputElement["max"];
  gridColumn?: CSSProperties["gridColumn"];
}> = ({
  name,
  label = name,
  fieldType = "text",
  placeholder = label,
  flexDirection = "column",
  maxLength,
  max,
  gridColumn = "span 1"
}) => (
  <label style={{ display: "flex", flexDirection: flexDirection, gridColumn: gridColumn }}>
    <span style={{ marginRight: 8 }}>{label}</span>
    <FormikField
      maxLength={maxLength}
      max={max}
      type={fieldType}
      name={name}
      placeholder={placeholder}
      component={fieldType === "textarea" ? "textarea" : undefined}
      style={fieldType === "number" ? { width: "50px" } : undefined}
    />
  </label>
);

export default Field;
