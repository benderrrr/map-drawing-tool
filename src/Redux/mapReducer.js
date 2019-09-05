const SET_CIRCLE_CENTER = 'SET_CIRCLE_CENTER';
const SET_CIRCLE_RADIUS = 'SET_CIRCLE_RADIUS';
const ADD_POLYGON_POINT = 'ADD_POLYGON_POINT';
const SET_MAP_SIZE = 'SET_MAP_SIZE';
const CLEAR_CIRCLE = 'CLEAR_CIRCLE';
const CLEAR_POLYGON = 'CLEAR_POLYGON';

let initialState = {
    mapSize: {},
    circle: {
        center: {x: 300, y: 300},
        radius: 200,
    },
    polygon: {
        points: [{x: 400, y: 100}, {x: 700, y: 100}, {x: 700, y: 500}, {x: 400, y: 500}],
    }
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CIRCLE_CENTER :
            return {...state, circle: {...state.circle, center: {x: action.x, y: action.y}}};
        case SET_CIRCLE_RADIUS :
            return {...state, circle: {...state.circle, radius: action.r}};
        case ADD_POLYGON_POINT :
            return {...state, polygon: {...state.polygon, points: [...state.polygon.points, action.payload]}};
        case CLEAR_POLYGON :
            return {...state, polygon: {...state.polygon, points: []}};
        case CLEAR_CIRCLE :
            return {...state, circle: {...state.circle, radius: 0}};
        case SET_MAP_SIZE : {
            return {...state, mapSize: action.payload};
        }
        default:
            return state;
    }
};

export const setCircleCenter = (x, y) => ({type: SET_CIRCLE_CENTER, x, y});
export const setCircleRadius = (r) => ({type: SET_CIRCLE_RADIUS, r});
export const addPolygonPoint = (payload) => ({type: ADD_POLYGON_POINT, payload});
export const clearPolygon = () => ({type: CLEAR_POLYGON});
export const clearCircle = () => ({type: CLEAR_CIRCLE});
export const setMapSize = (payload) => ({type: SET_MAP_SIZE, payload});


export const getCircleArea = (state) => {
    return Math.PI * state.map.circle.radius ** 2
};

export const getPolygonArea = (state) => {
    let points = state.map.polygon.points;
    let s = points.reduce((acc, el, index, array) => {
        let i2 = (index + 1) % array.length;
        return acc + (el.x + array[i2].x) * (el.y - array[i2].y);
    }, 0);
    return Math.abs(s / 2);
};

export const getInterArea = (state) => {
    let w = state.map.mapSize.width;
    let h = state.map.mapSize.height;
    let {circle, polygon} = state.map;
    let intersectionsPixels = 0;

    for (let i = 0; i < w - 1; i++) {
        for (let j = 0; j < h - 1; j++) {
            let insideCircle = pointInCircle(i, j, circle.center.x, circle.center.y, circle.radius);
            let insidePolyResult = insidePoly(polygon.points, i, j);
            if (insideCircle && insidePolyResult || insideCircle && !insidePolyResult || !insideCircle && insidePolyResult)
                intersectionsPixels++;
        }
    }

    return intersectionsPixels;
};

let insidePoly = (poly, pointX, pointY) => {
    let inside = false;

    poly.forEach((el, index, array) => {
        let j;
        index !== 0 ? j = index - 1 : j = poly.length - 1;
        if (((array[index].y > pointY) !== (array[j].y > pointY)) && (pointX < (array[j].x - array[index].x) * (pointY - array[index].y) /
            (array[j].y - array[index].y) + array[index].x)) inside = !inside;
    }, 0);

    return inside;
};

// x,y is the point to test
// cx, cy is circle center, and radius is circle radius
let pointInCircle = (x, y, cx, cy, radius) => {
    let distanceSquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distanceSquared <= radius * radius;
};

export default mapReducer;