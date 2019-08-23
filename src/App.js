import React from 'react';
import './App.css';
import Map from "./React/Map";

function App() {
    return (
        <div className="App">

            <Map/>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        map: state.map
    }
};

export default App;
