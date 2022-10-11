import { render } from "@testing-library/react";
import React from "react";
import Transacoes from "./Transacoes";

describe("Component de transações do extrato", () => {
  it("O snapshot do component deve permanecer sempre o mesmo", () => {
    const { container } = render(
      <Transacoes
        transacoes={[{ data: "10/10/2022", tipo: "deposito", valor: "100.00" }]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
