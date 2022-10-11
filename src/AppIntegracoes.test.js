import { render, screen } from "@testing-library/react";
import React from "react";
import api from "./api";
import App from "./App";

jest.mock("./api");

describe("Requisições para API", () => {
  it("Exibir lista de transações através da API", async () => {
    api.listaTransacoes.mockResolvedValue([
      {
        transacao: "deposito",
        valor: "1100",
        data: "05/10/2022",
        id: 28,
      },
      {
        transacao: "saque",
        valor: "100",
        data: "10/10/2022",
        id: 29,
      },
    ]);

    render(<App />);

    expect(await screen.findByText("saque")).toBeInTheDocument();

    expect(screen.getByTestId("transacoes").children.length).toBe(2);
  });
});
