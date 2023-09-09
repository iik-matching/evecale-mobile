import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../App';
import Header from './Header';
import Table from './Table';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation}) => {
  //次の画面へ
  function Tap() {
    //Propsを渡しながら画面遷移
    navigation.navigate('Page1');
  }

  const year: number = 2023;
  const month: number = 9;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`${year}年${month}月`} />
      <Table year={year} month={month} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    display: 'flex',
  },
});

export default Home;
