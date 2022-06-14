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
let currMonth = d.getMonth();
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

const getEndDate = (currMonth) =>{
    switch(currMonth){
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

const createCalender = (currMonth) => {
    clearTable();
    
    d.setMonth(currMonth);
    d.setDate(1);

    // TODO: handling the year when entering previous year
    currMonth = (currMonth%12+12)%12;
    
    let date = d.getDate();
    let endDate = getEndDate(currMonth);
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
    
    monthYearDisplay.textContent = Object.keys(months).find(key => months[key] == currMonth)+', '+d.getFullYear();
}

createCalender(currMonth);

previousBtn.addEventListener("click",()=>{
    createCalender(--currMonth);
})

nextBtn.addEventListener("click",()=>{
    createCalender(++currMonth);
})