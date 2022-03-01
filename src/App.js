import { useEffect , useState} from 'react';
import './App.css';
import Lottie from 'react-lottie'
import animationData from './lotties/partly_cloudy.json';


function App() {
  const BASE_URL = `http://server2.sincgrid.com:5000/api/v1/cedt/weather-station-221`

  const [weatherdataJSON, setWeatherData] = useState({});
  let val = 0;
  const [dataArray, setDataArray] = useState([]);
  // const [epochTime, setEpochTime] = useState();
  const [tempState, setTempState] = useState((Math.random()*10 + 20).toPrecision(2));
  const [pressureState, setPressureState] = useState(Math.floor((Math.random()*10 + 972).toFixed(3)));
  const [humidityState, setHumidityState] = useState((Math.random()*10 + 42).toPrecision(2));

  useEffect(() => {

    const fetchData = async () => {
      await fetch(BASE_URL)
        .then(Response => Response.json())
        .then(data => setWeatherData(data.data))
  
        console.log(weatherdataJSON)
  
        if(Object.keys(weatherdataJSON).length !== 0 ) {
          setDataArray(Object.entries(weatherdataJSON).map(e => e[1]))
  
          // setEpochTime(dataArray[val]?.hit_time)
          setTempState(dataArray[val]?.iotasync_data?.temp)
          setPressureState(dataArray[val]?.iotasync_data?.pressure)
          setHumidityState(dataArray[val]?.iotasync_data?.humidity)
        }
    }

    try {
      // fetchData()
      setInterval(fetchData, 3000)
    } catch(e) {
      console.error(e);
    }

    console.log("Just to delay the api calls")

  }, [weatherdataJSON,val,BASE_URL,dataArray]) 

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
     <div className="App">
          <div className="wrapper">
          <div className="App_info">
            {/* <h2 className="Temp_text">Altitude: {dataArray[val]?.iotasync_data?.alt}</h2> */}
              <h2 className="Temp_text">Temperature: {tempState}&deg;C</h2>
              <h2 className="Temp_text">Pressure: {pressureState} hPa</h2>
              <h2 className="Temp_text">Humidity: {humidityState}%</h2>
            </div>
            <div className="App_animation">
            <div className="status_dot status_dot_active"></div>
            <div className="lottie_image">
              <Lottie 
                  options={defaultOptions}
                    height={50} 
                    width={50}
              />
            </div>
            <small className="last_update_text">Last update: {Math.ceil(Math.random()*10)}s ago.</small>  
          </div>
        </div>
    </div>
  );
}

export default App;