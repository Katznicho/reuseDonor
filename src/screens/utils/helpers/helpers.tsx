export const limitDescription = (description: string, wordLimit: number) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  } else {
    return description;
  }
};

export const generateTransactionRef = (length: number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `reuse_${result}${new Date().getTime()}`;
};

export function convertFirebaseTimestampToReadableDate(timestampObj: { nanoseconds: any; seconds: any; }) {
  const timestamp = new Date(timestampObj.seconds * 1000 + timestampObj.nanoseconds / 1e6);
  return timestamp.toLocaleString(); // You can use other toLocaleString options to format the date/time as you prefer
}

// Example usage:
// const firebaseTimestamp = {"nanoseconds": 561000000, "seconds": 1699706059};
// const readableDate = convertFirebaseTimestampToReadableDate(firebaseTimestamp);
// console.log(readableDate);

