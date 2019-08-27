const SET_CIRCLE_CENTER = 'SET_CIRCLE_CENTER';
const SET_CIRCLE_RADIUS = 'SET_CIRCLE_RADIUS';
const ADD_POLYGON_POINT = 'ADD_POLYGON_POINT';

let initialState = {
    circle: {
        center: {x: 300, y: 200},
        radius: 10,
        area: null,
    },
    polygon: {
        points: [{x: 150, y: 200}, {x: 160, y: 270}, {x: 100, y: 90}],
        area: null,
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
        default:
            return state;
    }
};

export const setCircleCenter = (x, y) => ({type: SET_CIRCLE_CENTER, x, y});
export const setCircleRadius = (r) => ({type: SET_CIRCLE_RADIUS, r});
export const addPolygonPoint = (payload) => ({type: ADD_POLYGON_POINT, payload});


export const getCircleArea = (state) => {
    return Math.PI * state.map.circle.radius ** 2
};
export const getPolygonArea = (state) => {
    let points = state.map.polygon.points;
    let s = 0;
    for (let i1 = 0; i1 < points.length; i1++) {
        let i2 = (i1 + 1) % points.length;
        s += (points[i1].x + points[i2].x) * (points[i1].y - points[i2].y);
    }
    return s < 0 ? -s / 2 : s / 2;
};

export const getInterArea = (state) => {
    let w = 800;
    let h = 600;

    let intersectionsPixels = 0;
    let {circle} = state.map;
    debugger;
    for (let i = 0; i < w - 1; i++) {
        for (let j = 0; j < h - 1; j++) {
            let insideCircle = pointInCircle(i, j, circle.center.x, circle.center.y, circle.radius);
            if (!insideCircle) continue;

            let insidePolyResult = insidePoly(state.map.polygon.points, i, j);
            if (insidePolyResult) intersectionsPixels++;
        }
    }

    return intersectionsPixels;
};

function insidePoly(poly, pointX, pointY) {
    let i, j;
    let inside = false;
    for (i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        if (((poly[i].y > pointY) != (poly[j].y > pointY)) && (pointX < (poly[j].x - poly[i].x) * (pointY - poly[i].y) /
            (poly[j].y - poly[i].y) + poly[i].x)) inside = !inside;
    }
    return inside;
};

// x,y is the point to test
// cx, cy is circle center, and radius is circle radius
function pointInCircle(x, y, cx, cy, radius) {
    let distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
};

export default mapReducer;