import * as Form from "@radix-ui/react-form";
import classNames from "classnames";

interface FieldProps {
  name: string;
  label?: string;
  background?: boolean | "purple-light" | "white";
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "textarea"
    | "search";
  maxnumber?: number;
  direction?: "row" | "col";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  validatorMessage?: string;
  border?: boolean;
  loading?: boolean;
  value: string;
  setValue: (value: string) => void;
  onChange?: (value: string) => void;
  match?: (value: string, formData: FormData) => boolean;
}

const Field = ({
  name,
  label,
  type,
  maxnumber,
  background = true,
  direction = "row",
  placeholder,
  required,
  validatorMessage,
  defaultValue,
  value,
  setValue,
  onChange,
  match,
  border = false,
}: FieldProps) => {
  const classes = classNames("flex", "flex-1", "h-8", {
    "flex-row gap-2": direction == "row",
    "flex-col": direction == "col",
  });

  const fieldClasses = classNames(
    "w-[95%]",
    "rounded-sm",
    "font-inter",
    "tracking-wide",
    "text-md",
    "rounded-lg",
    "p-2",
    "h-10",
    "text-primary",
    "placeholder-darker",
    "outline-primary",
    "border-darker",
    "z-50",
    "py-2",
    "border-solid",
    "overflow-visible",
    background ? null : "bg-transparent",
    background == "purple-light" && "bg-purple-light",
    border ? "border-[2px]" : "border-none",
  );

  /**
   * Different from handle change in number fields.
   * Adds the clicked character.
   * @param event for when new input is added in search or text field
   */
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange;
  };

  /**
   * This stops the text fields from submitting when
   * pressing enter key.
   * @param event for when enter key is pressed
   */
  const handleKeyPress = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  /**
   * Updates and sets the values for the
   * number fields. Should never set itself
   * to under 0.
   * @param event for when new numbers are added
   * @returns nothing if the conditions are met
   */
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue == "" || parseInt(newValue) <= 0) {
      setValue("0");
      return;
    }

    if (newValue.startsWith("0") && newValue.length > 1) {
      setValue(newValue.substring(1, newValue.length));
      onChange;
      return;
    }

    setValue(newValue);
    onChange;
  };

  return (
    <Form.Field name={name} className={classes}>
      <div className="flex">
        {label && (
          <Form.Label className="font-medium mb-1 text-md flex justify-start w-full">
            {label}
          </Form.Label>
        )}
        {maxnumber && (
          <Form.Label className="font-medium mb-1 text-md w-full flex justify-end px-4 text-purple-default">
            {maxnumber}
          </Form.Label>
        )}
      </div>

      {type === "textarea" && (
        <Form.Control className="sm:h-[100px] h-[80px] w-[99%]" asChild>
          <textarea
            required={required}
            className={fieldClasses}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            onKeyDown={handleKeyPress}
          />
        </Form.Control>
      )}
      {type === "search" && (
        <Form.Control
          type={"text"}
          required={required}
          className={fieldClasses}
          defaultValue={defaultValue}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      )}

      {type === "number" && (
        <Form.Control
          type={type}
          required={required}
          className={fieldClasses}
          defaultValue={defaultValue}
          placeholder={placeholder}
          value={value}
          onChange={handleNumberChange}
        />
      )}

      {type === "password" && (
        <Form.Control
          type={type}
          required={required}
          className={fieldClasses}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      )}

      {type === "text" && (
        <Form.Control
          type={type}
          required={required}
          className={fieldClasses}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      )}

      {match ? (
        <Form.Message match={match} className="text-red mt-2">
          {validatorMessage}
        </Form.Message>
      ) : null}
    </Form.Field>
  );
};

export default Field;
