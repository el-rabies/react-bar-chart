import React from "react";
import "./BarComponent.css";

export interface BarComponentProps {
  barWidth: number;
  pxPerIncrement: number;
  increment: number;
  label: string;
  id: number;
}

export const BarComponent = ({
  barWidth,
  pxPerIncrement,
  increment,
  label,
  id,
}: BarComponentProps) => {
  return (
    <div className="bar-container">
      <svg
        className="bar"
        width={barWidth}
        height={pxPerIncrement * increment}
        key={id}
      />
      <text>{label}</text>
    </div>
  );
};
