import { useEffect, useState } from "react";
import "./App.css";
import {
  IoMdCloudy,
  IoMdRainy,
  IoMdSunny,
  IoMdThunderstorm,
  IoMdSnow,
} from "react-icons/io";
import {
  BsCloudDrizzleFill,
  BsCloudFog2Fill,
  BsCloudHaze2Fill,
  BsEye,
  BsThermometer,
  BsWater,
  BsWind,
} from "react-icons/bs";
import clear from "./assets/clear.jpg";
import clouds from "./assets/clouds.jpg";
import snow from "./assets/snow.jpg";
import thunderstorm from "./assets/thunderstorm.jpg";
import drizzle from "./assets/drizzle.jpg";
import rain from "./assets/rain.jpg";
import haze from "./assets/haze.jpg";
import mist from "./assets/mist.jpg";
import DateTime from "./components/Date";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("goa");
  const [error, setError] = useState(null);

  const WeatherData = async (location) => {
    const apiKey = "a90d26150fdd28fc794cc8b38bcf6f73";
    try {
      const api = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      );
      const res = await api.json();
      if (res.cod !== 200) {
        setError("No city or country found");
        setData(null);
      } else {
        setData(res);
        setError(null);
      }
      console.log(res);
    } catch (err) {
      setError("An error occurred while fetching data");
      setData(null);
      console.log(err);
    }
  };

  useEffect(() => {
    WeatherData(location);
  }, [location]);

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setLocation(e.target.value);
      e.target.value = "";
    }
  };

  let icon, background;
  const weather = data?.weather ? data.weather[0].main : null;

  switch (weather) {
    case "Clouds":
      icon = <IoMdCloudy />;
      background = clouds;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      background = haze;
      break;
    case "Mist":
      icon = <BsCloudFog2Fill />;
      background = mist;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      background = rain;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      background = clear;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      background = drizzle;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      background = snow;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      background = thunderstorm;
      break;
    default:
      background = null;
      icon = null;
  }

  return (
    <>
      {data ? (
        <div className="app">
          <img src={background} alt="" className="weather_image" />
          <div className="container">
            <div className="left_side">
              <p className="top_side">{data.name}</p>

              <div className="bottom_side">
                <p className="weather">{weather}</p>
                <div className="border"></div>

                <div className="weather_description">
                  <div className="weather_card">
                    <div className="weather_desc">
                      <BsEye />
                      <p>Visibility </p>
                    </div>
                    <p className="weather_detail">
                      {" "}
                      {data.visibility / 1000} KM
                    </p>
                  </div>

                  <div className="weather_card">
                    <div className="weather_desc">
                      <BsThermometer />
                      <p>Feels Like</p>
                    </div>
                    <p className="weather_detail">
                      {" "}
                      {parseInt(data.main.feels_like)} °F
                    </p>
                  </div>

                  <div className="weather_card">
                    <div className="weather_desc">
                      <BsWater />
                      <p>Humidity</p>
                    </div>
                    <p className="weather_detail"> {data.main.humidity} % </p>
                  </div>

                  <div className="weather_card">
                    <div className="weather_desc">
                      <BsWind />
                      <p>Wind</p>
                    </div>
                    <p className="weather_detail"> {data.wind.speed} MPH </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="right_side">
              <input
                type="text"
                placeholder="Search"
                onKeyDown={handleSubmit}
                className="input"
              />

              <div className="right_side_description">
                <div className="icon">{icon}</div>
                <p className="temp">
                  {parseInt(data.main ? data.main.temp : null)} °F
                </p>
                <div className="border_two"></div>
                <div className="left_side_card">
                  <div className="weather_card">
                    <div className="right_side_weather">
                      <BsThermometer />
                      <p>Max Temp : {parseInt(data.main.temp_max)} °F</p>
                    </div>
                  </div>

                  <div className="weather_card">
                    <div className="right_side_weather">
                      <BsThermometer />
                      <p>Min Temp : {parseInt(data.main.temp_min)} °F</p>
                    </div>
                  </div>
                </div>
              </div>

              <DateTime />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="error">
            <input
              type="text"
              placeholder="Search"
              onKeyDown={handleSubmit}
              className="input"
            />
            {error}
          </div>
        </>
      )}
    </>
  );
}

export default App;
