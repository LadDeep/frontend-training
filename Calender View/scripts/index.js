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
const currMonth = d.getMonth();

d.setDate(1);
let date = d.getDate();
console.log(date);


const isLeapYear = (year)=>{
    if(year%100 === 0 && year%400 === 0)
        return true;
    else if(year%100 !== 0 && year%4 === 0)
        return true;
    else
        return false;
}

let endDate;
switch(currMonth){
    case months.FEBRUARY:
        endDate = isLeapYear(d.getFullYear) ? 29 : 28;
    case months.APRIL:
    case months.JUNE:
    case months.SEPTEMBER:
    case months.NOVEMBER:
        endDate = 30;
    default:
        endDate = 31;
}

let day = d.getDay();

let week=1;
do{
    const weekRow = document.createElement('tr');
    for(let i=1; i<=7; i++){
        // Returning as soon as the date exceeds last day of particular month
        if(date>endDate) break;
        let currDateData = document.createElement('td');
        
        // enter empty td for days belonging to previous month
        if(i<=day && week==1){
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

