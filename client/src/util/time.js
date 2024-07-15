export function getLastSecondBeforeTomorrow() {
  const now = new Date();
  const lastSecondToday = new Date(now);
  lastSecondToday.setHours(23, 59, 59, 999); // Set the time to 11:59:59.999 PM
  return lastSecondToday;
}

//   function isTodayOver() {
//     const now = new Date();
//     console.log(now);
//     const lastSecondToday = getLastSecondBeforeTomorrow();
//     return now >= lastSecondToday;
//   }

//   // Example usage
//   const lastSecondToday = getLastSecondBeforeTomorrow();
//   console.log("Last second before tomorrow:", lastSecondToday);

//   const todayOver = isTodayOver();
// console.log("Is today over?", todayOver);
