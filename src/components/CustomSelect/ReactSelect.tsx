import React from "react";
import Select, { StylesConfig, components } from "react-select";
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
  icon?: React.ReactNode;
}

const customStyles: StylesConfig<any, boolean> = {
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    fontSize: "14px",
    color: "#999",
  }),
  control: (defaultStyles) => ({
    ...defaultStyles,
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "8px", // Giúp text không bị dính vào icon
  }),
  option: (base, { isFocused }) => ({
    ...base,
    fontSize: "14px",
    backgroundColor: isFocused ? "#f0f0f0" : "white",
    color: "black",
  }),
  valueContainer: (defaultStyles) => ({
    ...defaultStyles,
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",
  }),
};

// Custom ValueContainer để đặt icon bên trái
const ValueContainer = ({ children, ...props }: any) => {
  const { selectProps } = props;
  return (
    <components.ValueContainer {...props}>
      <div className="flex items-center gap-2">
        {selectProps.icon && <span>{selectProps.icon}</span>}
        {children}
      </div>
    </components.ValueContainer>
  );
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
    icon,
  } = props;

  return (
    <div>
      {label && (
        <Label className="font-bold">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Select
        isMulti={isMulti}
        options={options}
        value={value}
        components={{
          IndicatorSeparator: () => null,
          ValueContainer, // Thêm component ValueContainer để hiển thị icon bên trái
        }}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        isDisabled={disabled}
        styles={customStyles}
        {...(icon ? { icon } : {})}
      />
    </div>
  );
}
