import React, {useEffect} from 'react';
import './App.css';
import Map from "./React/Map";
import {connect} from "react-redux";
import {setMapSize} from "./Redux/mapReducer";

function App(props) {

    props.setMapSize({width: window.innerWidth, height: window.innerHeight});

    let handleResize = () => {
        props.setMapSize({width: window.innerWidth, height: window.innerHeight});
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    });


    return (
        <div className="App">

            <Map/>

        </div>
    );
}

export default connect(null, {setMapSize})(App);
