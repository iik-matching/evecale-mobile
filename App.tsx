import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';

interface HeaderProps {
  title: string;
}
interface CellProps {
  dayNum: number;
}
interface TableProps {
  monthNum: number;
}

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
      <Button title={`${dayNum}`} />
    </View>
  );
};

// // Table
// const Talbe: React.FC<TableProps> = ({mounthNum}) => {
//   return (
//     <View style={styles.table}>
//       {/* 6回繰り返す */}
//       {Array.from({length: 6}).map((_, rowIndex) => (
//         <View style={styles.row} key={rowIndex}>
//           {/* 月〜金まで繰り返す */}
//           {Array.from({length: 7}).map((_, colIndex) => (
//             <Cell dayNum={rowIndex * 7 + colIndex + 1} />
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };

const getDaysInMonth = (month: number) => {
  const date = new Date(2023, month, 0);
  return date.getDate();
};

const Table: React.FC<TableProps> = ({monthNum}) => {
  const daysInMonth = getDaysInMonth(monthNum);
  const weeks = Math.ceil(daysInMonth / 7);
  let nextMonthDay = 1;

  return (
    <View style={styles.table}>
      {Array.from({length: weeks}).map((_, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {Array.from({length: 7}).map((_, colIndex) => {
            const dayNum = rowIndex * 7 + colIndex + 1;

            if (dayNum <= daysInMonth) {
              return <Cell dayNum={dayNum} key={colIndex} />;
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
  return (
    <View style={styles.container}>
      <Header title="My Header" />
      <Table monthNum={9} />
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
