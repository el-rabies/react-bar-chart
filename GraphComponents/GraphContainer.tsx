import React, { useRef, useState } from "react";
import "./GraphContainer.css";
import { BarComponent } from "./BarComponent.tsx";

export interface GraphContainerProps {
  graphHeight:number
  graphWidth:number
  graphTitle:string
  dataset: string[];
}

const RenderNumber = (number: number) => {
  return <div>{Math.round(number)}</div>;
};

const RenderNumList = (pxPerIncrement: number, largestNum: number) => {
  let numList:React.JSX.Element[] = [];
  let vertNum:number = Math.ceil((largestNum*pxPerIncrement)/18)
  let interval:number = Math.round(largestNum/vertNum)
  console.log("Inverval, Repeats, Largests: ", interval, vertNum, largestNum)
  for (let i: number = largestNum+interval; i >= 0; i -= interval) {
    numList.push(RenderNumber(i));
  }
  return numList;
};

const AggregateData = (dataset: string[], dataTypes: string[]) => {
  const incrementsList: number[] = [];
  incrementsList.length = dataTypes.length;
  incrementsList.fill(0);
  for (let i: number = 0; i < dataset.length; i++) {
    for (let j: number = 0; j < dataTypes.length; j++) {
      if (dataset[i] === dataTypes[j]) {
        incrementsList[j] += 1;
      }
    }
  }
  return incrementsList;
};

const FindLargest = (numberOf: number[]) => {
  let largest: number = 0;
  for (let i = 0; i < numberOf.length; i++) {
    if (numberOf[i] > largest) {
      largest = numberOf[i];
    }
  }
  return largest;
};

const GetBarWidth = (width,numberOfBars) => {
  return ((width-52-(8*numberOfBars))/numberOfBars)
}

const GetPxPerIncrement = (height,largest) => {
    return ((height-92)/largest)  
}

export const GraphContainer = ({ dataset,graphHeight,graphWidth,graphTitle }: GraphContainerProps) => {
  let dataTypes: string[] = [...new Set(dataset)];
  let numberOf: number[] = AggregateData(dataset, dataTypes);
  let pxPerIncrement:number = (graphHeight-92)/FindLargest(numberOf)
  let barWidth:number = (graphWidth-52-(8*dataTypes.length))/dataTypes.length;

  return (
    <div className="graph-box" style={{height:graphHeight, width:graphWidth}}>
      <div className="header">{graphTitle}</div>
      <div className="graph-area">
        <div className="vertical-axis">
          {RenderNumList((pxPerIncrement), FindLargest(numberOf))}
          <svg height={18} width={20}/>
        </div>
        {dataTypes.map((dataPoint, index) => (
          <BarComponent
            barWidth={barWidth}
            pxPerIncrement={pxPerIncrement}
            increment={numberOf[index]}
            label={dataPoint}
            id={index}
          />
        ))}
      </div>
    </div>
  );
};
