import React, { useCallback } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Bus, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  {
    value: ["A11", "A12", "A13", "A14", "A15", "A16"],
    label: "4-core CPU",
    description: "32 GB RAM",
  },
  {
    value: ["B11", "B12", "B13", "B14", "B15", "B16"],
    label: "6-core CPU",
    description: "32 GB RAM",
  },
];

interface RadioCardProps {
  value: string | string[];
  onChange?: (val: string[]) => void;
}

const getValueAsString = (value: string | string[]): string => {
  return Array.isArray(value) ? value.join(",") : value;
};

const RadioCards = ({ value, onChange }: RadioCardProps) => {
  const handleValueChange = useCallback(
    (val: string) => {
      const selectedOption = options.find(
        (option) => getValueAsString(option.value) === val
      );
      if (selectedOption && onChange) {
        onChange(selectedOption.value);
      }
    },
    [onChange]
  );

  return (
    <RadioGroup.Root
      value={getValueAsString(value)}
      onValueChange={handleValueChange}
      className="w-full grid grid-cols-3 gap-4"
    >
      {options.map((option) => {
        const optionValue = getValueAsString(option.value);
        return (
          <RadioGroup.Item
            key={optionValue}
            value={optionValue}
            className={cn(
              "relative group ring-[1px] ring-border rounded py-2 px-3 text-start",
              "data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
            )}
          >
            <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-blue-500 stroke-white group-data-[state=unchecked]:hidden" />
            <Bus className="mb-2.5 text-muted-foreground" />
            <span className="font-semibold tracking-tight">{option.label}</span>
            <p className="text-xs">{option.description}</p>
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
};

export default RadioCards;
