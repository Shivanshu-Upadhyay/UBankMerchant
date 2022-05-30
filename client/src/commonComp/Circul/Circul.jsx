import React from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './circul.css'
function Circul({value,text,pathColor,textColor,trailColor}) {
  return (
    <>
      <div className="bgcolor">
        <CircularProgressbar
          value={value}
          text={text}
          styles={buildStyles({
            pathColor: pathColor,
            textColor: textColor,
            trailColor: trailColor,
          })}
        />
      </div>
    </>
  );
}

export default Circul