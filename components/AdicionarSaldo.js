import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Importa o hook

export default function AdicionarSaldo({ adicionarSaldo, saldoAtual }) {
  const [saldo, setSaldo] = useState(null);
  const [isSaldoInicializado, setIsSaldoInicializado] = useState(false);
  
  const navigation = useNavigation(); // Usa o hook para obter o objeto de navegação

  useEffect(() => {
    if (saldoAtual > 0) {
      setIsSaldoInicializado(true);
    }
  }, [saldoAtual]);

  const handleAdicionarSaldo = () => {
    if (saldo !== null) {
      adicionarSaldo(saldo);
      setSaldo(null);
      setIsSaldoInicializado(true);
    }
  };

  return (
    <View style={styles.container}>
      <CurrencyInput
        value={saldo}
        onChangeValue={setSaldo}
        style={styles.input}
        placeholder="Digite o valor do saldo"
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        keyboardType="numeric"
      />

      <Button
        mode="contained"
        onPress={handleAdicionarSaldo}
        style={styles.button}
        icon={() => <Icon name="attach-money" size={20} color="#fff" />}
      >
        {isSaldoInicializado ? "Atualizar saldo" : "Adicionar saldo"}
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('AdicionarGastos')} // Use o hook para navegação
        style={styles.gastosButton}
        icon={() => <Icon name="shopping-cart" size={20} color="#fff" />}
      >
        Gastos
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    width: 250,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#333',
    paddingHorizontal: 20,
  },
  gastosButton: {
    marginVertical: 10,
    backgroundColor: '#1E88E5',
    paddingHorizontal: 20,
  },
});
