import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Cell from './Cell';
import {getAdjustedDate, getDaysInMonth, getFirstDayOfMonth} from '../tools';
import Header from './Header';
import {EventData} from '../type';

interface CalendarProps {
  year: number;
  month: number;
  events: EventData[];
}

const CalendarView: React.FC<CalendarProps> = ({year, month, events}) => {
  // 先月は何日までか
  const MonthDaysBefore = getDaysInMonth(year, month - 1);
  // 今月は何日までか
  const MonthDaysCurrent = getDaysInMonth(year, month);
  // 今月が何曜日からスタートかを 月曜０ で取得
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  // 表示する週の数
  const CountWeeksDisplay = 6;

  console.log(`カレンダーコンポーネント表示 ${year} ${month}`);
  if (events.length > 0) {
    console.log(events[0].title);
    console.log(events[0].event_date);
    console.log(events[0].performers.split(','));
  }
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
                  year={getAdjustedDate(year, month - 1).year}
                  month={getAdjustedDate(year, month - 1).month}
                  day={MonthDaysBefore + counterA++}
                  events={events}
                  key={colIndex}
                />
              );
            } else if (counterA <= MonthDaysCurrent) {
              return (
                <Cell
                  year={year}
                  month={month}
                  day={counterA++}
                  events={events}
                  key={colIndex}
                />
              );
            } else {
              return (
                <Cell
                  year={getAdjustedDate(year, month + 1).year}
                  month={getAdjustedDate(year, month + 1).month}
                  day={counterB++}
                  events={events}
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
