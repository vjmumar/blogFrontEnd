const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const useDateNow = () => {
  const day = new Date().toLocaleDateString();
  const daySplit = day.split("/");
  daySplit[0] = months[daySplit[0] - 1];
  return daySplit.join("/");
};
