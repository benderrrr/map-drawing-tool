import React, {useState} from "react";
import {addPolygonPoint, setCircleCenter, setCircleRadius,} from "../Redux/mapReducer";
import {connect} from "react-redux";

const SVG = (props) => {

    const [mouseCoords, setMouseCoords] = useState({x: 0, y: 0});
    const [tempPolygonPoint, setTempPolygonPoint] = useState({x: 0, y: 0});

    let polygonCoords = props.polygon.points.reduce((acc, el) => {
        acc.push(`${el.x},${el.y}`);
        return acc;
    }, []);

    if (props.drawMode === props.drawModes.SET_POLYGON_POINT) {
        polygonCoords.push(`${tempPolygonPoint.x},${tempPolygonPoint.y}`);
    }

    const onMouseMove = (e) => {
        setMouseCoords({x: e.clientX, y: e.clientY});
        if (props.drawMode === props.drawModes.SET_CIRCLE_RADIUS) {
            let x = props.circle.center.x;
            let y = props.circle.center.y;
            const radius = Math.sqrt((mouseCoords.x - x) ** 2 + (mouseCoords.y - y) ** 2);
            props.setCircleRadius(radius);
        } else if (props.drawMode === props.drawModes.SET_POLYGON_POINT) {
            setTempPolygonPoint({x: e.clientX, y: e.clientY})
        }
    };

    const onMapClick = (e) => {
        switch (props.drawMode) {
            case props.drawModes.SET_CIRCLE_CENTER: {
                props.setCircleCenter(e.clientX, e.clientY);
                props.setDrawMode(props.drawModes.SET_CIRCLE_RADIUS);
                break
            }
            case props.drawModes.SET_CIRCLE_RADIUS: {
                props.setDrawMode(props.drawModes.OFF);
                break
            }
            case props.drawModes.SET_POLYGON_POINT: {
                props.addPolygonPoint({x: e.clientX, y: e.clientY});
                break
            }
            default:
                break;
        }
    };

    const stopDrawing = (e) => {
        e.stopPropagation();
        props.setDrawMode(props.drawModes.OFF);
    };

    return (
        <svg width={`${props.mapSize.width}px`} height={`${props.mapSize.height}px`} onClick={onMapClick}
             onMouseMove={onMouseMove}>

            <circle className='circle' cx={props.circle.center.x} cy={props.circle.center.y} r={props.circle.radius}
                    style={{...props.drawMode === props.drawModes.SET_CIRCLE_RADIUS && {strokeDasharray: "4"}}}/>
            {props.drawMode === props.drawModes.SET_CIRCLE_RADIUS &&
            <text x={mouseCoords.x + 20} y={mouseCoords.y + 20}>r = {Math.round(props.circle.radius)}</text>}

            <polygon className='polygon' points={polygonCoords.join(' ')} style={
                {...props.drawMode === props.drawModes.SET_POLYGON_POINT && {strokeDasharray: "4"}}}/>

            {props.polygon.points[2] && props.drawMode === props.drawModes.SET_POLYGON_POINT &&
            <circle onClick={stopDrawing} cx={props.polygon.points[0].x} cy={props.polygon.points[0].y} r={7}
                    style={{fill: "red", fillOpacity: "0.8", cursor: 'pointer'}}/>}

        </svg>
    )
};

const mapStateToProps = (state) => {
    return {
        mapSize: state.map.mapSize,
        circle: state.map.circle,
        polygon: state.map.polygon
    }
};

export default connect(mapStateToProps, {setCircleRadius, setCircleCenter, addPolygonPoint})(SVG);