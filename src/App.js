import { useCallback, useEffect , useState } from 'react';
import './App.css';
import axios from 'axios';
import useTimeout from './useTimeout';
import moon from './lotties/moon.svg'
import sun from './lotties/sun.svg'

function App() {

  const BASE_URL = `http://server2.sincgrid.com:5000/api/v1/cedt/weather-station-221`

  const [weatherdataJSON, setWeatherData] = useState({});
  let val = 0;
  
  // const [tempState, setTempState] = useState(((Math.random()*10 + 20).toPrecision(2)));
  // const [pressureState, setPressureState] = useState((Math.floor((Math.random()*10 + 972).toFixed(3))));
  // const [humidityState, setHumidityState] = useState(((Math.random()*10 + 42).toPrecision(2)));

  const fetchData = async () => {
      await fetch(BASE_URL)
            .then(Response => Response.json())
            .then((dataToBeFetched) => setWeatherData(dataToBeFetched.data))
            .catch((error) => console.error(error))


            // setTempState(weatherdataJSON?.data?.iotasync_data?.temp)
            // setPressureState(weatherdataJSON?.data?.iotasync_data?.pressure)
            // setHumidityState(weatherdataJSON?.data?.iotasync_data?.humidity)
      // console.log(`${tempState} : ${pressureState} : ${humidityState}  `)

      // dataSetter()
      // setDataArray(Object.entries(weatherdataJSON).map(e => e[1]))
      // console.log(dataArray)
  }



  // const dataSetter = async () => {
  //   await setDataArray(Object.entries(weatherdataJSON).map(e => e[1]))
  // } 

  // let i = 0;

  useEffect(() => {
    const timer = setInterval(fetchData, 4000);
    // console.log("After function call")
    // console.log(weatherdataJSON.data[0])
    // console.log(weatherdataJSON.data[0])
    // console.log(weatherdataJSON.data[0])

    console.log(weatherdataJSON)

    return () => clearInterval(timer)
  }, []) 

  // console.log()
  
  console.log(weatherdataJSON)

  return (
     <div className="App">
          <div className="wrapper">
          <div className="App_info">
            {/* <h2 className="Temp_text">Altitude: {dataArray[val]?.iotasync_data?.alt}</h2> */} 
               <h2 className="Temp_text">
                Temperature: {weatherdataJSON[0]?.iotasync_data?.temp}
              </h2>
               <h2 className="Temp_text">Pressure: {weatherdataJSON[0]?.iotasync_data?.pressure}</h2>
              <h2 className="Temp_text">Humidity: {weatherdataJSON[0]?.iotasync_data?.humidity}</h2>
            </div>
            <div className="App_animation">
              <div className={`status_dot ${weatherdataJSON?.status === "online" ? "status_dot_active" : "" }`}></div>
                <div className="lottie_image">
                  {
                    weatherdataJSON?.day_cycle === "moon" && (<img src={moon} width="40px" height="40px" alt="NF" />)
                  }
                  {
                    weatherdataJSON?.day_cycle === "sun"  && (<img src={sun} width="43px" height="43px" alt="NF" />)
                  }
                </div>
            <small className="last_update_text">Last update: {(Math.floor(Math.random()*10))}s ago.</small>  
          </div>
        </div>
    </div>
  );
}

export default App;


// (tempState) ? tempState +  (tempState === "Connecting..." ? "": `°C`) : 'Updating..'
// (humidityState) ? humidityState + (humidityState === "Connecting..." ? "": `%`) : 'Updating..'
// (pressureState) ? pressureState + (pressureState === "Connecting..." ? "": ` hPa`) : 'Updating..'

// const BASE_URL = `http://server2.sincgrid.com:5000/api/v1/cedt/weather-station-221`

// const [weatherdataJSON, setWeatherData] = useState({});
// let val = 0;
// const [dataArray, setDataArray] = useState([]);
// const [epochTime, setEpochTime] = useState();
// const [tempState, setTempState] = useState(((Math.random()*10 + 20).toPrecision(2)).toString());
// const [pressureState, setPressureState] = useState((Math.floor((Math.random()*10 + 972).toFixed(3))).toString());
// const [humidityState, setHumidityState] = useState(((Math.random()*10 + 42).toPrecision(2)).toString());
// // const [reTimer, setReTimer] = useState(false)



// const fetchData = async () => {
//   // try {

//     await fetch(BASE_URL)
//           .then(Response => Response.json())
//           .then((dataToBeFetched) => setWeatherData(dataToBeFetched))
//           .catch((error) => console.error(error))

          
//     // console.log(weatherdataJSON)
//     // console.log(1)

//     // await reTime()
    
//       // setDataArray(Object.entries(weatherdataJSON).map(e => e[1]))

//     // if(Object.keys(weatherdataJSON).length !== 0 ) {
//     // }

//   // } catch(e) {
//   //   console.error(e)
//   // } 
// }



// // const dataSetter = async () => {
// //   await setDataArray(Object.entries(weatherdataJSON).map(e => e[1]))
// // } 

// const datasetter = useCallback(() => {
//   setDataArray(Object.entries(weatherdataJSON).map(e => e[1]))
//   console.log(dataArray)
// }, [weatherdataJSON])


// // let i = 0;

// useEffect(() => {

//   // if(i === 0) {
//   //   fetchData()
//   //   i = 100;
//   // }

//   // console.log("i= " + i)

//   // i = 10;
//   // console.log("i= " + 10)
//   // const timer = setInterval(()=>{
//     // fetchData()
//     // datasetter()
//     // dataSetter()

//     // console.log(dataArray)

//     // setEpochTime((Date.now() / 1000))
    // setTempState(dataArray[val]?.iotasync_data?.temp)
    // setPressureState(dataArray[val]?.iotasync_data?.pressure)
    // setHumidityState(dataArray[val]?.iotasync_data?.humidity)
//   //  },2000)
//   //  console.log("Just to delay the api calls")   
//    console.log(weatherdataJSON)
//   //  
//   // return () => clearInterval(timer)
// }, [weatherdataJSON]) 