import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {EventData} from '../type';

export type CellProps = {
  year: number;
  month: number;
  day: number;
  events: EventData[];
};

const Cell: React.FC<CellProps> = ({year, month, day, events}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const cellTap = () => {
    console.log(`セルがタップされました。${year}年${month}月${day}日`);
    // 画面遷移
    navigation.navigate('Events', {
      year: year,
      month: month,
      day: day,
    });
  };

  // 今日だったら赤くする
  const currentDate = new Date();
  const isToday =
    year === currentDate.getFullYear() &&
    month === currentDate.getMonth() + 1 && // 注意: JavaScriptのgetMonth()は0から始まる
    day === currentDate.getDate();
  const textDayStyle = isToday ? styles.textDayRed : styles.textDayGreen;

  return (
    <View style={styles.cell}>
      <Text style={textDayStyle}>{`${day}`}</Text>
      <TouchableOpacity style={styles.viewCell} onPress={() => cellTap()}>
        {events
          .filter(event => {
            const eventDate = new Date(event.event_date); // event.start_dateがDate型であると仮定
            return (
              eventDate.getFullYear() === year &&
              eventDate.getMonth() === month - 1 && // JavaScriptの月は0-11なので、1を引きます。
              eventDate.getDate() === day
            );
          })
          .map(event => (
            <View key={event.id} style={styles.row}>
              <Text
                style={styles.textRow}
                numberOfLines={1}
                ellipsizeMode="clip">
                {event.title}
              </Text>
            </View>
          ))}
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
    overflow: 'hidden',
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
