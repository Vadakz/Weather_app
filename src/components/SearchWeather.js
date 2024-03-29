import React, { useEffect, useState } from 'react'

//for getting the datas
const Searchweather = () => {
    const [search, setsearch] = useState("london");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    let componentMounted = true;

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=27a7a6d0b261d921dd29c9c296fa624e`);
            if (componentMounted) {
                setData(await response.json());
                console.log(data);
            }
            return () => {
                componentMounted = false;
            }
        }
        fetchWeather();
    }, [search]);

    //for getting the emojis
    let emoji = null;
    if (typeof data.main != "undefined") {

        if (data.weather?.main === "Clouds") {
            emoji = "fa-cloud"
        } else if (data.weather?.main === "Thunderstorm") {
            emoji = "fa-bolt"
        } else if (data.weather?.main === "Drizzle") {
            emoji = "fa-cloud-rain"
        } else if (data.weather?.main === "Rain") {
            emoji = "fa-cloud-shower-heavy"
        } else if (data.weather?.main === "Snow") {
            emoji = "fa-snow-flake"
        } else {
            emoji = "fa-smog"
        }

    } else {
        return (
            <div>...loading</div>
        )
    }

    //to search element and output
    const handleSubmit=(event)=>{
        event.preventDefault();
        setsearch(input)
    }

    //for converting degree to celcius
    let temp = (data.main?.temp - 273.15).toFixed(2)
    let temp_min = (data.main?.temp_min - 273.15).toFixed(2)
    let temp_max = (data.main?.temp_max - 273.15).toFixed(2)

    //for date

    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: 'long' })
    let day = d.toLocaleString("default", { weekday: 'long' })

    //time
    let time = d.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/random/600x900/?${data.weather.main}`} className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div class="input-group mb-4 w-75 mx-auto">
                                        <input
                                            type="search"
                                            class="form-control"
                                            placeholder="Enter City"
                                            aria-label="Enter City"
                                            aria-describedby="basic-addon2"
                                            name='search'
                                            value={input}
                                            onChange={(e)=>setInput(e.target.value)}
                                        />
                                        <button type='submit' class="btn btn-success " id="basic-addon2">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                                <div className='bg-dark bg-opacity-50 py-3'>
                                    <h5 className="card-title">{data.name}</h5>
                                    <p className="card-text lead">
                                        {day} <br />{month} {date}, {year} <br />
                                        {time}
                                    </p>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bolder mb-5'>{temp} &deg;C</h1>
                                    <p className='lead fw-bolder mb-0'> {data.weather?.main}</p>
                                    <p className='lead'> {temp_min}&deg;C |{temp_max}&deg;C</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Searchweather