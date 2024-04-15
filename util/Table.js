export function convertToTableDataWithIcon(categorySVGs) {
    if (!Array.isArray(categorySVGs) || categorySVGs.length === 0 || !categorySVGs[0]) {
        console.error('Invalid categorySVGs data:', categorySVGs);
        return []
    }

    const tableData = [];
    const categories = Object.keys(categorySVGs[0]);
    categories.forEach(category => {
        const svgFilename = categorySVGs[0][category];
        const svgUri = (`.../assets/icons/${svgFilename}`);
        tableData.push(`${svgUri} ${category}`);
    });

    const rowData = [];
    for (let i = 0; i < tableData.length; i += 3) {
        rowData.push(tableData.slice(i, i + 3));
    }

    return rowData;
}