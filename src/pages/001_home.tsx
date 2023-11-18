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
import {EventData} from '../type';

const Home: React.FC = () => {
  // 初期表示年月
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  // 先月と来月を計算
  const {year: prevYear, month: prevMonth} = getAdjustedDate(year, month - 1);
  const {year: nextYear, month: nextMonth} = getAdjustedDate(year, month + 1);

  // // 先月今月来月
  // const [events1, setEvents1] = useState<EventData[]>([]);
  // const [events2, setEvents2] = useState<EventData[]>([]);
  // const [events3, setEvents3] = useState<EventData[]>([]);

  // // 指定された月のイベントを取得
  // async function getEvents(
  //   year: number,
  //   month: number,
  //   updateFunction: React.Dispatch<React.SetStateAction<EventData[]>>,
  // ) {
  //   try {
  //     const response = await fetch(
  //       `http://192.168.3.2:3000/api/event-get?year=${year}&month=${month}`,
  //     );
  //     if (response.ok) {
  //       const data: EventData[] = await response.json();
  //       updateFunction(data);
  //     } else {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //   }
  // }

  // useEffect(() => {
  //   getEvents(prevYear, prevMonth, setEvents1);
  // }, [prevYear, prevMonth]);

  // useEffect(() => {
  //   getEvents(year, month, setEvents2);
  // }, [year, month]);

  // useEffect(() => {
  //   getEvents(nextYear, nextMonth, setEvents3);
  // }, [nextYear, nextMonth]);

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
      setYear(nextYear);
      setMonth(nextMonth);
    }
    scrollViewRef.current?.scrollTo({x: width, animated: false});
  };

  const scrollViewRef = useRef<ScrollView | null>(null);
  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get('window').width,
      animated: false,
    });
  }, []);

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

export default Home;
