function getSmallerDate(dateStr1, dateStr2) {
    let date1 = new Date(dateStr1);
    let date2 = new Date(dateStr2);
    return date1 < date2 ? date1.toISOString().split('T')[0] : date2.toISOString().split('T')[0];
}

function getTaskDateMin(dateStr) {
    let date1 = new Date();
    let date2 = new Date(dateStr);
    return date1 < date2 ? date1.toISOString().split('T')[0] : date2.toISOString().split('T')[0];
}
