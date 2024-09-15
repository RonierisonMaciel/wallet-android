import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AdicionarSaldo from './AdicionarSaldo';
import Header from './Header';
import { FontAwesome } from '@expo/vector-icons';

export default function ResumoGastos({ saldoAtual, transacoes, adicionarSaldo, limparCarteira, navigation }) {
  const [isCarteiraLimpa, setIsCarteiraLimpa] = useState(false); // Adiciona controle de limpeza de carteira

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  const calcularMediaGastos = () => {
    if (transacoes.length === 0) return 0;
    const totalGastos = transacoes.reduce((acc, transacao) => acc + transacao.valor, 0);
    return totalGastos / transacoes.length;
  };

  const calcularSaldoRestante = () => {
    const totalGastos = transacoes.reduce((acc, transacao) => acc + transacao.valor, 0);
    return saldoAtual - totalGastos;
  };

  const saldoRestante = calcularSaldoRestante();

  const handleLimparCarteira = () => {
    limparCarteira(); // Limpa o saldo e as transações
    setIsCarteiraLimpa(true); // Atualiza o estado para indicar que a carteira foi limpa
  };

  return (
    <View style={styles.container}>
      <Header title="Resumo da carteira" />

      <View style={styles.contentContainer}>
        {/* Saldo Atual e Média dos Gastos */}
        <Text style={styles.saldoText}>Saldo atual: {formatter.format(saldoRestante)}</Text>
        <Text style={styles.mediaText}>Média dos gastos: {formatter.format(calcularMediaGastos())}</Text>

        {/* Campo para adicionar saldo */}
        <AdicionarSaldo adicionarSaldo={adicionarSaldo} saldoAtual={saldoAtual} isCarteiraLimpa={isCarteiraLimpa} />

        {/* Botões organizados lado a lado */}
        <View style={styles.buttonRow}>
          {/* Botão para Gastos */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AdicionarGastos')}
            style={styles.gastosButton}
            icon={() => <FontAwesome name="shopping-cart" size={20} color="#fff" />}
          >
            Gastos
          </Button>

          {/* Botão para Limpar Carteira (habilitado/desabilitado com base no saldo) */}
          <Button
            mode="contained"
            onPress={handleLimparCarteira}
            disabled={saldoRestante <= 0} // Desabilita o botão se o saldo for 0 ou negativo
            style={saldoRestante > 0 ? styles.limparButton : styles.limparButtonDisabled} // Estilo baseado no estado
            icon={() => <FontAwesome name="trash" size={20} color="#fff" />}
          >
            Limpar
          </Button>
        </View>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  gastosButton: {
    backgroundColor: '#1E88E5',
    marginHorizontal: 10,
  },
  limparButton: {
    backgroundColor: '#E53935',
    marginHorizontal: 10,
  },
  limparButtonDisabled: {
    backgroundColor: '#E53935',
    opacity: 0.5,
    marginHorizontal: 10,
  },
});
