import React from "react";
import "./style.scss";
import moment from "moment";
import Tooltip from "./Tooltip";

const Timeline = ({ range, data }) => {
  const DayNames = {
    0: "Пн.",
    2: "Ср.",
    4: "Пт.",
  };

  function Cell({ num }) {
    let color =
      num > 30
        ? "#254E77"
        : num < 30 && num >= 20
        ? "#527BA0"
        : num < 20 && num >= 10
        ? "#7FA8C9"
        : num < 10 && num > 0
        ? "#ACD5F2"
        : "#EDEDED";

    let style = {
      backgroundColor: color,
    };

    return <div className="timeline-cells-cell" style={style}></div>;
  }

  function Month({ startDate, index }) {
    let date = moment(startDate)
      .add(index * 7, "day")
      .locale("en");
    let dateRu = moment(startDate).add(index * 7, "day");
    let monthName = date.format("MMM");
    let monthNameRu = dateRu.format("MMM");

    return (
      <div className={`timeline-months-month ${monthName}`}>{monthNameRu}</div>
    );
  }

  function WeekDay({ index }) {
    return <div className="timeline-weekdays-weekday">{DayNames[index]}</div>;
  }

  let days = Math.abs(range[0].diff(range[1], "days"));
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(7));
  let months = Array.from(new Array(Math.floor(days / 7)));

  let min = Math.min(0, ...data.map((d) => d.value));
  let max = Math.max(...data.map((d) => d.value));


  let startDate = range[0];
  const DayFormat = "DDMMYYYY";

  return (
    <div className="timeline">
      <div className="timeline-months">
        {months.map((_, index) => (
          <Month key={index} index={index} startDate={startDate} />
        ))}
      </div>

      <div className="timeline-body">
        <div className="timeline-weekdays">
          {weekDays.map((_, index) => (
            <WeekDay key={index} index={index} startDate={startDate} />
          ))}
        </div>
        <div className="timeline-cells">
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, "day");
            let dataPoint = data.find(
              (d) =>
                moment(date).format(DayFormat) ===
                moment(d.date).format(DayFormat)
            );

            let dateText = moment(dataPoint.date).format("dddd, MMMM DD, YYYY");

            return (
              <Tooltip
                text={
                  dataPoint.value > 0
                    ? dataPoint.value + " " + "contributions"
                    : "No contributions"
                }
                date={dateText}
                id={index}
              >
                <Cell
                  key={index}
                  index={index}
                  date={date}
                  num={dataPoint.value}
                />
              </Tooltip>
            );
          })}
        </div>
      </div>

      <div className="legend">
          <span>Меньше</span>
          <div className="legend-colors">
            <div className="legend-item" style={{backgroundColor: '#EDEDED'}}/>
            <div className="legend-item" style={{backgroundColor: '#ACD5F2'}}/>
            <div className="legend-item" style={{backgroundColor: '#7FA8C9'}}/>
            <div className="legend-item" style={{backgroundColor: '#527BA0'}}/>
            <div className="legend-item" style={{backgroundColor: '#254E77'}}/>
          </div>
          <span>Больше</span>
      </div> 
    </div>
  );
};

export default Timeline;
