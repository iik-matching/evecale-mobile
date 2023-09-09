import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Cell from './Cell'; // Cell コンポーネントをインポート
import {useFocusEffect} from '@react-navigation/native';

interface TableProps {
  year: number;
  month: number;
}

// 受け取った月が何曜日からスタートかを 月曜０ で取得
const getFirstDayOfMonth = (year: number, month: number) => {
  let result = new Date(year, month - 1, 1).getDay() - 1;
  if (result == -1) {
    result = 6;
  }
  // console.log(`${year}年の${month}月は${result}曜日から`);
  return result;
};

// 受け取った月は何日までか
const getDaysInMonth = (year: number, month: number) => {
  let result: number = new Date(year, month, 0).getDate();
  // console.log(`${year}年の${month}月は${result}日まで`);
  return result;
};

type Event = {
  id: string;
  title: string;
  event_date: Date;
  place: string;
  open_time: string;
  start_time: string;
  end_time: string;
};

const Table: React.FC<TableProps> = ({year, month}) => {
  // 先月は何日までか
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  // 今月は何日までか
  const daysInMonth = getDaysInMonth(year, month);
  // 今月が何曜日からスタートかを 月曜０ で取得
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  // 表示する週の数
  const weeks = 6;
  // 今月用カウンタ
  let dayCounter = 1 - firstDayOfMonth;
  // 次月用カウンタ
  let nextMonthDay = 1;

  const [events, setEvents] = useState<Event[]>([]);

  async function fetchEvents() {
    try {
      const response = await fetch(
        'http://192.168.3.9:3000/api/event-get?year=2023&month=9',
      );

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data: Event[] = await response.json();
      setEvents(data);
      // console.log(data.length);
      // console.log(`id: ${data[0].id}`);
      // console.log(`title: ${data[0].title}`);
      // console.log(`event_date: ${new Date(data[0].event_date).getMonth()}`);
      // console.log(`place: ${data[0].place}`);
      // console.log(`open_time: ${data[0].open_time}`);
      // console.log(`start_time: ${data[0].start_time}`);
      // console.log(`end_time: ${data[0].end_time}`);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log('画面が表示されました');

      // 関数の引数としてデータをとる
      // node.jsでDBのモックを作る
      fetchEvents();

      return () => {};
    }, []),
  );

  return (
    <View style={styles.table}>
      <Text>{`${events.length}`}</Text>
      <View style={styles.rowYoubi}>
        <Text style={styles.cellYoubi}>月</Text>
        <Text style={styles.cellYoubi}>火</Text>
        <Text style={styles.cellYoubi}>水</Text>
        <Text style={styles.cellYoubi}>木</Text>
        <Text style={styles.cellYoubi}>金</Text>
        <Text style={styles.cellYoubi}>土</Text>
        <Text style={styles.cellYoubi}>日</Text>
      </View>
      {/* 6週繰り返す */}
      {Array.from({length: weeks}).map((_, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {Array.from({length: 7}).map((_, colIndex) => {
            if (dayCounter <= 0) {
              return (
                <Cell day={daysInPrevMonth + dayCounter++} key={colIndex} />
              );
            } else if (dayCounter <= daysInMonth) {
              return <Cell day={dayCounter++} key={colIndex} />;
            } else {
              return <Cell day={nextMonthDay++} key={colIndex} />;
            }
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flex: 1,
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

export default Table;