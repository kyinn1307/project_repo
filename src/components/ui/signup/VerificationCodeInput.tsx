import { useRef, useState } from "react";

export default function VerificationCodeInput({
  onComplete,
  onChange,
}: {
  onComplete?: (code: string) => void;
  onChange?: (values: string[]) => void;
}) {
  const [values, setValues] = useState(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange?.(newValues);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every((val) => val.length === 1)) {
      onComplete?.(newValues.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && values[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-[7.5px] justify-center">
      {values.map((val, index) => (
        <input
          key={index}
          ref={(el: HTMLInputElement | null) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-[35px] h-10 text-center text-xl rounded border border-white bg-[#ffffff] text-black focus:outline-none focus:ring-0"
        />
      ))}
    </div>
  );
}
