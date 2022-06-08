import React from 'react'
import SparkLineGraph from '../../REACTGRAPH/SparkLineGraph'
import SparkLineGraph2 from "../../REACTGRAPH/SparkLineGraph2";
import SplineGraph from '../../REACTGRAPH/SplineGraph'
import './style.css'
function ChartBlock() {
  return (
    <div className="row justify-content-between">
      <div className="col-6 chartblockshdow" style={{ width: "48%" }}>
        <SparkLineGraph />
      </div>
      <div className="col-6 chartblockshdow" style={{ width: "48%" }}>
        <SparkLineGraph2 />
      </div>
      <div className="col-12 chartblockshdow my-3"><SplineGraph /></div>
    </div>
  );
}

export default ChartBlock