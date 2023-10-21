import React, { useState, useContext } from "react";
import "./styles.css";
import { Form } from "../../components";
import { Overlay } from "../../components";
import withLogger from "../../hocs/withLogger";
import { UserContext } from "../../contexts/User";

export const Login: React.FC = () => {
    const value = useContext(UserContext);
    console.log(UserContext, value);

    const [rightPanelActive, setRightPanelActive] = useState(false);
    return (
        <div className="login_page">
            <div
                className={`myContainer ${
                    rightPanelActive ? "right-panel-active" : ""
                }`}
                id="container"
            >
                <div className="form-container sign-up-container">
                    <Form action="#" type="signup"></Form>
                </div>
                <div className="form-container sign-in-container">
                    <Form action="#" type="signin"></Form>
                </div>
                <div className="overlay-container">
                    <Overlay
                        active={rightPanelActive}
                        setActive={setRightPanelActive}
                    ></Overlay>
                </div>
            </div>
        </div>
    );
};

export default Login;
// export default withLogger(Login);
