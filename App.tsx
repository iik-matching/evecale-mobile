import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';

interface HeaderProps {
  title: string;
}
interface CellProps {
  dayNum: number;
}
interface TableProps {
  year: number;
  month: number;
}

const handleButtonPress = () => {
  console.log('ボタンが押されました');
};

// ヘッダー
const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
      <Text>{title}</Text>
    </View>
  );
};

// Cell
const Cell: React.FC<CellProps> = ({dayNum}) => {
  return (
    <View style={styles.cell}>
      <Button title={`${dayNum}`} onPress={handleButtonPress} />
    </View>
  );
};

// 特定の月の最初の日（すなわち1日）が何曜日であるかを取得する　月曜が0 ~ 日曜が1
const getFirstDayOfMonth = (year: number, month: number) => {
  let result = new Date(year, month - 1, 1).getDay() - 1;
  // 日曜の場合
  if (result == -1) {
    result = 6;
  }

  console.log(`${year}年の${month}月は${result}曜日から`);

  return result;
};

// 受け取った年と月で、最終日が人日までかを取得できる関数
const getDaysInMonth = (year: number, month: number) => {
  let result: number = new Date(year, month, 0).getDate();
  console.log(`${year}年の${month}月は${result}日まで`);
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
      {Array.from({length: weeks}).map((_, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {Array.from({length: 7}).map((_, colIndex) => {
            if (dayCounter <= 0) {
              return (
                <Cell dayNum={daysInPrevMonth + dayCounter++} key={colIndex} />
              );
            } else if (dayCounter <= daysInMonth) {
              return <Cell dayNum={dayCounter++} key={colIndex} />;
            } else {
              return <Cell dayNum={nextMonthDay++} key={colIndex} />;
            }
          })}
        </View>
      ))}
    </View>
  );
};

const App = () => {
  const year = 2023;
  const month = 9;
  return (
    <View style={styles.container}>
      <Header title={`${year}年${month}月`} />
      <Table year={year} month={month} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'red',
    display: 'flex',
  },
  header: {
    padding: 8,
    backgroundColor: 'blue',
  },
  table: {
    flex: 1,
    backgroundColor: 'black',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow',
  },
  cell: {
    flex: 1,
    margin: 3,
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default App;
