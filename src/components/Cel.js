import React from 'react';

const Cel = ({isOn}) => (
    <div className={`matrixCel ${isOn ? 'on' : 'off'}`}></div>
)

export default Cel;