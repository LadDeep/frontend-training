import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <table id="calender">
        <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
        </tr>
      </table>
      <div className="month-toggle">
          <button id="previous" className="btn">Previous</button>
          <span id="month-and-year"></span>
          <button id="next" className="btn">Next</button>
      </div>
    </div>
  );
}

export default App;
