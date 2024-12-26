import React, { useState } from "react";
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

  const fetchWeather = async () => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY; // API key'i .env'den al
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
    </div>
  );
}

export default App;
