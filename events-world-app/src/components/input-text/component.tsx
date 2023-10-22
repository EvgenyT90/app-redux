import React from "react";
import "./styles.css";

export const InputText = ({
    type = "text",
    inputLabel,
    placeholder,
    onChange,
    value,
    register,
    rules,
}: {
    type: string;
    inputLabel: string;
    placeholder?: string;
    onChange?: any;
    value?: string;
    register?: any;
    rules?: any;
}) => {
    return (
        <input
            onChange={onChange}
            className="InputText"
            type={type}
            placeholder={placeholder}
            value={value}
            {...register(inputLabel, { ...rules })}
        />
    );
};

/*
  <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
 */
