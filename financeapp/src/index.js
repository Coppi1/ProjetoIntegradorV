import * as React from "react";
import { createRoot } from "react-dom/client"; // Importa de react-dom/client
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LancamentoDespesa } from "./app/tela_lancamento_despesa/LancamentoDespesa";
import { Home } from "./app/tela_home/Home";
import { Inicio } from "./app/tela_inicial/Inicio";
import Cadastro from "./app/tela_cadastro/cadastro";
import Login from "./app/tela_login/Login";
import { LancamentoReceita } from "./app/tela_lancamento_receita/LancamentoReceita";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "LancamentoDespesa",
    element: <LancamentoDespesa />,
  },
  {
    path: "LancamentoReceita",
    element: <LancamentoReceita />,
  },
  {
    path: "Home",
    element: <Home />,
  },
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "Cadastro",
    element: <Cadastro />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
