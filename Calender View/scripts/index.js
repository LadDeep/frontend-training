const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
const DAYS_IN_WEEK = 7;
const FIRST_MONTH = 0;
const LAST_MONTH = 11;

let date = new Date();
let year = date.getFullYear(), month = date.getMonth();
const calenderTable = document.getElementById('calender');
const monthYearDisplay = document.getElementById('month-and-year');
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');

const clearTable = () => {
    while(calenderTable.childNodes.length > 2){
        calenderTable.removeChild(calenderTable.lastChild);
    }
}

const createCalender = (month, year) => {
    clearTable();

    date = new Date(year, month);
    let startDateDay = date.getDay();
    let endDate = new Date(year, month+1, 0);
    let endDateDay = endDate.getDay()
    let noOfDaysInMonth = endDate.getDate();

    let datesToDisplay = [];

    // Padding for dates of previous month with space
    for(let i=1; i<=startDateDay; i++){
        datesToDisplay.push("");
    }

    // Pushing dates of current month
    for(let i=1; i<=noOfDaysInMonth; i++){
        datesToDisplay.push(i);
    }
    
    // Padding for dates of next month with space
    for(let i=endDateDay+1; i<DAYS_IN_WEEK; i++){
        datesToDisplay.push("");
    }

    for(let i=0; i<datesToDisplay.length; ){
        const currWeek = document.createElement('tr');
        for(let j=1; j<=DAYS_IN_WEEK; j++){
            let date = document.createElement('td');
            date.textContent = datesToDisplay[i++];
            currWeek.appendChild(date);
        }
        calenderTable.appendChild(currWeek);
    }

    monthYearDisplay.textContent = months[month]+', '+year;
}

createCalender(month, year);

previousBtn.addEventListener("click",()=>{
    if(month === LAST_MONTH){
        month = FIRST_MONTH;
        year--;
    } else {
        month--;
    }
    createCalender(month, year);
})

nextBtn.addEventListener("click",()=>{
    if(month === LAST_MONTH){
        month = FIRST_MONTH;
        year++;
    } else {
        month++;
    }
    createCalender(month, year);
})