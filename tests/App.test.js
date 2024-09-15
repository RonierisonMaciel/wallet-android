import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

test('adicionar saldo e verificar transações', () => {
  const { getByPlaceholderText, getByText } = render(<App />);

  // Inserir saldo inicial
  const saldoInput = getByPlaceholderText('Saldo Inicial');
  fireEvent.changeText(saldoInput, '1000');
  fireEvent.press(getByText('Adicionar Saldo'));

  // Verificar que a tela foi para gastos
  expect(getByText('Adicionar Gastos')).toBeTruthy();

  // Inserir gasto
  const descricaoInput = getByPlaceholderText('Descrição do gasto');
  const valorInput = getByPlaceholderText('Valor do gasto');
  fireEvent.changeText(descricaoInput, 'Mercado');
  fireEvent.changeText(valorInput, '100');
  fireEvent.press(getByText('Adicionar Gasto'));

  // Verificar que o gasto foi inserido e o saldo foi atualizado
  fireEvent.press(getByText('Retornar ao Resumo'));
  expect(getByText('Média de Gastos: R$ 100.00')).toBeTruthy();
});
