import React from "react";
import Select, { StylesConfig } from "react-select";
import { Label } from "../ui/label";

export type OptionsSelect = {
  value: string;
  label: string;
};

interface IReactSelectProps {
  isMulti?: boolean;
  options: OptionsSelect[];
  isRequired?: boolean;
  label?: string;
  name?: string;
  onChange?: (value: any) => void;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
}

const customStyles: StylesConfig<any, boolean> = {
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    fontSize: "14px", // Thu nhỏ chữ placeholder
    color: "#999",
  }),
  control: (defaultStyles) => ({
    ...defaultStyles,
    fontSize: "14px",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    fontSize: "14px",
    backgroundColor: isFocused ? "#f0f0f0" : "white",
    color: "black",
  }),
};

export default function ReactSelect(props: IReactSelectProps) {
  const {
    isMulti = false,
    options,
    isRequired = false,
    label,
    name,
    onChange,
    value,
    placeholder,
    disabled,
  } = props;
  return (
    <div className="">
      {label && (
        <Label className="font-bold">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Select
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        isDisabled={disabled}
        styles={customStyles}
      />
    </div>
  );
}
