import { useEffect , useState} from 'react';
import './App.css';
import Lottie from 'react-lottie'
import animationData from './lotties/partly_cloudy.json';


function App() {
  // const API_KEY = "89c13ea938871f343abc1e564db2d8f9"
  // const lat = "28.6667"
  // const longt = "77.2167"
  const BASE_URL = `http://server2.sincgrid.com:5000/api/v1/cedt/weather-station-221`

  const [weatherdataJSON, setWeatherData] = useState({});
  const [dataArray, setDataArray] = useState([]);
// 
  useEffect(() => {
    const timer = setTimeout(async () => {
      await fetch(BASE_URL)
      .then(Response => Response.json())
      .then(data => setWeatherData(data.data))
      
      // setDataArray()
      setDataArray(Object.entries(weatherdataJSON).map(e => e[1]))
      // Object.entries(data.data).map(e => e[1])

      console.log("Just to delay the api calls")
    }, 1500);


    console.log(dataArray)
    return () => clearTimeout(timer);
  }, [weatherdataJSON]) 

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  // let setter = false
  let val = 0;
  
  return (
    <div className="App">
      {
        dataArray.length !== 0 && (
        <div className="wrapper">
        <div className="App_info">
          {/* <h2 className="Temp_text">Altitude: {dataArray[val]?.iotasync_data?.alt}</h2> */}
            <h2 className="Temp_text">Temperature: {dataArray[val]?.iotasync_data?.temp}&deg;</h2>
            <h2 className="Temp_text">Pressure: {dataArray[val]?.iotasync_data?.pressure}</h2>
            <h2 className="Temp_text">Humidity: {dataArray[val]?.iotasync_data?.humidity}%</h2>
          </div>
          <div className="App_animation">
            <Lottie 
                options={defaultOptions}
                  height={40}
                  width={40}
          />
        </div>  
      </div>
      )
      }

    </div>
  );
}

export default App;

// {weatherdataJSON.temp_min}
// {weatherdataJSON.temp_max}
// {weatherdataJSON.humidity}