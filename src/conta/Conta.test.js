import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Conta from "./Conta";

describe("Component de conta", () => {
  it("O snapshot do component deve permanecer sempre o mesmo", () => {
    const { container } = render(<Conta saldo={20.0} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("Exibir o saldo da conta como valor monetário", () => {
    render(<Conta saldo={20.0} />);

    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toMatchSnapshot();
  });

  it("Chama a função de realizar transação quando o botão é clicado", () => {
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={20.0} realizarTransacao={funcaoRealizarTransacao} />);

    const transacao = screen.getByLabelText("Saque");
    const valor = screen.getByTestId("valor");

    fireEvent.click(transacao, { target: { value: "saque" } });
    fireEvent.change(valor, { target: { value: 10 } });

    fireEvent.click(screen.getByText("Realizar operação"));

    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });

  it("Não chama a função de realizar transação quando o botão é clicado", () => {
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={20.0} realizarTransacao={funcaoRealizarTransacao} />);

    fireEvent.click(screen.getByText("Realizar operação"));

    expect(funcaoRealizarTransacao).not.toHaveBeenCalled();
  });
});
