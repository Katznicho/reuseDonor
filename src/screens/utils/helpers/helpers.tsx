import moment from 'moment';
import { Vibration } from 'react-native';

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



export const formattedDate = (timestamp: any) => {
    return moment(timestamp).format('MMMM DD, YYYY');
}

// Example usage:
// const firebaseTimestamp = {"nanoseconds": 561000000, "seconds": 1699706059};
// const readableDate = convertFirebaseTimestampToReadableDate(firebaseTimestamp);
// console.log(readableDate);

//helper types
export type _String = string;
export type _Mixed = string | null;
export type _Number = number;
export type _Boolean = boolean;
export type __Mixed = string | boolean;
export type _Any = any;

// export const delay = (ms: _Number): _Any => new Promise((res) => setTimeout(res, ms));

//check empty filds
export const EmptyError = (data: _String, name: _String): _Mixed => {
    if (data === '' || data === null) {
        return `${name} cannot be empty`;
    }
    return null;
};
//empty to disable buttons
export const EmptyFieldError = (field: _String): boolean =>
    field === '' || field === null ? true : false;
//empty to disable buttons

export const lengthError = (
    data: _String,
    desiredLength: _Number,
    field: _String,
): _Mixed => {
    if (data && data.length < desiredLength) {
        return `${field} must be ${desiredLength} characters and above`;
    }
    return null;
};

export const lengthChecker = (
    data: _String,
    desiredLength: _Number,
): boolean => {
    if (data && data.length < desiredLength) {
        return true;
    }
    return false;
};

//   /[^a-zA-Z]/.test(data) === true
export const passwordRegx: _Any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
export const passwordError = (data: _String): _Mixed => {
    if (data && data.length < 6) {
        return 'atleast 6 character needed';
    }

    return null;
};

export const passwordRegxChecker = (data: _String): _Mixed => {
    if (data && !passwordRegx.test(data)) {
        return 'password must be atleast 6 characters and contain atleast one number, one uppercase and one lowercase letter';
    }
    return null;
};

export const confirmPasswordError = (
    password: _String,
    confirmPassword: _String,
): boolean => {
    if (confirmPassword && confirmPassword !== password) {
        // return 'The passwords do not match';
        return true;
    } else {
        return false;
    }
};

export const numberError = (data: any): boolean => {
    if (data && /^[\s()+-]*([0-9][\s()+-]*){9,10}$/.test(data) !== true) {
        //return 'Please enter a valid phone number with 10 digits and please use only numbers';
        return true;
    } else {
        return false;
    }
};

export const emailRegex: _Any =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

export const emailChecker = (data: _String): boolean => {
    if (data && emailRegex.test(data) !== true) {
        return true;
    } else {
        return false;
    }
};

export const emailMessage = (data: _String): _Mixed => {
    if (data && emailRegex.test(data) !== true) {
        return 'Please enter valid email address.';
    }
    return null;
};

export const formatPhoneNumber = (number: any) => {
    let num = '+256';
    //remove a 0 from the beginning of the number and append a +256
    if (number.charAt(0) === '0') {
        num += number.substring(1);
    }
    return num;
};

// export function formatTime(timeStr: string) {
//     const timeObj = moment(`1970-01-01T${timeStr}Z`);
//     const formattedTime = timeObj
//         .format('hh:mm A')
//         .replace(/^(\d{1}):/, '0$1:');
//     return formattedTime;
// }

export function formatTime(timeStr: string) {
    return moment(timeStr, 'HH:mm:ss').format('h A');
}

export function getErrorMessage(errors: any, fieldName: string) {
    if (errors?.hasOwnProperty(fieldName)) {
        return errors[fieldName][0];
    } else {
        return '';
    }
}

export function causeVibration(duration?: number) {
    Vibration.vibrate(duration ?? 50);
}

export const trimText = (text: any, maxLength: number) => {
    if (text?.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength - 3) + '...';
    }
};

// a function that gets the current date
export const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
};

export function extractMonthAndYear(dateString: string) {
    const [year, month, day] = dateString.split('-');
    return { year, month, day };
}

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


