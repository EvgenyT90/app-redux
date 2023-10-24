import { motion } from "framer-motion";
import React from "react";

export const ToggleSwitch = () => {
    const [isOn, setIsOn] = React.useState(false);
    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <div style={{ alignItems: "center", display: "flex" }}>
            <div
                style={{
                    background: isOn ? "#48bb78" : "rgba(203, 213, 224, 0.5)",
                    justifyContent: isOn ? "flex-end" : "flex-start",
                    width: "6rem",
                    padding: "0.25rem",
                    display: "flex",
                    borderRadius: 9999,
                    cursor: "pointer",
                    height: "2.5rem",
                }}
                onClick={toggleSwitch}
            >
                {" "}
                {/* Switch knob */}{" "}
                <motion.div
                    style={{
                        width: "2rem",
                        height: "2rem",
                        background: "white",
                        borderRadius: "100%",
                        boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                    layout
                ></motion.div>{" "}
            </div>
        </div>
    );
};
