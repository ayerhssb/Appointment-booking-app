const convertTime = time =>{
    // timeParts will return an array

    const timeParts = timesplit(":");
    let hours  = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    let meridiem = "am";

    if(hours >= 12){
        meridiem = "pm";

        if(hours > 12){
            hours -= 12;
        }
    }

    return (
        hours.toString().padStart(2) + ":" +
        minutes.toString().padStart(2,'0') + " " + meridiem
    );
};

export default convertTime;