export function getFormattedDate(date) {
    return date.toDateString()
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}