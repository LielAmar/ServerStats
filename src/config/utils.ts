const maxDatesInArray = process.env.MAX_DAYS_QUERIED_AT_ONCE ? parseInt(process.env.MAX_DAYS_QUERIED_AT_ONCE) : 100;

/**
 * Returns an array of dates between startDate and stopDate
 * 
 * @param startDate   Start date
 * @param stopDate    Stop date
 * @returns           Array of dates between the 2 dates
 */
const getDates = (startDate: Date, stopDate: Date) => {
  // If startDate is after the stopDate swap them
  if(stopDate < startDate) {
    let tmpDate = startDate;
    startDate = stopDate;
    stopDate = tmpDate;
  }

  let dateArray = [];
  let currentDate = startDate;

  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));

    // If dateArray reached the value of maxDatesInArray, break the loop. This is to prevent overflow.
    if(dateArray.length >= maxDatesInArray) 
      break;
  }

  return dateArray;
}

export { getDates };