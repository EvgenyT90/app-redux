import React, { useEffect, useState } from "react";
import "./styles.css";
import { InputText } from "../input-text";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { SocialContainer } from "../social-container";

export const Form = ({
    action = "#",
    type = "signin",
}: {
    action: string;
    type: string;
}) => {
    let content: JSX.Element;

    const [userName, setUserName] = useState<string>("");
    const [userPass1, setUserPass1] = useState<string>("");
    const [userPass2, setUserPass2] = useState<string>("");
    const [isPassError, setPassError] = useState<boolean>(false);
    const [isPassError2, setPassError2] = useState<boolean>(false);
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isLoginError, setLoginError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChangePass1 = (event: any) => {
        if (event.target.value.match(/^[a-z]+$/)) {
            setUserPass1(event.target.value);
            setPassError2(false);
        } else {
            setPassError2(true);
        }
    };

    const handleChangePass2 = (event: any) => {
        console.log("до======", userPass2);

        if (userPass1 !== event.target.value) {
            setPassError(true);
        } else {
            setPassError(false);
        }
        setUserPass2(event.target.value);
    };

    const handleChangeLogin = (e: any) => {
        if (
            e.target.value.match(
                /^([a-zA-Z0-9_-]+)(@)([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,})$/,
            )
        ) {
            const user = e.target.value;
            setUserName(user);
            localStorage.setItem("UserName", user);
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };

    //Загрузка имени пользователя в locaTgorage бриазуре
    useEffect(() => {
        const user = localStorage.getItem("UserName") || "";
        setUserName(user);
    }, []);

    useEffect(() => {});

    const handleClickSignIn = () => {
        fetch("http://localhost:4040/user", {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                //"Access-Control-Allow-Origin": "*",
                //"Access-Control-Allow-Headers" "X-Requested-With"
            },
            //make sure to serialize your JSON body
            // body: JSON.stringify({
            //     name: userName,
            //     password: userName,
            //     email: userName,
            // }),
        }).then((response) => {
            localStorage.setItem("auth", "true");
            navigate("/");
        });
    };

    const handleClickSignUp = () => {
        fetch("http://localhost:4040/login", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                //"Access-Control-Allow-Origin": "*",
                //"Access-Control-Allow-Headers" "X-Requested-With"
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                name: userName,
                password: userName,
                email: userName,
            }),
        }).then((response) => {
            //localStorage.setItem("auth", "true");
        });
    };

    switch (type) {
        case "signin":
            content = (
                <form action="#">
                    <h1>Вход</h1>
                    <SocialContainer />
                    <span>или используйте Ваш аккаунт</span>
                    <InputText
                        type="email"
                        placeholder="Email"
                        onChange={handleChangeLogin}
                        value={userName}
                    />
                    {isEmailError && (
                        <div style={{ color: "red" }}>Не валидный email</div>
                    )}
                    <InputText
                        type="password"
                        placeholder="Password"
                        onChange={(event: any) => handleChangePass1(event)}
                    />
                    {isPassError2 && (
                        <div style={{ color: "red" }}>Только англ символы</div>
                    )}
                    <a href="#">Забыли пароль</a>
                    <Button OnClick={handleClickSignIn} text="Вход" />
                    {/* <Button type="primary">Вход</Button> */}
                </form>
            );
            break;
        case "signup":
            content = (
                <form action={action}>
                    <h1>Создайте пользователя</h1>
                    <SocialContainer />
                    <span>или используйте Ваше e-mail для регистрации</span>
                    <InputText type="text" placeholder="Введите логин" />
                    {isLoginError && (
                        <div style={{ color: "red" }}>
                            Только цифры или англ буквы
                        </div>
                    )}
                    <InputText
                        type="email"
                        placeholder="Введите Email"
                        onChange={handleChangeLogin}
                    />
                    {isEmailError && (
                        <div style={{ color: "red" }}>Не валидный email</div>
                    )}
                    <InputText
                        type="password"
                        placeholder="Введите пароль"
                        onChange={(event: any) => handleChangePass1(event)}
                    />
                    {isPassError2 && (
                        <div style={{ color: "red" }}>Только англ символы</div>
                    )}
                    <InputText
                        type="password"
                        placeholder="Пвоторите ввод пароля"
                        onChange={(event: any) => handleChangePass2(event)}
                    />
                    {isPassError && (
                        <div style={{ color: "red" }}>Пароли не совпадают</div>
                    )}
                    <Button OnClick={handleClickSignUp} text="Регистрация" />
                    {/* <Button type="primary">Регистрация</Button> */}
                </form>
            );
            break;
    }

    return content!;
};
