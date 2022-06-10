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
const monthDaysMap = {
    [months.FEBRUARY]:29,
    [months.APRIL, months.JUNE, months.SEPTEMBER, months.NOVEMBER]:30,
    [months.JANUARY, months.MARCH, months.MAY, months.JULY, months.AUGUST, months.OCTOBER, months.DECEMBER]:31
}

const calenderTable = document.getElementById('calender');
const d = new Date();
d.setMonth(4);
const month = d.getMonth();
console.log(month);


d.setDate(1);
let date = d.getDate();
console.log(date);

// TODO: find end date of month which should be used in outer loop to eleminate extra conditions
// let endDate;

// for (const iterator of object) {
    
// }

let day = d.getDay();
// console.log(day);
let j=0;
do{
    const weekRow = document.createElement('tr');
    //enter empty td
    for(let i=1; i<=7; i++){
        let currDateData = document.createElement('td');
        if(i<day && j==0){
            weekRow.appendChild(currDateData);
            continue;
        }
        currDateData.textContent = date;
        weekRow.appendChild(currDateData);
        date++;
    }
    calenderTable.appendChild(weekRow); 
    j++;
} while(date<=29);

if(date==31){
    d.setDate(31)
    let currMonth = d.getMonth();
}