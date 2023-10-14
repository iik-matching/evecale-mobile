import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {DateInfo} from '../type';

const Cell: React.FC<DateInfo> = dateInfo => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const cellTap = () => {
    console.log(
      `セルがタップされました。${dateInfo.year}年${dateInfo.month}月${dateInfo.day}日`,
    );
    // 画面遷移
    navigation.navigate('Events', {
      dateInfo: dateInfo,
    });
  };

  const currentDate = new Date();
  const isToday =
    dateInfo.year === currentDate.getFullYear() &&
    dateInfo.month === currentDate.getMonth() + 1 && // 注意: JavaScriptのgetMonth()は0から始まる
    dateInfo.day === currentDate.getDate();
  const textDayStyle = isToday ? styles.textDayRed : styles.textDayGreen;
  return (
    <View style={styles.cell}>
      <Text style={textDayStyle}>{`${dateInfo.day}`}</Text>
      <TouchableOpacity style={styles.viewCell} onPress={() => cellTap()}>
        <View style={styles.row}>
          <Text style={styles.textRow} numberOfLines={1} ellipsizeMode="clip">
            ELLEGARDEN
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textRow} numberOfLines={1} ellipsizeMode="clip">
            oneokRock
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textRow} numberOfLines={1} ellipsizeMode="clip">
            uverworld
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    margin: 3,
    borderWidth: 1,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  textDayGreen: {
    backgroundColor: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textDayRed: {
    backgroundColor: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  viewCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  row: {
    backgroundColor: 'yellow',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 1,
  },
  textRow: {
    paddingHorizontal: 3,
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default Cell;
