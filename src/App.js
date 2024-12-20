import React, { useState } from "react";
import axios from "axios";
import Weather from "./components/Weather"; // Tek bir import satırı
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

function App() {
  const [city, setCity] = useState(""); // Şehir adı state'i
  const [weatherData, setWeatherData] = useState(null); // Hava durumu verisi state'i
  const [error, setError] = useState(""); // Hata mesajı state'i
  const [backgroundColor, setBackgroundColor] = useState(""); // Arka plan rengi state'i
  const [showPopup, setShowPopup] = useState(false); // Popup için state

  const fetchWeather = async () => {
    const apiKey = "2141b363d2e0f40b79fadead73978b53"; // OpenWeatherMap API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(""); // Hata mesajını sıfırlıyoruz
      setBackgroundColor("#1e1e1e"); // Hava durumu verisi geldiğinde arka plan rengini değiştiriyoruz
    } catch (err) {
      setWeatherData(null);
      setError("Şehir bulunamadı veya API hatası oluştu.");
      setBackgroundColor(""); // Hata durumunda arka planı sıfırlıyoruz
    }
  };

  const handleAboutClick = () => {
    setShowPopup(true); // Popup'ı göster
  };

  const closePopup = () => {
    setShowPopup(false); // Popup'ı kapat
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
          placeholder="Aramak istediğiniz şehri yazın..."
          value={city}
          onChange={(e) => setCity(e.target.value)} // Şehir adı state'ini güncelliyoruz
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
