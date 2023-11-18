import React, {useState} from 'react';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import CalendarView from '../components/Calendar';
import {SafeAreaView} from 'react-native-safe-area-context';

const DEVICE_WIDTH = Dimensions.get('window').width;

const Home: React.FC = () => {
  // 初期表示年月
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  function getPageYear(pageNum: number): number {
    const newMonth = month + pageNum - 1;
    const additionalYears = Math.floor((newMonth - 1) / 12);
    return year + additionalYears;
  }

  function getPageMonth(pageNum: number): number {
    return (month + pageNum - 1) % 12 ? (month + pageNum - 1) % 12 : 12;
  }

  const [pages, setPages] = useState([1, 2]); // 初期のページ

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentPage = Math.round(offsetX / DEVICE_WIDTH);
    // 最後のページに到達した場合
    if (currentPage === pages.length - 1) {
      // 新しいページを追加
      const newPages = [...pages, pages.length + 1];
      setPages(newPages);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}>
        {pages.map(pageNum => (
          <CalendarView
            key={pageNum}
            year={getPageYear(pageNum)}
            month={getPageMonth(pageNum)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
});

export default Home;
