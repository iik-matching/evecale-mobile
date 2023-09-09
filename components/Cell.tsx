import React from 'react';
import {StyleSheet, Button, Text, TouchableOpacity, View} from 'react-native';

interface CellProps {
  dayNum: number;
}

const cellTap = () => {
  console.log('ボタンが押されました');
};

const Cell: React.FC<CellProps> = ({dayNum}) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.textDay}>{`${dayNum}`}</Text>
      <TouchableOpacity style={styles.viewCell} onPress={cellTap}>
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
  textDay: {
    backgroundColor: 'green',
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
