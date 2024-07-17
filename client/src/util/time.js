export function getLastSecondBeforeTomorrow() {
  const now = new Date();
  const lastSecondToday = new Date(now);
  lastSecondToday.setHours(23, 59, 59, 999); // Set the time to 11:59:59.999 PM
  return lastSecondToday;
}
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  // Get the components of the date
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const timeString = date.toLocaleString("en-US", options);

  // Format the date components
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${timeString} ${day}-${month}-${year}`;
  return formattedDate;
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
