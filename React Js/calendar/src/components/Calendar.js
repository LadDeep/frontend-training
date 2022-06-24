import React, { useState, useEffect } from 'react';

export const Calendar = ()=>{
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']; 
    const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

    const [currDate, setCurrDate] = useState(new Date());
    const [currMonth, setCurrMonth] = useState(currDate.getMonth());
    const [currYear, setCurrYear] = useState(currDate.getFullYear());
    const [dates, setDates] = useState();

    useEffect(()=>{
        setDates(createCalender(currMonth, currYear));
        console.log("effects:",currYear, months[currMonth], currDate);
    },[currMonth, currYear]);

    const getEndDate = (year, month) =>{
        return new Date(year, month, 0).getDate();
    }
    
    const handleNext = ()=>{
        let year = currMonth===11 ? currYear+1 : currYear;
        let month = currMonth===11 ? 0 : currMonth+1;
        setCurrDate(new Date(year, month))
        setCurrMonth(month);
        setCurrYear(year);
        
        console.log("next:",currYear, months[currMonth], currDate);
    }

    const handlePrevious = ()=>{
        let year = currMonth===0 ? currYear-1 : currYear;
        let month = currMonth===0 ? 11 : currMonth-1;
        setCurrDate(new Date(year, month))
        setCurrMonth(month);
        setCurrYear(year);

        console.log("next:",currYear, months[currMonth], currDate);
    }
    
    const createCalender = (month, year) => {
        console.log("createCalendar:",currDate, months[currMonth], currYear);
        
        let endDate = getEndDate(year, month+1);
        let startDate = new Date(currDate);
        startDate.setDate(1)
        let day = startDate.getDay();
        let emptyDays = [];
        
        for(let i=1; i<=day; i++){
            emptyDays.push(
                <td>{""}</td>
            );
        }
        
        let datesToDisplay = [...emptyDays];
        for(let i=1; i<=endDate; i++){
            datesToDisplay.push(
                <td key={i}>{i}</td>
            );
        }
        
        while(datesToDisplay.length%7!==1){
            datesToDisplay.push(
                <td>{""}</td>
            )
        }
        
        let week = [];
        let weeks = [];
        datesToDisplay.forEach((day, i)=>{
            if (i % 7 !== 0) {
                week.push(day)
            } else {
                weeks.push(<tr>{week}</tr>);
                week = [];
                week.push(day)
            }
        })
        return weeks;
    }

    return (
        <>
            <table id="calender">
                <tbody>
                    <tr>
                        {
                            weekDays.map(day=>
                                <th>{day}</th>
                            )
                        }
                    </tr>
                    {dates}
                </tbody>
            </table>
            <div className="month-toggle">
                <button id="previous" className="btn" onClick={handlePrevious}>Previous</button>
                <span id="month-and-year">{months[currMonth]}, {currYear}</span>
                <button id="next" className="btn" onClick={handleNext}>Next</button>
            </div>
        </>
    )
}