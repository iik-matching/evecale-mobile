import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {RootStackParamList} from '../../App';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const cellTap = () => {
    // 画面遷移
    navigation.navigate('Filter');
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={cellTap}>
        <Text>設定を開く</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Header;
