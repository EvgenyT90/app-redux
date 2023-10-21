import React from "react";
import "./styles.css";

export const Button = ({ text, OnClick }: { text: string; OnClick: any }) => {
    return (
        <button className="myButton" onClick={OnClick}>
            {text}
        </button>
    );
};
