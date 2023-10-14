import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import CalendarView from '../components/Calendar';
import {getAdjustedDate} from '../tools';

const Calender: React.FC = () => {
  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(9);
  const {year: prevYear, month: prevMonth} = getAdjustedDate(year, month - 1);
  const {year: nextYear, month: nextMonth} = getAdjustedDate(year, month + 1);
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get('window').width,
      animated: false,
    });
  }, []);

  // スワイプを離した時
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = e.nativeEvent.contentOffset.x;
    const width = Dimensions.get('window').width;

    // 前の月に進む場合
    if (position <= 0) {
      setYear(prevYear);
      setMonth(prevMonth);
      //次の月に進む場合
    } else if (position >= width * 2) {
      console.log(nextMonth);
      setYear(nextYear);
      setMonth(nextMonth);
    }
    scrollViewRef.current?.scrollTo({x: width, animated: false});
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScrollEnd}
          showsHorizontalScrollIndicator={false}>
          <CalendarView year={prevYear} month={prevMonth} />
          <CalendarView year={year} month={month} />
          <CalendarView year={nextYear} month={nextMonth} />
        </Animated.ScrollView>
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
