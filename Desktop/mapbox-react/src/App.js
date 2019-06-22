import React,{useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import svg from './skating-sign.svg';
import * as parkDate from './data/skateboard-parks.json'
import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    latitude:45.4211,
    longitude:-75.6983,
    zoom:10,
    width:"100vw",
    height:"100vh",
  });
  const [selectedPark, setSelectedPark] = useState(null);
  useEffect(()=>{
    const listener = e=>{
      if(e.key==="Escape")
      {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);
  },[]);

  return (
    <div>
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/cipher97/cjx6f1gzf1nke1ds4onlkuh4c"
      onViewportChange={(viewport)=>setViewport(viewport)}
      >
        {parkDate.features.map(park=>(
          <Marker key={park.properties.PARK_ID} latitude={park.geometry.coordinates[1]} longitude={park.geometry.coordinates[0]}>
            <button className="marker-btn" onClick={(e)=>{
              e.preventDefault();
              setSelectedPark(park);
            }}>
              <img src={svg} width="20px" height="20px"alt="skateboard-icon"/>
            </button>
          </Marker>
        ))}
        {selectedPark && (
          <Popup latitude={selectedPark.geometry.coordinates[1]} longitude={selectedPark.geometry.coordinates[0]} onClose={()=>setSelectedPark(null)}>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
