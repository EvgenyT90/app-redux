import React, { useEffect, useState, useContext } from "react";
import "./styles.css";
import { InputText } from "../input-text";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { SocialContainer } from "../social-container";
import { useForm } from "react-hook-form";
import { UserContext } from "../../contexts/User.jsx";
import "../../i18n/config";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "../toggleswitch";

export const Form = ({
    action = "#",
    type = "signin",
}: {
    action: string;
    type: string;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
    } = useForm();

    let content: JSX.Element;

    const [userName, setUserName] = useState<string>("");
    const [userPass1, setUserPass1] = useState<string>("");
    const [userPass2, setUserPass2] = useState<string>("");
    const [isPassError, setPassError] = useState<boolean>(false);
    const [isPassError2, setPassError2] = useState<boolean>(false);
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isLoginError, setLoginError] = useState<boolean>(false);
    const navigate = useNavigate();

    const { setUsername } = useContext(UserContext);
    const { username } = useContext(UserContext);

    const { i18n } = useTranslation();
    const changeLanguage = (e: any) => {
        i18n.changeLanguage(e.target.value);
    };

    const handleChangePass1 = (event: any) => {
        setUserPass1(event.target.value);
    };

    const handleChangePass2 = (event: any) => {
        setUserPass2(event.target.value);
    };

    const handleChangeLogin = (e: any) => {
        const user = e.target.value;
        setUserName(user);
        localStorage.setItem("UserName", user);
        console.log(user);
    };

    //Загрузка имени пользователя в locaTgorage бриазуре
    useEffect(() => {
        const user = localStorage.getItem("UserName") || "";
        setUserName(user);
    }, []);

    useEffect(() => {});

    const handleClickSignIn = (data: any) => {
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
            //localStorage.setItem("auth", "true");
            setUsername(data.email);

            navigate("/");
        });
    };

    const handleClickSignUp = (data: any) => {
        console.log(data);
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
                name: data.login,
                password: data.password,
                email: data.email,
            }),
        }).then((response) => {
            if (response.ok) {
                navigate("/");
            }
        });
    };

    switch (type) {
        case "signin":
            content = (
                <form action="#" onSubmit={handleSubmit(handleClickSignIn)}>
                    <h1>{i18n.t("signin")}</h1>
                    <SocialContainer />
                    <span>или используйте Ваш аккаунт</span>
                    <InputText
                        type="email"
                        className1={`InputText ${
                            errors.email
                                ? "input--error"
                                : isValid
                                ? "input--success"
                                : ""
                        }`}
                        placeholder="Введите Email"
                        inputLabel="email"
                        register={register}
                        rules={{
                            required: true,
                            pattern:
                                /^([a-zA-Z0-9_-]+)(@)([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,})$/,
                        }}
                        onChange={handleChangeLogin}
                    />
                    {errors.email && errors.email.type === "pattern" && (
                        <div style={{ color: "red", fontSize: "0.7em" }}>
                            Почтовый адрес не соответвует виду
                            exapmle@company.com
                        </div>
                    )}
                    <InputText
                        type="password"
                        className1={`InputText ${
                            errors.password
                                ? "input--error"
                                : isValid
                                ? "input--success"
                                : ""
                        }`}
                        placeholder="Введите пароль"
                        inputLabel="password"
                        register={register}
                        rules={{
                            required: true,
                            pattern: /(?=.*[0-9])(?=.*[\_\-*])(?=.*[a-z])/,
                            onChange: (event: any) => handleChangePass1(event),
                        }}
                    />

                    {errors.password && errors.password.type === "required" && (
                        <div style={{ color: "red", fontSize: "0.7em" }}>
                            Необходимо ввести пароль
                        </div>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                        <div style={{ color: "red", fontSize: "0.7em" }}>
                            Пароль может содержать только английские символы +
                            спец символы (_ , - , *)
                        </div>
                    )}
                    <a href="#">Забыли пароль</a>
                    <Button type="submit" text="Вход" />
                    <ToggleSwitch />
                    <button onClick={changeLanguage} value="ru">
                        Русский язык
                    </button>
                    <button onClick={changeLanguage} value="en">
                        English
                    </button>
                </form>
            );
            break;
        case "signup":
            content = (
                <form
                    action={action}
                    onSubmit={handleSubmit(handleClickSignUp)}
                >
                    <h1>{i18n.t("createUser")}</h1>
                    <SocialContainer />
                    <span>или используйте Ваше e-mail для регистрации</span>
                    <InputText
                        className1={`InputText ${
                            errors.login
                                ? "input--error"
                                : isValid
                                ? "input--success"
                                : ""
                        }`}
                        type="text"
                        placeholder="Введите логин"
                        inputLabel="login"
                        register={register}
                        rules={{
                            required: true,
                            minLength: 5,
                            maxLength: 20,
                            pattern: /^([a-zA-Z0-9]+)$/,
                        }}
                    />
                    {errors.login && errors.login.type === "minLength" && (
                        <div style={{ color: "red", fontSize: "0.7em" }}>
                            Минимальная длина логина 5 символа
                        </div>
                    )}
                    {errors.login && errors.login.type === "maxLength" && (
                        <div style={{ color: "red", fontSize: "0.7em" }}>
                            Минимальная длина логина 20 символа
                        </div>
                    )}
                    {errors.login && errors.login.type === "pattern" && (
                        <div style={{ color: "red", fontSize: "0.7em" }}>
                            Логин может содержать только английские символы и
                            цифры
                        </div>
                    )}
                    <InputText
                        type="email"
                        className1={`InputText ${
                            errors.email
                                ? "input--error"
                                : isValid
                                ? "input--success"
                                : ""
                        }`}
                        placeholder="Введите Email"
                        inputLabel="email"
                        register={register}
                        rules={{
                            required: true,
                            pattern:
                                /^([a-zA-Z0-9_-]+)(@)([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,})$/,
                        }}
                        onChange={handleChangeLogin}
                    />
                    {errors.email && errors.email.type === "pattern" && (
                        <div style={{ color: "red", fontSize: "0.7em" }}>
                            Почтовый адрес не соответвует виду
                            exapmle@company.com
                        </div>
                    )}
                    <InputText
                        type="password"
                        className1={`InputText ${
                            errors.password
                                ? "input--error"
                                : isValid
                                ? "input--success"
                                : ""
                        }`}
                        placeholder="Введите пароль"
                        inputLabel="password"
                        register={register}
                        rules={{
                            required: true,
                            pattern: /(?=.*[0-9])(?=.*[\_\-*])(?=.*[a-z])/,
                            onChange: (event: any) => handleChangePass1(event),
                        }}
                    />

                    {errors.password && errors.password.type === "required" && (
                        <div style={{ color: "red", fontSize: "0.7em" }}>
                            Необходимо ввести пароль
                        </div>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                        <div style={{ color: "red", fontSize: "0.7em" }}>
                            Пароль может содержать только английские символы +
                            спец символы (_ , - , *)
                        </div>
                    )}
                    <InputText
                        type="password"
                        className1={`InputText ${
                            errors.password2
                                ? "input--error"
                                : isValid
                                ? "input--success"
                                : ""
                        }`}
                        inputLabel="password2"
                        register={register}
                        rules={{
                            required: true,
                            pattern: /(?=.*[0-9])(?=.*[\_\-*])(?=.*[a-z])/,
                            validate: (value: any) =>
                                value === getValues("password"),
                            onChange: (event: any) => handleChangePass2(event),
                        }}
                        placeholder="Пвоторите ввод пароля"
                    />

                    {errors.password2 &&
                        errors.password2.type === "required" && (
                            <div style={{ color: "red", fontSize: "0.7em" }}>
                                Необходимо ввести пароль еще раз
                            </div>
                        )}
                    {errors.password2 &&
                        errors.password2.type === "pattern" && (
                            <div style={{ color: "red", fontSize: "0.7em" }}>
                                Пароль может содержать только английские символы
                                + спец символы (_ , - , *)
                            </div>
                        )}
                    {errors.password2 &&
                        errors.password2.type === "validate" && (
                            <div style={{ color: "red", fontSize: "0.7em" }}>
                                Пароли не совпадают
                            </div>
                        )}
                    <Button type="submit" text="Регистрация" />
                </form>
            );
            break;
    }

    return content!;
};
