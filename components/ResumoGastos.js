import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdicionarSaldo from './AdicionarSaldo';
import Header from './Header';

export default function ResumoGastos({ saldoAtual, transacoes, adicionarSaldo, navigation }) {
  // Função para calcular a média de gastos
  const calcularMediaGastos = () => {
    if (transacoes.length === 0) return 0;
    const totalGastos = transacoes.reduce((acc, transacao) => acc + transacao.valor, 0);
    return totalGastos / transacoes.length;
  };

  // Função para calcular o saldo restante em tempo real
  const calcularSaldoRestante = () => {
    const totalGastos = transacoes.reduce((acc, transacao) => acc + transacao.valor, 0);
    return saldoAtual - totalGastos;
  };

  // Função para formatar os valores monetários no estilo brasileiro
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const handleAdicionarSaldo = (valor) => {
    adicionarSaldo(valor);
  };

  return (
    <View style={styles.container}>
      <Header title="Resumo da carteira" />

      <View style={styles.contentContainer}>
        <Text style={styles.saldoText}>Saldo atual: {formatarMoeda(calcularSaldoRestante())}</Text>
        <Text style={styles.mediaText}>Média dos gastos: {formatarMoeda(calcularMediaGastos())}</Text>

        <AdicionarSaldo adicionarSaldo={handleAdicionarSaldo} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  saldoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  mediaText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#333',
  },
});
