import moment from "moment";
import Alertness from '../services/alertness.json'

export function formatData() {
    let arr = Alertness.questions.map((el) => {
        return {
            id: el.uuid,
            type: el.type == 'choice' ? 'radio' : 'checkbox',
            question: el.config.text,
            options: el.config.choices.map((elem) => ({ option: elem.label })),
            correct_answer: el.config.choices.filter((elem) => elem.correct).map(({ label }) => label),
            explanation: el.config.messages.correct.text,
            audios: Object.values(el.assets)
        }
    })
    console.log(arr);
}

export function isObjEmpty(obj) {
    if (obj) {
        return Object.keys(obj).length === 0;
    }
    return true;
}
export function simplify(string) {
    if (string !== null && string !== undefined && string !== "") {
        return string.replace(/\s/g, '').toLowerCase();
    }
    return string;
}

export function isNullRetNull(string, retVal = "") {
    // if(typeof string === 'object' && !Object.keys(string).length) return false;
    return string !== undefined && string !== null && string !== "" && string !== false ? string : retVal;
}

export function splitArrayIntoChunks(array, length) {
    var chunks = [], i = 0, n = array.length;
    while (i < n) {
        chunks.push(array.slice(i, i += length));
    }
    return chunks;
}

export function checkIsNum(value) {
    if (typeof Number(value) === "number") {
        return parseFloat(Number(value)).toFixed(2)
    } else {
        return "Not available"
    }
}

export function randomArrayShuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

export function capitalizeFirstLetter(string, retVal = "") {
    let str = string !== undefined && string !== null && string !== "" && string !== false ? string : retVal;
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

export const formatDataIntoTwoCol = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
        dataList.push({ mobile_banner: 'mobile_banner', empty: true });
        totalLastRow++;
    }
    return dataList;
};

export const generate_url = (data, store_id, user, total_am) => {

    // let url = `https://wa.me/${store_id.phone}?text=`;
    // url += "Hi, I'd like to place an order";
    // url += '%F0%9F%91%87%0D%0A%0D%0A%E2%9C%85';
    // url += 'Whatsapp Order No : ' + data.order_unique_id + '%0D%0A%0D%0A---------%0D%0A';
    // for (let i = 0; i < data.json.cart.length; i++) {
    //     let elm = data.json.cart[i]
    //     url += i + 1 + '.%0D%0D' + elm.product_name + ' (' + elm.quantity + ')' + '%0D%0D--->%0D%0D' + 'AED%0D' + parseFloat(elm.variant_price).toFixed(2) + '%0D%0A++%0D%0A+';

    // }
    // url += `%0A%0D%0A---------%0D%0A+%0D%0A%F0%9F%97%92+Customer+Details%3A%0D%0A++%0D%0A-+Name%3A${data.customer_name}+%0D%0A-+Phone%3A+${data.customer_phone}%0D%0A-+Address%3A+%0D%0A-+Order+note%3A+%0D%0A%0D%0A${store_id.store_name}+will+confirm+your+order+upon+receiving+the+message.`
    // return url;


    let url = `https://wa.me/${store_id.phone}?text=`;
    url += "Hi, I'd like to place an order";
    url += '%F0%9F%91%87%0D%0A%0D%0A%E2%9C%85';
    // url += 'Whatsapp Order No : ' + uuid.v4() + '%0D%0A%0D%0A---------%0D%0A';
    url += 'Whatsapp Order No : ' + `ODR-${Math.floor(Math.random() * 10000)}` + '%0D%0A%0D%0A---------%0D%0A';
    for (let i = 0; i < data.length; i++) {
        let elm = data[i]
        url += i + 1 + '.%0D%0D' + elm.product_name + ' (' + elm.quantity + ')' + '%0D%0D--->%0D%0D' + 'AED%0D' + parseFloat(elm.variant_price).toFixed(2) + '%0D%0A++%0D%0A+';

    }
    url += `%0A%0D%0A---------%0D%0A+%0D%0A%F0%9F%97%92+Total+Amount: ${total_am}+AED%0D%0A+`
    url += `%0A%0D%0A---------%0D%0A+%0D%0A%F0%9F%97%92+Customer+Details%3A%0D%0A++%0D%0A-+Name%3A${user.name}+%0D%0A-+Phone%3A+${user.phone}%0D%0A-+Address%3A+${user.address ? user.address : ''}%0D%0A-+Order+note%3A+%0D%0A%0D%0A${store_id.store_name}+will+confirm+your+order+upon+receiving+the+message.`
    return url;
}


export const getFilteredServices = (data) => {
    let arr = ["qrscan", "whatsapp", "online"]
    const entries = Object.entries(data[0]?.services);
    const filtered = entries.filter(el => !!el[1]);
    const names = filtered.map(el => el[0]);
    let fil = names.filter(el => !arr.includes(el))

    return fil
}

export function formatStringWithCommas(array = []) {
    return array.map(({ name }) => name).join(' | ');
}

export function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


export function arrangeCart(cart = [], caregiver = {}) {
    let arr = cart.map((item) => {
        let obj = {
            "product_id": item?.id,
            "qty": 1,
            "notes": "",
            related_specialist: !isObjEmpty(caregiver) ? caregiver?.id : false
        }
        return obj
    })

    return arr
}

export const saveErrors = error => {
    let errObj = {};
    error.errors.forEach(el => {
        const arr = el.split(' ');
        const fieldName = arr[0];
        const msg = arr.slice(1).join(' ');
        errObj = {
            ...errObj,
            [fieldName]: `This ${msg}`,
        };
    });
    return errObj;
};

export const getTimeDifference = (start, end) => {
    // Note: Make sure your start and end times are in the correct format.
    // You may need to adjust the format in the moment function call as per your requirements.
    const startTime = moment(start, 'h:mm a');
    const endTime = moment(end, 'h:mm a');

    // Calculate the duration between the start and end times
    const duration = moment.duration(endTime.diff(startTime));

    // Get the total duration in minutes
    const totalMinutes = duration.asMinutes();

    // Check if the duration is at least 30 minutes
    return totalMinutes >= 30 ? { status: true, totalMinutes } : { status: false, totalMinutes };
};

export function getTimeValue(timeString = "0:0") {
    const time = moment(timeString, ["h:mm A"]);
    const hours = time.get('hour');
    const minutes = time.get('minute');
    return parseFloat(hours + "." + minutes).toFixed(2);
}

export const formatDate = (dateString) => {
    const date = moment(dateString, 'DD/MM/YYYY');
    return date.format('YYYY-MM-DD');
}

export const floatToTime = (timeFloat) => {
    let hours = Math.floor(timeFloat);
    let minutes = Math.round((timeFloat - hours) * 60);
    let period = hours < 12 || hours === 24 ? 'am' : 'pm';
    if (hours > 12) {
        hours = hours - 12;
    }
    if (hours === 0) {
        hours = 12;
    }
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
};


export function generateTimeSlots(serviceTime) {
    let timeSlots = [];
    let startTime = new Date().setHours(0, 0, 0, 0); // Start at 12:00 AM
    let endTime = new Date().setHours(24, 0, 0, 0); // End at 11:30 PM

    while (startTime < endTime) {
        // Get hours and minutes
        let hours = new Date(startTime).getHours();
        let minutes = new Date(startTime).getMinutes();

        // Convert hours from 24 hour to 12 hour format 
        let suffix = hours >= 12 ? 'PM' : 'AM';
        hours = ((hours + 11) % 12 + 1);

        // Add leading 0 to the minutes and hours if they are less than 10
        if (minutes < 10) minutes = '0' + minutes;
        if (hours < 10) hours = '0' + hours;

        // Push the time into the timeSlots array
        timeSlots.push(`${hours}:${minutes} ${suffix}`);

        // Increment the time by the service time
        startTime = new Date(startTime).setMinutes(new Date(startTime).getMinutes() + serviceTime);
    }

    return timeSlots;
}


