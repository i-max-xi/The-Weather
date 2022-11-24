import React, { useEffect, useRef, useState } from "react";

const SearchWeather = () => {
  const [search, setSearch] = useState("Ghana");
  const [data, setData] = useState({});
  const [input, setInput] = useState("");
  const APIkey = "a0687ef566796926199ada401036b4bb";
  let componentmounted = true;

  useEffect(() => {
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIkey}`
    // )
    //   .then((response) => response.json())
    //   .then((receivedData) => {
    //     if (componentmounted) {
    //       setData(receivedData);
    //     }
    //   });

    //   return () => {
    //         componentmounted.current = false;
    //       };

    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIkey}`
      );

      if (componentmounted) {
        setData(await response.json());
      }
      return () => {
        componentmounted = false;
      };
    };
    fetchWeather();
  }, [search]);

  console.log(data);

  let emoji = null;
  if (typeof data.main != "undefined") {
    switch (data.weather[0].main) {
      case "Clouds":
        emoji = "fas fa-cloud";
        break;
      case "Thunderstorm":
        emoji = "fas fa-bolt";
        break;
      case "Drizzle":
        emoji = "fas fa-cloud-rain";
        break;
      case "Rain":
        emoji = "fas fa-cloud-rain-heavy";
        break;
      case "Snow":
        emoji = "fas fa-snow-flake";
        break;
      default:
        return <div>...loading</div>;
    }
  }

  //Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  //Time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  return (
    <div className="container">
      <div className="col-md-4">
        <div class="card text-white text-center" style={{ width: "18rem" }}>
          <img
            // src={
            //   data.weather
            //     ? `https://source.unsplash.com/600x900/?${data.weather[0].main}`
            //     : `https://source.unsplash.com/600x900/?clouds`
            // }
            // src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
            src={`https://source.unsplash.com/600x900/?cloudy`}
            class="card-img-top"
            alt="card-img"
          />
          <div className="card-img-overlay">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4 w-75 mx-auto">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search CIty"
                  aria-label="Search CIty"
                  aria-describedby="basic-addon2"
                  name="search"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  required
                />
                <button
                  type="submit"
                  className="input-group-text"
                  id="basic-addon2"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
            <div className="bg-dark bg-opacity-50 py-3">
              <h5 class="card-title">{data.name}</h5>
              <p class="card-text lead">
                {day}, {month} {date}, {year}
                <br />
                {time}
              </p>
              <p className="card-text">Last Updated 2mins ago</p>
              <hr />

              {typeof data.main !== "undefined" ? (
                <>
                  <i className={`${emoji} fa-4x`}></i>

                  <h1 className="fw-bolder mb-5">
                    {(data.main.temp - 273.15).toFixed(2)}&deg;C
                  </h1>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {(data.main.temp_min - 273.15).toFixed(2)}&deg;C |{" "}
                    {(data.main.temp_max - 273.15).toFixed(2)}&deg;C
                  </p>
                </>
              ) : (
                <>Loading...</>
              )}

              {/* <h1 className="fw-bolder mb-5">{temp}&deg;C</h1>
              <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
              <p className="lead">
                {temp_min}&deg;C | {temp_max}&deg;C
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
