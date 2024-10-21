import moment from "moment";

export function getFormattedDate(date) {
    return moment(date).format('DD-MMM-YYYY')
}

export function getCurrentDate(date?: string) {
    return date ? moment(date, 'DD/MM/YYYY').toDate() : moment(new Date(), 'DD/MM/YYYY').toDate();
}

export function getCurrentMonth() {
    return moment().format('MMM');
}

export function getMonth(date) {
    return date ? moment(date).format('MMM') : moment().format('MMM');
}

export function getYear(date) {
    return date ? moment(date).format('YYYY') : moment().format('YYYY');
}

export function convertToStandardFormat(date) {
    return moment(date).format("YYYY-MM-DD");
}

