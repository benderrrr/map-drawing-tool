import React, {useState} from 'react';
import {connect} from "react-redux";
import Panel from "./Panel";
import SVG from "./SVG";

const drawModes = {
    OFF: 'OFF',
    SET_CIRCLE_CENTER: 'SET_CIRCLE_CENTER',
    SET_CIRCLE_RADIUS: 'SET_CIRCLE_RADIUS',
    SET_POLYGON_POINT: 'SET_POLYGON_POINT',
};

function Map(props) {

    const [drawMode, setDrawMode] = useState(drawModes.OFF);

    return (
        <div className="map" style={{width: `${props.mapSize.width}px`, height: `${props.mapSize.height}px`}}>

            <Panel drawModes={drawModes} drawMode={drawMode} setDrawMode={setDrawMode}/>

            <SVG drawModes={drawModes} drawMode={drawMode} setDrawMode={setDrawMode}/>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        mapSize: state.map.mapSize,
    }
};

export default connect(mapStateToProps, {})(Map);
