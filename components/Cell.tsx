import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

interface CellProps {
  dayNum: number;
}

const handleButtonPress = () => {
  console.log('ボタンが押されました');
};

const Cell: React.FC<CellProps> = ({dayNum}) => {
  return (
    <View style={styles.cell}>
      <Button title={`${dayNum}`} onPress={handleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    margin: 3,
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default Cell;
