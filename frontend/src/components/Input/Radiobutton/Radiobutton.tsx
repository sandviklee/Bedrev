import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Icon from "../../Icon/Icon";

interface RadiobuttonProps {
  label: string;
  value: string;
  setValue: (...args: string[]) => void;
}

const Radiobutton = ({ label, value, setValue }: RadiobuttonProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [debouncedValue] = useDebounce(value, 20);

  /**
   * Checks if the radiobutton should be clicked.
   */
  useEffect(() => {
    if (checked && label != value) {
      setChecked(false);
    }
    if (label == value) {
      setValue(label);
      setChecked(true);
    }
  }, [debouncedValue]);

  /**
   * Updates the value when clicking the
   * radio button.
   */
  const setPlaceValue = () => {
    if (checked) {
      setValue("");
      setChecked(false);
    } else {
      setValue(label);
      setChecked(true);
    }
  };

  return (
    <form>
      <div className="flex flex-row items-center gap-2">
        <CheckboxRadix.Root
          className="border-2 border-solid border-purple rounded-md w-4 h-4"
          onCheckedChange={() => setPlaceValue()}
          checked={checked}
        >
          <CheckboxRadix.Indicator className="flex items-center justify-center">
            <Icon icon="Square" />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        <label className="font-inter text-purple tracking-wider">{label}</label>
      </div>
    </form>
  );
};

export default Radiobutton;
