import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Cell from './Cell';
import {getDaysInMonth, getFirstDayOfMonth} from '../tools';
import Header from './Header';
import {EventData} from '../type';

interface CalendarProps {
  year: number;
  month: number;
}

const CalendarView: React.FC<CalendarProps> = ({year, month}) => {
  // 先月は何日までか
  const MonthDaysBefore = getDaysInMonth(year, month - 1);
  // 今月は何日までか
  const MonthDaysCurrent = getDaysInMonth(year, month);
  // 今月が何曜日からスタートかを 月曜０ で取得
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  // 表示する週の数
  const CountWeeksDisplay = 6;

  const [events, setEvents] = useState<EventData[]>([]);

  async function fetchEvents() {
    try {
      console.log('リクエスト');

      const response = await fetch(
        'http://192.168.3.10:3000/api/event-get?year=2023&month=9',
      );

      if (response.ok) {
        console.log('リクエストOK');
        console.log(response);
        const data: EventData[] = await response.json();
        setEvents(data);
        // console.log(data.length);
        // console.log(`id: ${data[0].id}`);
        // console.log(`title: ${data[0].title}`);
        // console.log(`event_date: ${new Date(data[0].event_date).getMonth()}`);
        // console.log(`place: ${data[0].place}`);
        // console.log(`open_time: ${data[0].open_time}`);
        // console.log(`start_time: ${data[0].start_time}`);
        // console.log(`end_time: ${data[0].end_time}`);
      } else {
        throw new Error('Network response was not ok ' + response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  useEffect(
    React.useCallback(() => {
      console.log(`カレンダーコンポーネント表示 ${year} ${month}`);
      console.log(`先月は何日までか ${MonthDaysBefore}`);
      console.log(`今月は何日までか ${MonthDaysCurrent}`);
      console.log(
        `今月が何曜日からスタートかを 月曜０ で取得 ${firstDayOfMonth}`,
      );

      // 関数の引数としてデータをとる
      // node.jsでDBのモックを作る
      // fetchEvents();

      return () => {};
    }, []),
  );

  // カウンタ
  let counterA = 1 - firstDayOfMonth;
  let counterB = 1;

  return (
    <View style={styles.calender}>
      <Header title={`${year}年${month}月`} />
      <View style={styles.rowYoubi}>
        <Text style={styles.cellYoubi}>月</Text>
        <Text style={styles.cellYoubi}>火</Text>
        <Text style={styles.cellYoubi}>水</Text>
        <Text style={styles.cellYoubi}>木</Text>
        <Text style={styles.cellYoubi}>金</Text>
        <Text style={styles.cellYoubi}>土</Text>
        <Text style={styles.cellYoubi}>日</Text>
      </View>
      {Array.from({length: CountWeeksDisplay}).map((_, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {Array.from({length: 7}).map((_, colIndex) => {
            // 先月分を表示する場合
            if (counterA <= 0) {
              return (
                <Cell
                  year={year}
                  month={month}
                  day={MonthDaysBefore + counterA++}
                  key={colIndex}
                />
              );
            } else if (counterA <= MonthDaysCurrent) {
              return (
                <Cell
                  year={year}
                  month={month}
                  day={counterA++}
                  key={colIndex}
                />
              );
            } else {
              return (
                <Cell
                  year={year}
                  month={month}
                  day={counterB++}
                  key={colIndex}
                />
              );
            }
          })}
        </View>
      ))}
    </View>
  );
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  calender: {
    flex: 1,
    width: DEVICE_WIDTH,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    margin: 3,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  rowYoubi: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
  },
  cellYoubi: {
    flex: 1,
    backgroundColor: 'white',
    textAlign: 'center',
  },
});

export default CalendarView;
