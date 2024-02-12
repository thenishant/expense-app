import moment from "moment";

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export function getFormattedDate(date) {
    return moment(date).format('DD-MM-YYYY')
}
