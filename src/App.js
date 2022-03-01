import { useEffect , useState} from 'react';
import './App.css';
import Lottie from 'react-lottie'
import animationData from './lotties/partly_cloudy.json';
import axios from 'axios';
import useTimeout from './useTimeout';
import moon from './lotties/moon.svg'
import sun from './lotties/sun.svg'

function App() {

  const BASE_URL = `http://server2.sincgrid.com:5000/api/v1/cedt/weather-station-221`

  const [weatherdataJSON, setWeatherData] = useState({});
  let val = 0;
  const [dataArray, setDataArray] = useState([]);
  const [epochTime, setEpochTime] = useState();
  const [tempState, setTempState] = useState("Connecting...");
  const [pressureState, setPressureState] = useState("Connecting...");
  const [humidityState, setHumidityState] = useState("Connecting...");
  // const [reTimer, setReTimer] = useState(false)

  // ((Math.random()*10 + 20).toPrecision(2)).toString()
  // (Math.floor((Math.random()*10 + 972).toFixed(3))).toString()
  // ((Math.random()*10 + 42).toPrecision(2)).toString()


  const fetchData = async () => {
    try {

      const dataToBeFetched = await axios.get(BASE_URL)
    
      setWeatherData(dataToBeFetched.data.data);

      console.log(dataArray)
      // console.log(1)

      // await reTime()
      
      setDataArray(Object.entries(weatherdataJSON).map(e => e[1]))

      if(Object.keys(weatherdataJSON).length !== 0 ) {
        setEpochTime((Date.now() / 1000))
        setTempState(dataArray[val]?.iotasync_data?.temp)
        setPressureState(dataArray[val]?.iotasync_data?.pressure)
        setHumidityState(dataArray[val]?.iotasync_data?.humidity)
      }

    } catch(e) {
      console.error(e)
    } 
  }


  useEffect(() => {
    // fetchData()
    const timer = setInterval(()=>{
      fetchData()
     },6000)
     console.log("Just to delay the api calls")   
     console.log(weatherdataJSON)
     
     return () => clearInterval(timer)
  }, [weatherdataJSON]) 



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
              <h2 className="Temp_text">
                Temperature: {(tempState) ? tempState +  (tempState === "Connecting..." ? "": `°C`) : 'Updating..'}
              </h2>
              <h2 className="Temp_text">Pressure: {(pressureState) ? pressureState + (pressureState === "Connecting..." ? "": ` hPa`) : 'Updating..'}</h2>
              <h2 className="Temp_text">Humidity: {(humidityState) ? humidityState + (humidityState === "Connecting..." ? "": `%`) : 'Updating..'}</h2>
            </div>
            <div className="App_animation">
              <div className={`status_dot ${dataArray[6] === "online" ? "status_dot_active" : "" }`}></div>
                <div className="lottie_image">
                  {
                    dataArray[8] === "moon" && (<img src={moon} width="40px" height="40px" alt="NF" />)
                  }
                  {
                    dataArray[8] === "sun"  && (<img src={sun} width="43px" height="43px" alt="NF" />)
                  }
                </div>
            <small className="last_update_text">Last update: {(Math.floor(Math.random()*10))}s ago.</small>  
          </div>
        </div>
    </div>
  );
}

export default App;