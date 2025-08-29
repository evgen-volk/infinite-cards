import React, { forwardRef } from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string | React.ReactNode;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, forwardedRef) => {
    const { label, onChange, checked } = props;

    return (
      <label className="flex items-center text-base-regular cursor-pointer">
        <input
          ref={forwardedRef}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="hidden"
        />
        <div
          role="checkbox"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            onChange(!checked);
          }}
          onKeyDown={(e) => {
            if (e.code === "Space") {
              e.preventDefault();
              onChange(!checked);
            }
          }}
          aria-checked={checked}
          className="flex items-center justify-center rounded-md border border-tangem-gray-light2 h-[20px] w-[20px] flex-shrink-0"
        >
          {checked && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        {label && (
          <span className="ml-2 leading-5 text-base text-tangem-gray">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
