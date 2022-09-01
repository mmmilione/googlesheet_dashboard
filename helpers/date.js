const getDate = (ts) => {
    const months = ["Ene", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
    const d = new Date(ts);
    const dateString = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    return dateString; 
}

module.exports = getDate;