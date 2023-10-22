import React, { useEffect, useState } from "react";
import "./styles.css";
import { InputText } from "../input-text";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { SocialContainer } from "../social-container";
import { useForm } from "react-hook-form";

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
        formState: { errors },
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
            localStorage.setItem("auth", "true");
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
                    <h1>Вход</h1>
                    <SocialContainer />
                    <span>или используйте Ваш аккаунт</span>
                    <InputText
                        type="email"
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
                        <div style={{ color: "red" }}>
                            Почтовый адрес не соответвует виду
                            exapmle@company.com
                        </div>
                    )}
                    <InputText
                        type="password"
                        placeholder="Введите пароль"
                        inputLabel="password"
                        register={register}
                        rules={{
                            required: true,
                            pattern: /(?=.*[0-9])(?=.*[\_\-*])(?=.*[a-z])/,
                            onChange: (event: any) => handleChangePass1(event),
                        }}
                    />
                    {isPassError2 && (
                        <div style={{ color: "red" }}>Только англ символы</div>
                    )}
                    {errors.password && errors.password.type === "required" && (
                        <div style={{ color: "red" }}>
                            Необходимо ввести пароль
                        </div>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                        <div style={{ color: "red" }}>
                            Пароль может содержать только английские символы +
                            спец символы (_ , - , *)
                        </div>
                    )}
                    <a href="#">Забыли пароль</a>
                    <Button type="submit" text="Вход" />
                </form>
            );
            break;
        case "signup":
            content = (
                <form
                    action={action}
                    onSubmit={handleSubmit(handleClickSignUp)}
                >
                    <h1>Создайте пользователя</h1>
                    <SocialContainer />
                    <span>или используйте Ваше e-mail для регистрации</span>
                    <InputText
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
                        <div style={{ color: "red" }}>
                            Минимальная длина логина 5 символа
                        </div>
                    )}
                    {errors.login && errors.login.type === "maxLength" && (
                        <div style={{ color: "red" }}>
                            Минимальная длина логина 20 символа
                        </div>
                    )}
                    {errors.login && errors.login.type === "pattern" && (
                        <div style={{ color: "red" }}>
                            Логин может содержать только английские символы и
                            цифры
                        </div>
                    )}
                    <InputText
                        type="email"
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
                        <div style={{ color: "red" }}>
                            Почтовый адрес не соответвует виду
                            exapmle@company.com
                        </div>
                    )}
                    <InputText
                        type="password"
                        placeholder="Введите пароль"
                        inputLabel="password"
                        register={register}
                        rules={{
                            required: true,
                            pattern: /(?=.*[0-9])(?=.*[\_\-*])(?=.*[a-z])/,
                            onChange: (event: any) => handleChangePass1(event),
                        }}
                    />
                    {isPassError2 && (
                        <div style={{ color: "red" }}>Только англ символы</div>
                    )}
                    {errors.password && errors.password.type === "required" && (
                        <div style={{ color: "red" }}>
                            Необходимо ввести пароль
                        </div>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                        <div style={{ color: "red" }}>
                            Пароль может содержать только английские символы +
                            спец символы (_ , - , *)
                        </div>
                    )}
                    <InputText
                        type="password"
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
                    {isPassError && (
                        <div style={{ color: "red" }}>Пароли не совпадают</div>
                    )}
                    {errors.password2 &&
                        errors.password2.type === "required" && (
                            <div style={{ color: "red" }}>
                                Необходимо ввести пароль еще раз
                            </div>
                        )}
                    {errors.password2 &&
                        errors.password2.type === "pattern" && (
                            <div style={{ color: "red" }}>
                                Пароль может содержать только английские символы
                                + спец символы (_ , - , *)
                            </div>
                        )}
                    {errors.password2 &&
                        errors.password2.type === "validate" && (
                            <div style={{ color: "red" }}>
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
