export function convertToTable(tableData) {
    const rowData = [];
    for (let i = 0; i < tableData.length; i += 3) {
        rowData.push(tableData.slice(i, i + 3));
    }
    return rowData;
}