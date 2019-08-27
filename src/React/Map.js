import React, {useState} from 'react';
import {connect} from "react-redux";
import {addPolygonPoint, setCircleCenter, setCircleRadius, getCircleArea, getPolygonArea} from "../Redux/mapReducer";

const drawModes = {
    OFF: 'OFF',
    SET_CIRCLE_CENTER: 'SET_CIRCLE_CENTER',
    SET_CIRCLE_RADIUS: 'SET_CIRCLE_RADIUS',
    SET_POLYGON_POINT: 'SET_POLYGON_POINT',
};

function Map(props) {

    const [drawMode, setDrawMode] = useState(drawModes.OFF);
    const [tempPolygonPoint, setTempPolygonPoint] = useState({x: 0, y: 0});

    let polygonCoords = props.polygon.points.reduce((acc, el) => {
        acc.push(`${el.x},${el.y}`);
        return acc;
    }, []);

    if (drawMode === drawModes.SET_POLYGON_POINT) {
        polygonCoords.push(`${tempPolygonPoint.x},${tempPolygonPoint.y}`);
    }

    const onMouseMove = (e) => {
        if (drawMode === drawModes.SET_CIRCLE_RADIUS) {
            let x1 = props.circle.center.x;
            let y1 = props.circle.center.y;
            let x2 = e.clientX;
            let y2 = e.clientY;
            const radius = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            props.setCircleRadius(radius);
        } else if (drawMode === drawModes.SET_POLYGON_POINT) {
            setTempPolygonPoint({x: e.clientX, y: e.clientY})
        }
    };

    const rightClick = (e) => {
        e.preventDefault();
        setDrawMode(drawModes.OFF);
    };

    const onMapClick = (e) => {
        switch (drawMode) {
            case drawModes.SET_CIRCLE_CENTER: {
                props.setCircleCenter(e.clientX, e.clientY);
                setDrawMode(drawModes.SET_CIRCLE_RADIUS);
                break
            }
            case drawModes.SET_CIRCLE_RADIUS: {
                setDrawMode(drawModes.OFF);
                break
            }
            case drawModes.SET_POLYGON_POINT: {
                props.addPolygonPoint({x: e.clientX, y: e.clientY});
                break
            }
        }
    };

    return (
        <>
            <div className="map">

                <div className='buttons-panel'>
                    <button onClick={() => setDrawMode(drawModes.SET_POLYGON_POINT)}>P</button>
                    <button onClick={() => setDrawMode(drawModes.SET_CIRCLE_CENTER)}>C</button>
                    <div>Circle area:{props.circleArea}</div>
                    <div>Polygon area:{props.polygonArea}</div>
                </div>
                <svg width="800px" height="600px" onClick={onMapClick} onContextMenu={rightClick}
                     onMouseMove={onMouseMove}>

                    <circle cx={props.circle.center.x} cy={props.circle.center.y} r={props.circle.radius} stroke="black"
                            stroke-width="3" fill="red"/>

                    <polygon points={polygonCoords.join(' ')}/>

                </svg>

            </div>


        </>

    );
}

const mapStateToProps = (state) => {
    return {
        map: state.map,
        circle: state.map.circle,
        polygon: state.map.polygon,
        circleArea: getCircleArea(state),
        polygonArea: getPolygonArea(state),
    }
};

export default connect(mapStateToProps, {setCircleRadius, setCircleCenter, addPolygonPoint})(Map);
