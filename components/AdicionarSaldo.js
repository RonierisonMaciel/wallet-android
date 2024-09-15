import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AdicionarSaldo({ adicionarSaldo, saldoAtual, isCarteiraLimpa }) {
  const [saldo, setSaldo] = useState(null);
  const [isSaldoInicializado, setIsSaldoInicializado] = useState(false);

  useEffect(() => {
    if (saldoAtual > 0) {
      setIsSaldoInicializado(true);
    } else if (isCarteiraLimpa) {
      // Se a carteira for limpa, resetamos o estado
      setIsSaldoInicializado(false);
    }
  }, [saldoAtual, isCarteiraLimpa]);

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
        placeholderTextColor="#696969"
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
        {isSaldoInicializado ? "Atualizar" : "Adicionar"}
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
    paddingHorizontal: 15,
  },
});
