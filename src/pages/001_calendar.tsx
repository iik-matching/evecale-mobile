import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Animated, View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Header from '../components/Header';
import Table from '../components/Table';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<RootStackParamList, 'Calender'>;

const Calender: React.FC<Props> = ({navigation}) => {
  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(9);

  const translateX = useRef(new Animated.Value(0)).current;

  const handleGesture = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {useNativeDriver: false},
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === 4) {
      const swipeDirection = event.nativeEvent.translationX;

      if (swipeDirection > 100) {
        // Right swipe
        setMonth(prev => (prev === 1 ? 12 : prev - 1));
      } else if (swipeDirection < -100) {
        // Left swipe
        setMonth(prev => (prev === 12 ? 1 : prev + 1));
      }

      Animated.timing(translateX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Header title={`${year}年${month}月`} />
        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={onHandlerStateChange}>
          <Animated.View style={{flex: 1, transform: [{translateX}]}}>
            <Table year={year} month={month} />
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    display: 'flex',
  },
});

export default Calender;
