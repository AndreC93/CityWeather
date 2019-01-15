import React from 'react'

export default function TempContainer(props) {
  const [temp, tempMin, tempMax] = props.temps;
  return (
    <div className="tempContainer">
      <div className="temp">{temp}°F</div>
      <div className='lowHigh'>{tempMin}°F - {tempMax}°F</div>
    </div>
  )
};
