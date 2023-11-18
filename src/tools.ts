import {EventData} from './type';

// 受け取った月が何曜日からスタートかを 月曜０ で取得
export const getFirstDayOfMonth = (year: number, month: number) => {
  let result = new Date(year, month - 1, 1).getDay() - 1;
  if (result == -1) {
    result = 6;
  }
  // console.log(`${year}年の${month}月は${result}曜日から`);
  return result;
};

// 受け取った月は何日までか
export const getDaysInMonth = (year: number, month: number) => {
  let result: number = new Date(year, month, 0).getDate();
  // console.log(`${year}年の${month}月は${result}日まで`);
  return result;
};

// 受け取った年月が範囲外の場合は修正する
export const getAdjustedDate = (year: number, month: number) => {
  if (month === 0) {
    return {year: year - 1, month: 12};
  } else if (month === 13) {
    return {year: year + 1, month: 1};
  } else {
    return {year, month};
  }
};

// --------- api ---------

// 指定された月のイベントを取得
export async function getEvents(year: number, month: number) {
  let result: EventData[] = [];
  try {
    const response = await fetch(
      `http://192.168.3.2:3000/api/event-get?year=${year}&month=${month}`,
    );
    if (response.ok) {
      result = await response.json();
      console.log(
        `http://192.168.3.2:3000/api/event-get?year=${year}&month=${month}`,
        result.length,
      );
    } else {
      throw new Error('Network response was not ok ' + response.statusText);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
  return result;
}
