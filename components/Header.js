import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%', // Ocupa 100% da largura da tela
    height: Platform.OS === 'ios' ? 100 : 120, // Altura consistente para iOS e Android
    backgroundColor: '#1E88E5',  // Cor do header
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10, // Espaço abaixo do título para melhor centralização
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Ajuste para Android
    marginHorizontal: 0, // Remove qualquer margem lateral
  },
  headerText: {
    color: '#fff',
    fontSize: 26, // Tamanho maior da fonte para visibilidade
    fontWeight: 'bold',
  },
});
