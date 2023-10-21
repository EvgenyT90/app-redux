import React from "react";
import "./App.css";
import { UserContext } from "./contexts/User";
//import { Counter } from "./pages/test/ex1";
import { NavLink, Link, Routes, Route } from "react-router-dom";
import { Login, About, Contacts, EventsCatalog, Main, NotFound } from "./pages";
import { RequireAuth } from "./hocs/requireAuth";
import "bootstrap/dist/css/bootstrap.min.css";

import { ROUTES } from "./data/routers";

const User: any = {
    role: "user",
    name: "",
};

function App() {
    return (
        // <UserContext.Provider value={User}>
        <Routes>
            <Route
                path={ROUTES.main}
                element={
                    <RequireAuth>
                        <Main />
                    </RequireAuth>
                }
            />

            <Route
                path={ROUTES.catalog}
                element={
                    <RequireAuth>
                        <EventsCatalog />
                    </RequireAuth>
                }
            />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.contacts} element={<Contacts />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        // </UserContext.Provider>
    );
}

export default App;

{
    /* <div className="App">
<header className="App-header"></header>
<div>logo</div>
<nav>
    <ul>
        <li>
            <NavLink
                to={ROUTES.main}
                style={({ isActive }) => ({
                    color: isActive ? "green" : "blue",
                })}
            >
                Главная
            </NavLink>
        </li>
        <li>
            <NavLink
                to={ROUTES.catalog}
                style={({ isActive }) => ({
                    color: isActive ? "green" : "blue",
                })}
            >
                Каталог событий
            </NavLink>
        </li>
        <li>
            <NavLink
                to={ROUTES.about}
                style={({ isActive }) => ({
                    color: isActive ? "green" : "blue",
                })}
            >
                О проекта
            </NavLink>
        </li>
        <li>
            <NavLink
                to={ROUTES.contacts}
                style={({ isActive }) => ({
                    color: isActive ? "green" : "blue",
                })}
            >
                Контакты
            </NavLink>
        </li>
        {/* <li>
            <NavLink
                to={ROUTES.login}
                style={({ isActive }) => ({
                    color: isActive ? "green" : "blue",
                })}
            >
                Вход
            </NavLink>
        </li> 
    </ul>
</nav>
<div>
    <span>login/logoute</span>
    <span>IconUser</span>
</div>
<main>
    <div className="rootStyle">
        <UserContext.Provider value={User}>
            <Routes>
                <Route path={ROUTES.main} element={<Main />} />

                <Route
                    path={ROUTES.catalog}
                    element={
                        <RequireAuth>
                            <EventsCatalog />
                        </RequireAuth>
                    }
                />
                <Route path={ROUTES.about} element={<About />} />
                <Route
                    path={ROUTES.contacts}
                    element={<Contacts />}
                />
                <Route path={ROUTES.login} element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserContext.Provider>
    </div>
</main>

<ul>
    <li>
        <Link to={ROUTES.main}>Главная</Link>
    </li>
    <li>
        <Link to={ROUTES.catalog}>Каталог событий</Link>
    </li>
    <li>
        <Link to={ROUTES.about}>О проекта</Link>
    </li>
    <li>
        <Link to={ROUTES.contacts}>Контактыа</Link>
    </li>
</ul>
</div> */
}

/*
{ <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> }*/
