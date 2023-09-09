import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './components/Header';
import Table from './components/Table';

const App: React.FC = () => {
  const year: number = 2023;
  const month: number = 9;
  return (
    <View style={styles.container}>
      <Header title={`${year}年${month}月`} />
      <Table year={year} month={month} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    display: 'flex',
  },
});

export default App;
