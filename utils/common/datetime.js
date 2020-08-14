
const timeObj = () => {

    let time = Date.now();
    let date_ob = new Date(time);
    let date = date_ob.getDate();
    let month = date_ob.getMonth();
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    const dateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds; 
    return dateTime
    

}

module.exports = timeObj;