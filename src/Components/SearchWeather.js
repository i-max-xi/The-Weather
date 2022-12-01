import React, { useEffect, useState } from "react";

const SearchWeather = () => {
  const [search, setSearch] = useState("Ghana");
  const [data, setData] = useState({});
  const [input, setInput] = useState("");
  const APIkey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIkey}`
    )
      .then((response) => response.json())
      .then((receivedData) => {
          setData(receivedData);
      });
      
  }, [APIkey, search]);


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
        emoji = <div>...loading</div>;
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
    <div className="container d-flex align-items-center justify-content-center" style={{ width: "100vw", height: "100vh"}}>
      <div className="col-md-4">
        <div className="card text-white text-center">
          <img
            // src={
            //   data.weather
            //     ? `https://source.unsplash.com/600x900/?${data.weather[0].main}`
            //     : `https://source.unsplash.com/600x900/?clouds`
            // }
            src={`https://source.unsplash.com/600x900/?${emoji}`}
            // src={`https://source.unsplash.com/600x900/?cloudy`}
            className="card-img-top"
            alt="card-img"
          />
          <div className="card-img-overlay">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4 w-75 mx-auto">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search City"
                  aria-label="Search City"
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
              <h5 className="card-title">{data.name}</h5>
              <p className="card-text lead">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
