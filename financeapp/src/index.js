import * as React from "react";
import ReactDOM, { createRoot } from 'react-dom/client'; // Importa de react-dom/client
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LancamentoDespesa } from "./app/tela_lancamento_despesa/LancamentoDespesa";
import { Home } from "./app/tela_home/Home";
import { Inicio } from "./app/tela_inicial/Inicio";
import Cadastro from "./app/tela_cadastro/cadastro";
import Login from "./app/tela_login/Login";


// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Home />
//     },
//     {
//         path: "LancamentoDespesa",
//         element: <LancamentoDespesa />
//     }
// ]);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Inicio />,

    },
    {
        path: "LancamentoDespesa",
        element: <LancamentoDespesa />
    },
    {
        path: "Home",
        element: <Home />
    },
    {
        path: "Login",
        element: <Login />
    },
    {
        path: "Cadastro",
        element: <Cadastro />
    },
    {
        path: "Inicio",
        element: <Inicio />
    }
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);