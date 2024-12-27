import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [citiesWeather, setCitiesWeather] = useState([]);

  const fetchCitiesWeather = async () => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const cities = ["Istanbul", "Ankara", "Izmir"];
    const promises = cities.map((city) =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`
      )
    );

    try {
      const responses = await Promise.all(promises);
      setCitiesWeather(
        responses.map((res) => {
          const tempCelsius = Math.round(res.data.main.temp);
          const tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32);
          return {
            name: res.data.name,
            tempCelsius,
            tempFahrenheit,
            condition: res.data.weather[0].description,
          };
        })
      );
    } catch (err) {
      console.error("Hava durumu bilgisi alınamadı.", err);
    }
  };

  useEffect(() => {
    fetchCitiesWeather();
  }, []);

  const fetchWeather = async () => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError("");
      setBackgroundColor("#1e1e1e");
    } catch (err) {
      setWeatherData(null);
      setError("Şehir bulunamadı veya API hatası oluştu.");
      setBackgroundColor("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  const handleAboutClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 style={{ textAlign: "center" }}>BTE311 Hava Durumu</h1>
      </header>
      <div className="search-container" style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          className="search-box"
          placeholder="Aramak istediğiniz şehiri yazınız."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={fetchWeather} style={{ marginLeft: "10px" }}>
          Ara
        </button>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {weatherData && (
        <div
          className="weather-container"
          style={{ backgroundColor: backgroundColor, marginTop: "30px" }}
        >
          <Weather data={weatherData} />
        </div>
      )}

      <button className="about-button" onClick={handleAboutClick}>
        Hakkında
      </button>

      {showPopup && (
        <div className="popup-alert">
          <p>Furkan Akıncı - 2210780039</p>
          <button className="btn btn-secondary" onClick={closePopup}>
            Kapat
          </button>
        </div>
      )}

      <div className="popular-cities-panel" style={{ marginTop: "20px" }}>
        <h2 style={{ color: "#f3f3f3", textAlign: "center" }}>Büyük Şehirler</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {citiesWeather.map((city, index) => (
            <div
              key={index}
              className="popular-city"
              style={{
                backgroundColor: "#2e2e2e",
                color: "white",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <h4 style={{ color: "#0ac2ff" }}>{city.name}</h4>
              <p>
                {city.tempCelsius}°C ({city.tempFahrenheit}°F)
              </p>
              <p>{city.condition.charAt(0).toUpperCase() + city.condition.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
