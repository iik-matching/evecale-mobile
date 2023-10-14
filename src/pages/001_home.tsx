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
import {getAdjustedDate, getEvents} from '../tools';
import {EventData} from '../type';

const Home: React.FC = () => {
  const currentDate = new Date();
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1 + 1); // 真ん中のカレンダーを表示するため+1

  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const {year: prevYear, month: prevMonth} = getAdjustedDate(year, month - 1);
  const {year: nextYear, month: nextMonth} = getAdjustedDate(year, month + 1);
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get('window').width,
      animated: false,
    });
  }, []);

  const [events1, setEvents1] = useState<EventData[]>([]);
  const [events2, setEvents2] = useState<EventData[]>([]);
  const [events3, setEvents3] = useState<EventData[]>([]);

  async function fetchEvents(
    _year: number,
    _month: number,
    updateFunction: React.Dispatch<React.SetStateAction<EventData[]>>,
  ) {
    console.log('fetchEvents()');
    try {
      const fetchedEvents = await getEvents(_year, _month);
      updateFunction(fetchedEvents);
      console.log(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }
  useEffect(() => {
    fetchEvents(prevYear, prevMonth, setEvents1);
  }, [prevYear, prevMonth]);

  useEffect(() => {
    fetchEvents(year, month, setEvents2);
  }, [year, month]);

  useEffect(() => {
    fetchEvents(nextYear, nextMonth, setEvents3);
  }, [nextYear, nextMonth]);

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
          <CalendarView year={prevYear} month={prevMonth} events={events1} />
          <CalendarView year={year} month={month} events={events2} />
          <CalendarView year={nextYear} month={nextMonth} events={events3} />
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
