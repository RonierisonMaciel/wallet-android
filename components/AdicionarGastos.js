import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa ícones do MaterialIcons
import Header from './Header';

export default function AdicionarGastos({ transacoes, setTransacoes, adicionarGasto, saldoAtual }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(null);

  // Função para calcular o saldo restante
  const calcularSaldoRestante = () => {
    const totalGastos = transacoes.reduce((acc, transacao) => acc + transacao.valor, 0);
    return saldoAtual - totalGastos;
  };

  // Função para adicionar um novo gasto
  const handleAdicionarGasto = () => {
    const saldoRestante = calcularSaldoRestante();

    if (!descricao || valor === null) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Verifica se o gasto ultrapassa o saldo disponível
    if (valor > saldoRestante) {
      Alert.alert(
        'Atenção',
        `Saldo insuficiente! Saldo disponível: R$ ${Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(saldoRestante)}. Você não pode adicionar este gasto.`,
        [{ text: 'OK' }]
      );
      return; 
    }

    // Adiciona o gasto
    adicionarGasto(descricao, valor);
    setDescricao('');
    setValor(null);
  };

  // Função para remover um gasto
  const removerGasto = (index) => {
    Alert.alert(
      'Remover gasto',
      'Você tem certeza que deseja remover este gasto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => {
            const novosGastos = [...transacoes];
            novosGastos.splice(index, 1);
            setTransacoes(novosGastos);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Adicionar gastos" />
      <TextInput
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <CurrencyInput
        value={valor}
        onChangeValue={setValor}
        style={styles.input}
        placeholder="Valor do gasto"
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        keyboardType="numeric"
      />

      <Button
        mode="contained"
        onPress={handleAdicionarGasto}
        style={styles.button}
        icon={() => <Icon name="add-circle-outline" size={20} color="#fff" />} // Ícone Adicionar Gasto
      >
        Adicionar gasto
      </Button>

      <FlatList
        data={transacoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.transacao}>
            <Text>{item.descricao}: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}</Text>
            <View style={styles.transacaoActions}>
              <TouchableOpacity onPress={() => removerGasto(index)} style={styles.actionButton}>
                <Text style={styles.actionText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginHorizontal: 30,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#333',
    marginHorizontal: 20,
    width: 200, // Ajusta a largura do botão
    alignSelf: 'center', // Centraliza o botão
    paddingVertical: 5,
  },
  transacao: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
  },
  transacaoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  actionButton: {
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 5,
  },
  actionText: {
    color: 'blue',
  },
});
