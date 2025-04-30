const apiKey = "b129fb11cba7edd5b8ccda29832e59b3"; // OpenWeatherMap API anahtarınızı buraya ekleyin
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".description i");
const weatherBox = document.querySelector(".weather-box");

async function checkWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    if (!response.ok) {
      alert(
        data.message || "Hava durumu verisi alınamadı. Lütfen tekrar deneyin."
      );
      return;
    }

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp);
    document.querySelector(".description span").innerHTML =
      data.weather[0].description;
    document.querySelector(".humidity span").innerHTML = data.main.humidity;
    document.querySelector(".wind span").innerHTML = data.wind.speed;
    document.querySelector(
      ".location span"
    ).innerHTML = `${data.name}, ${data.sys.country}`;

    // Hava durumuna göre ikon ve arka plan değiştirme
    const weatherMain = data.weather[0].main.toLowerCase();
    let bgImage = "";

    if (weatherMain.includes("clear")) {
      weatherIcon.className = "fas fa-sun";
      bgImage = "images/gunesli.jpg";
    } else if (weatherMain.includes("clouds")) {
      weatherIcon.className = "fas fa-cloud";
      bgImage = "images/bulutlu.jpg";
    } else if (weatherMain.includes("rain")) {
      weatherIcon.className = "fas fa-cloud-rain";
      bgImage = "images/yagmurlu.jpg";
    } else if (weatherMain.includes("snow")) {
      weatherIcon.className = "fas fa-snowflake";
      bgImage = "images/karli.jpg";
    } else if (weatherMain.includes("thunderstorm")) {
      weatherIcon.className = "fas fa-bolt";
      bgImage = "images/firtina.jpg";
    } else if (weatherMain.includes("mist")) {
      weatherIcon.className = "fas fa-smog";
      bgImage = "images/sisli.jpg";
    }

    // Arka plan resmini değiştir
    document.body.style.backgroundImage = `url('${bgImage}')`;

    // Animasyon için class ekle
    weatherBox.classList.remove("show");
    setTimeout(() => {
      weatherBox.classList.add("show");
    }, 10);

    weatherBox.style.display = "block";
  } catch (error) {
    alert("Hava durumu verisi alınamadı. Lütfen tekrar deneyin.");
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
