import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import Header from '../components/Header';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Events'>;

const Events: React.FC<Props> = ({route, navigation}) => {
  const {dateInfo} = route.params;

  //次の画面へ
  function Tap() {
    //Propsを渡しながら画面遷移
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`${dateInfo.year}年${dateInfo.month}月${dateInfo.day}日`}
      />
      <Text style={styles.greeting}>ELLEGARDEN</Text>
      <Text style={styles.greeting}>One Ok Rock</Text>
      <Button title="カレンダーに戻る" onPress={Tap} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    display: 'flex',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'red',
  },
});

export default Events;
