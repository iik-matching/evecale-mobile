import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Cell from './Cell'; // Cell コンポーネントをインポート

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

  return (
    <View style={styles.table}>
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
