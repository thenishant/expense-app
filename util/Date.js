import moment from "moment";

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export function getFormattedDate(date) {
    return moment(date).format('DD-MMM-YYYY')
}

export function getFormattedDateAsDate(date) {
    return moment(date, 'DD-MMM-YYYY').toDate()
}

export function getCurrentDate(date?: string) {
    return date ? moment(date, 'DD/MM/YYYY').toDate() : moment(new Date(), 'DD/MM/YYYY').toDate();
}

export function getCurrentMonth() {
    return moment().format('MMM');
}
