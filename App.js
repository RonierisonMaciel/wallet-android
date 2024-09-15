import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdicionarGastos from './components/AdicionarGastos';
import ResumoGastos from './components/ResumoGastos';

const Stack = createStackNavigator();

export default function App() {
  const [saldoAtual, setSaldoAtual] = useState(0); // Saldo inicial
  const [transacoes, setTransacoes] = useState([]); // Lista de transações

  // Carrega os dados do AsyncStorage quando o app inicia
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const saldoSalvo = await AsyncStorage.getItem('@carteira_saldo');
        const transacoesSalvas = await AsyncStorage.getItem('@carteira_transacoes');

        if (saldoSalvo !== null) {
          setSaldoAtual(parseFloat(saldoSalvo));
        }
        if (transacoesSalvas !== null) {
          setTransacoes(JSON.parse(transacoesSalvas));
        }
      } catch (e) {
        console.log('Erro ao carregar dados do AsyncStorage', e);
      }
    };

    carregarDados();
  }, []);

  // Salva o saldo e as transações no AsyncStorage sempre que houver mudanças
  useEffect(() => {
    const salvarDados = async () => {
      try {
        await AsyncStorage.setItem('@carteira_saldo', saldoAtual.toString());
        await AsyncStorage.setItem('@carteira_transacoes', JSON.stringify(transacoes));
      } catch (e) {
        console.log('Erro ao salvar dados no AsyncStorage', e);
      }
    };

    salvarDados();
  }, [saldoAtual, transacoes]);

  // Função para adicionar saldo
  const adicionarSaldo = (valor) => {
    setSaldoAtual((prevSaldo) => prevSaldo + valor);
  };

  // Função para adicionar gastos
  const adicionarGasto = (descricao, valor) => {
    const novaTransacao = { descricao, valor, data: new Date() };
    setTransacoes([...transacoes, novaTransacao]);
  };

  // Função para limpar a carteira (saldo e transações)
  const limparCarteira = async () => {
    try {
      await AsyncStorage.removeItem('@carteira_saldo');
      await AsyncStorage.removeItem('@carteira_transacoes');
      setSaldoAtual(0); // Limpa o saldo
      setTransacoes([]); // Limpa as transações
    } catch (e) {
      console.log('Erro ao limpar a carteira do AsyncStorage', e);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ResumoGastos"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ResumoGastos">
          {(props) => (
            <ResumoGastos
              {...props}
              saldoAtual={saldoAtual}
              transacoes={transacoes}
              adicionarSaldo={adicionarSaldo}
              limparCarteira={limparCarteira} // Passando a função para limpar a carteira
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AdicionarGastos">
          {(props) => (
            <AdicionarGastos
              {...props}
              saldoAtual={saldoAtual}
              transacoes={transacoes}
              setTransacoes={setTransacoes}
              adicionarGasto={adicionarGasto}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
