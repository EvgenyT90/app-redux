import React from "react";
import "./styles.css";

export const Button = ({ text, type }: { text: string; type: any }) => {
    return (
        <button className="myButton" type={type}>
            {text}
        </button>
    );
};
