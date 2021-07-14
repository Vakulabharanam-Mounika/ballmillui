import React from 'react';
import Axis from './axis';
const XYAxis = ({ xScale, yScale, height }) => {
    const xSettings = {
        scale: xScale,
        orient: 'bottom',
        transform: `translate(0, ${height})`,
        ticks:5,
        labelString:"time",
    };
    const ySettings = {
        scale: yScale,
        orient: 'left',
        transform: 'translate(0, 0)',
        ticks: 6,
    };
    return (
        <g className="axis-group">
            <Axis {...xSettings}

            />
            <Axis {...ySettings} />
        </g>
    );
};
export default XYAxis;