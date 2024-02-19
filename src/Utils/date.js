const monthObj = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

function getMonthString(month) {
  if (month === 1 || month === "01") {
    month = "January";
  } else if (month === 2 || month === "02") {
    month = "February";
  } else if (month === 3 || month === "03") {
    month = "March";
  } else if (month === 4 || month === "04") {
    month = "April";
  } else if (month === 5 || month === "05") {
    month = "May";
  } else if (month === 6 || month === "06") {
    month = "June";
  } else if (month === 7 || month === "07") {
    month = "July";
  } else if (month === 8 || month === "08") {
    month = "August";
  } else if (month === 9 || month === "09") {
    month = "September";
  } else if (month === 10 || month === "10") {
    month = "October";
  } else if (month === 11 || month === "11") {
    month = "November";
  } else {
    month = "December";
  }

  return month;
}

function getCorrectDate(date) {
  if (date < 10) {
    return `0${date}`;
  } else {
    return date;
  }
}

function getCorrectMonth(month) {
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
}

function todayDate() {
  const date = new Date();
    const day = getCorrectDate(date.getDate());
    const month = getCorrectMonth(date.getMonth() + 1);
    const year =  date.getFullYear();
    return `${day}-${month}-${year}`;
}

function todayDateString() {
  const date = new Date();
  let day = getCorrectDate(date.getDate());
  let month = getMonthString(date.getMonth() + 1);
  let year = date.getFullYear();
  let currentDate = `${month} ${day}, ${year}`;
  return currentDate;
}

function inputDate(date) {
  date = date.split(" ");

  const month = monthObj[date[0]];
  const day = date[1].split(",")[0];
  const year = date[2];

  return `${year}-${month}-${day}`;
}

function outputDate(date){
  date = date.split("-");
  const day = date[2];
  const month = getMonthString(date[1]);
  const year = date[0];
  return `${month} ${day}, ${year}`;
}

module.exports = {
  todayDate,
  todayDateString,
  inputDate,
  outputDate
};
