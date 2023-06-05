// import logo from './logo.svg';
import Timeline from './Components/Timeline';
import moment from 'moment';
// import TimelineSecond from './Components/TimelineSecond';
import React, { useState, useEffect } from 'react'
import './Components/style.scss'
import axios from 'axios'
import Tooltip from './Components/Tooltip';

function App() {

  const [dates, setDates] = useState('')

  const getData = async () => {
    try {
      let { data } = await axios.get('https://dpg.gg/test/calendar.json')
      setDates(data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getData()
  }, [])


  const daysInYear = {};
  for (let i = 0; i <= 357; i++) {
    const date = moment().subtract(i, 'days');
    const formattedDate = date.format('YYYY-MM-DD');
    Object.assign(daysInYear, { [formattedDate]: 0 });
  }

  Object.assign(daysInYear, dates);


  let startDate = moment().subtract(357, 'day');
  let dateRange = [startDate, moment()];

  let data = Object.entries(daysInYear).map(([date, count]) => {
    return {
      date: date,
      value: count
    };
  });




  return (
    <>
      <Timeline range={dateRange} data={data} />
    </>
  );
}

export default App;
