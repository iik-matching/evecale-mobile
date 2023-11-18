import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import Header from '../components/Header';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;

const Filter: React.FC<Props> = ({route, navigation}) => {
  //次の画面へ
  function Tap() {
    //Propsを渡しながら画面遷移
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`setting`} />
      <Text style={styles.greeting}>
        この画面では検索ボックスなどを駆使して、 filteringできます。
      </Text>
      <Button title="カレンダーに戻る" onPress={Tap} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'red',
  },
});

export default Filter;
