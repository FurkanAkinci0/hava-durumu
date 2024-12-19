import React from "react";

// Ülke kodu haritası
const countryMap = {
  TR: "Türkiye",
  US: "Amerika Birleşik Devletleri",
  DE: "Almanya",
  FR: "Fransa",
  GB: "Birleşik Krallık",
  IT: "İtalya",
  RU: "Rusya",
  CN: "Çin",
  JP: "Japonya",
  IN: "Hindistan",
  // Daha fazla ülke eklenebilir...
};

function Weather({ data }) {
  if (!data || !data.weather || !data.weather[0]) {
    return <div>Hava durumu verisi alınamadı.</div>;
  }

  const { main, weather, wind, name, sys } = data;

  // Hava durumu açıklamasını düzenliyoruz (ilk harfi büyük)
  const weatherCondition =
    weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);

  const country = convertCountryCodeToName(sys.country); // Ülke kodunu tam isme çeviriyoruz
  const weatherIcon = getWeatherIcon(weatherCondition);

  // Tarihi alıyoruz
  const currentDate = new Date().toLocaleString("tr-TR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Fahrenheit sıcaklık
  const temperatureFahrenheit = Math.round((main.temp * 9) / 5 + 32);

  // Ülke kodunu tam isme çeviren fonksiyon
  function convertCountryCodeToName(code) {
    return countryMap[code] || code; // Haritada yoksa orijinal kodu döndür
  }

  function getWeatherIcon(condition) {
    condition = condition.toLowerCase().trim();
    if (condition.includes("açık") || condition.includes("güneş")) return "sunny.png";
    if (condition.includes("kapalı") || condition.includes("bulut")) return "cloudy.png";
    if (condition.includes("yağmur")) return "rainy.png";
    if (condition.includes("kar")) return "snowy.png";
    if (condition.includes("sis")) return "foggy.png";
    if (condition.includes("fırtına") || condition.includes("gök gürültülü")) return "thunderstorm.png";
    if (condition.includes("çiseleme")) return "drizzle.png";
    return "default.png";
  }

  return (
    <div className="weather-container">
      <div className="weather-left">
        <h2 className="city-name">{name}</h2>
        <div className="card-body">
          <p>Ülke: {country}</p> {/* Ülke tam ismiyle görünecek */}
          <p>Hava Durumu: {weatherCondition}</p>
          <p>Sıcaklık: {Math.round(main.temp)}°C ({temperatureFahrenheit}°F)</p> {/* Sıcaklık hem Celsius hem de Fahrenheit */}
          <p>Nem: {main.humidity}%</p>
          <p>Rüzgar Hızı: {Math.round(wind.speed * 3.6)} km/h</p> {/* Rüzgar hızı tam sayı */}
          <p>Tarih: {currentDate}</p> {/* Tarih eklendi */}
        </div>
      </div>

      <div
        className="weather-right"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/${weatherIcon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
}

export default Weather;
