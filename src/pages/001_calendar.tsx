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
import Header from '../components/Header';
import Table from '../components/Table';

const Calender: React.FC = () => {
  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(9);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get('window').width,
      animated: false,
    });
  }, []);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = e.nativeEvent.contentOffset.x;
    const width = Dimensions.get('window').width;

    if (position <= 0) {
      setMonth(prev => (prev === 1 ? 12 : prev - 1));
    } else if (position >= width * 2) {
      setMonth(prev => (prev === 12 ? 1 : prev + 1));
    }

    scrollViewRef.current?.scrollTo({x: width, animated: false});
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Header title={`${year}年${month}月`} />
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScrollEnd}
          showsHorizontalScrollIndicator={false}>
          <Table year={year} month={month - 1 <= 0 ? 12 : month - 1} />
          <Table year={year} month={month} />
          <Table year={year} month={month + 1 > 12 ? 1 : month + 1} />
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
