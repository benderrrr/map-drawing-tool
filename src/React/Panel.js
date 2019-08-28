import React from "react";
import {clearCircle, clearPolygon, getCircleArea, getInterArea, getPolygonArea,} from "../Redux/mapReducer";
import {connect} from "react-redux";

const Panel = (props) => {

    const onCircleDrawClick = () => {
        props.drawMode === props.drawModes.SET_POLYGON_POINT && props.clearPolygon();
        props.clearCircle();
        props.setDrawMode(props.drawModes.SET_CIRCLE_CENTER);
    };

    const onPolygonDrawClick = () => {
        props.drawMode === props.drawModes.SET_CIRCLE_RADIUS && props.clearCircle();
        props.clearPolygon();
        props.setDrawMode(props.drawModes.SET_POLYGON_POINT);
    };

    const onClearClick = () => {
        props.setDrawMode(props.drawModes.OFF);
        props.clearPolygon();
        props.clearCircle();
    };

    return (
        <div className='panel'>
            <div className='buttons'>
                <div>
                    <button onClick={onPolygonDrawClick}>Draw polygon</button>
                </div>
                <div>
                    <button onClick={onCircleDrawClick}>Draw Circle</button>
                </div>
                <div>
                    <button onClick={onClearClick}>Clear field</button>
                </div>
            </div>

            <div className='area'>
                <div>Circle area: <div>{Math.round(props.circleArea)}px</div></div>
                <div>Polygon area: <div>{Math.round(props.polygonArea)}px</div></div>
                <div>Common area: <div>{props.interArea}px</div></div>
            </div>
        </div>)
};

const mapStateToProps = (state) => {
    return {
        circleArea: getCircleArea(state),
        polygonArea: getPolygonArea(state),
        interArea: getInterArea(state),
    }
};

export default connect(mapStateToProps, {clearCircle, clearPolygon})(Panel);