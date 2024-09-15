import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AdicionarSaldo from './AdicionarSaldo';
import Header from './Header';

export default function ResumoGastos({ saldoAtual, transacoes, adicionarSaldo, limparCarteira, navigation }) {
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

  return (
    <View style={styles.container}>
      <Header title="Resumo da Carteira" />
      
      <View style={styles.contentContainer}>
        <Text style={styles.saldoText}>Saldo Atual: R$ {calcularSaldoRestante().toFixed(2)}</Text>
        <Text style={styles.mediaText}>Média dos Gastos: R$ {calcularMediaGastos().toFixed(2)}</Text>

        <AdicionarSaldo adicionarSaldo={adicionarSaldo} />

        {/* Botão para limpar a carteira */}
        <Button
          mode="contained"
          onPress={limparCarteira}
          style={styles.button}
        >
          Limpar Carteira
        </Button>
        
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
