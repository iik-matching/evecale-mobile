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
