import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../App';
import Header from '../components/Header';
import Table from '../components/Table';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Calender'>;

const Calender: React.FC<Props> = ({navigation}) => {
  //次の画面へ
  function Tap() {
    //Propsを渡しながら画面遷移
    navigation.navigate('Events');
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

export default Calender;
