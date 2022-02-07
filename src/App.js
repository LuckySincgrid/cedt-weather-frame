import { useEffect , useState} from 'react';
import './App.css';

function App() {
  const API_KEY = "89c13ea938871f343abc1e564db2d8f9"
  const lat = "28.6667"
  const longt = "77.2167"
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longt}&appid=${API_KEY}`

  const [weatherdataJSON, setWeatherData] = useState({});
  
  // useEffect(() => {
  //   // fetch(BASE_URL)
  //   // .then(Response => Response.json())
  //   // .then(data => setWeatherData(data.main))

  //   // const timer = setTimeout(() => {
  //   //   // fetchData();
  //   //   console.log("Just to delay the api calls")
  //   // }, 5000);


  //   // console.log(weatherdataJSON)
  //   // return () => clearTimeout(timer);
  // }, [/*weatherdataJSON*/]) 

  useEffect(() => {
    

    const timer = setTimeout(() => {
      // fetchData();
      fetch(BASE_URL)
      .then(Response => Response.json())
      .then(data => setWeatherData(data.main))
      console.log("Just to delay the api calls")
    }, 5000);


    console.log(weatherdataJSON)
    return () => clearTimeout(timer);
  }, [weatherdataJSON]) 
  
  return (
    <div className="App">
      <div className="App_info">
        <h2 className="Temp_text">Min. Temperature: {weatherdataJSON.temp_min}</h2>
        <h2 className="Temp_text">Max. Temperature: {weatherdataJSON.temp_max}</h2>
        <h2 className="Temp_text">Humidity: {weatherdataJSON.humidity}</h2>
      </div>
      <div className="App_animation">
         {/* this part will have animation */}
         <iframe src="https://embed.lottiefiles.com/animation/4800"></iframe>
      </div>  
    </div>
  );
}

export default App;

// {weatherdataJSON.temp_min}
// {weatherdataJSON.temp_max}
// {weatherdataJSON.humidity}