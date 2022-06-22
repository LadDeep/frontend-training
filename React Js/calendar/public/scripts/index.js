const months = {
    'JANUARY': 0,
    'FEBRUARY': 1,
    'MARCH': 2,
    'APRIL': 3,
    'MAY': 4,
    'JUNE': 5,
    'JULY': 6,
    'AUGUST': 7,
    'SEPTEMBER': 8,
    'OCTOBER': 9,
    'NOVEMBER': 10,
    'DECEMBER': 11 
};

const calenderTable = document.getElementById('calender');
const d = new Date();
let currMonth = d.getMonth(),
    currYear = d.getFullYear();
const monthYearDisplay = document.getElementById('month-and-year');
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');

const isLeapYear = (year)=>{
    if(year%100 === 0 && year%400 === 0)
        return true;
    else if(year%100 !== 0 && year%4 === 0)
        return true;
    else
        return false;
}

const getEndDate = (month) =>{
    switch(month){
        case months.FEBRUARY:
            return isLeapYear(d.getFullYear) ? 29 : 28;
        case months.APRIL:
        case months.JUNE:
        case months.SEPTEMBER:
        case months.NOVEMBER:
            return 30;
        default:
            return 31;
    }
}

const clearTable = () => {
    while(calenderTable.childNodes.length > 2){
        calenderTable.removeChild(calenderTable.lastChild);
    }
}

const createCalender = (month, year) => {
    clearTable();
    
    d.setFullYear(year);
    d.setMonth(month);
    d.setDate(1);
    let date = d.getDate();
    let endDate = getEndDate(month);
    let day = d.getDay();
    let week=1;
    do{
        const weekRow = document.createElement('tr');
        for(let i=1; i<=7; i++){
            let currDateData = document.createElement('td');
            
            // enter empty td for days belonging to previous month
            //  or date exceeds last day of particular month
            if((i<=day && week==1) || date>endDate){
                weekRow.appendChild(currDateData);
                continue;
            }
            currDateData.textContent = date;
            weekRow.appendChild(currDateData);
            date++;
        }
        calenderTable.appendChild(weekRow); 
        week++;
    } while(date<=endDate);
    
    monthYearDisplay.textContent = Object.keys(months).find(key => months[key] == month)+', '+year;
}

createCalender(currMonth, currYear);

previousBtn.addEventListener("click",()=>{
    currYear = currMonth===0 ? --currYear : currYear;
    currMonth = currMonth===0? 11 : --currMonth;
    createCalender(currMonth, currYear);
})

nextBtn.addEventListener("click",()=>{
    currYear = currMonth===11 ? ++currYear : currYear;
    currMonth = currMonth===11? 0 : ++currMonth;
    createCalender(currMonth, currYear);
})