import React, { useState } from 'react';

const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']; 
const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const DAYS_IN_WEEK = 7;
const FIRST_MONTH = 0;
const LAST_MONTH = 11;

const date = new Date();

export function Calendar() {
    const [{ year, month }, setState] = useState({
        year: date.getFullYear(),
        month: date.getMonth(),
    });

    const handleNext = () => {
        setState(({ year, month }) =>  {
        if (month === LAST_MONTH) {
            return {
            year: year + 1,
            month: FIRST_MONTH,
            };
        } else {
            return { year, month: month + 1 };
        }
        });
    };

    const handlePrevious = () => {
        setState(({ year, month }) => {
        if (month === FIRST_MONTH) {
            return {
            year: year - 1,
            month: LAST_MONTH,
            };
        } else {
            return { year, month: month - 1 };
        }
        });
    };
    
    const getMonthDateSlots = (month, year) => {
        let endDate = new Date(year, month+1, 0);
        let startDate = new Date(year, month);
        let startDateDay = startDate.getDay();
        let endDateDay = endDate.getDay();
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
        for(let i=endDateDay; i<=DAYS_IN_WEEK; i++){
            datesToDisplay.push("");
        }
        
        let currentWeek = [];
        let weeksOfMonth = [];
        datesToDisplay.forEach((day, i)=>{
            if (i % DAYS_IN_WEEK !== 0) {
                currentWeek.push(day)
            } else {
                weeksOfMonth.push(currentWeek);
                currentWeek = [];
                currentWeek.push(day)
            }
        })
        return weeksOfMonth;
    }

    const weeksOfMonth = getMonthDateSlots(month, year);

    return (
        <>
            <table className="calender">
                <tbody>
                    <tr>
                        {
                            weekDays.map(day=>
                                <th>{day}</th>
                            )
                        }
                    </tr>
                    {weeksOfMonth && weeksOfMonth.map((week)=>
                        <tr>
                            {week && week.map((day)=>
                                <td>{day}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="month-toggle">
                <button id="previous" className="btn" onClick={handlePrevious}>Previous</button>
                <span>{months[month]}, {year}</span>
                <button id="next" className="btn" onClick={handleNext}>Next</button>
            </div>
        </>
    )
}