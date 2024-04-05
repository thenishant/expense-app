const convertToTableData = (data) => {
    const tableData = [];
    for (let i = 0; i < data.length; i += 3) {
        tableData.push(data.slice(i, i + 3));
    }
    return tableData;
}

export default convertToTableData