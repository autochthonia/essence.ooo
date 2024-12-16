import React, { FunctionComponent } from "react";
import { useField } from "formik";

const SelectField: FunctionComponent<{
  name: string;
  label?: string;
  options: { label: string; value: string }[];
}> = ({ name, label = name, options = [] }) => {
  const [props, meta] = useField(name);
  return (
    <label>
      <span style={{ marginRight: 8 }}>{label}</span>
      <select {...props}>
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectField;
