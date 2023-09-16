import React, { useEffect, useState } from "react";
import "./App.css";

import NavBar from "./Component/NavBar/NavBar";
import {
  Select,
  Option,
  Input,
  Button,
  Spinner,
} from "@material-tailwind/react";
import country_data from "./assets/data/country_data";
import venues_data from "./assets/data/venue_data";
// import Country from "./Component/Country/Country";
import hero from "./assets/hero.jpeg";


function App() {
  const [predict_score, setPredict_score] = useState();
  const [formData, setFormData] = useState({
    batting_team: "",
    bowling_team: "",
    venue: "",
    runs: "",
    wickets: "",
    overs: "",
    runs_in_prev_5: "",
  });
  const handleBattingTeamChange = (value) => {
    setFormData({
      ...formData,
      batting_team: value,
    });
  };

  const handleBowlingTeamChange = (value) => {
    setFormData({
      ...formData,
      bowling_team: value,
    });
  };
  const handleVenueChange = (value) => {
    setFormData({
      ...formData,
      venue: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === 'overs' && value > 49.6){
      alert("Over is not valid")
    }

    
    if(name === 'wickets' && value > 11){
      alert("Over is not valid")
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log("Form Data:", formData);
    e.preventDefault();

    try {
      fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => setPredict_score(data.predict));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  
  return (
    <div className="relative">
      <NavBar />
      <div className="">
        <h2 className="w-full mt-20 absolute container-heading  2xl:text-8xl text-4xl text-center font-bold text-white lg:text-5xl 2xl:mt-60 lg:mt-40 md:text-5xl nd:mt-[80px]">
          <span className="heading_second">ODI Cricket Score Prediction</span>
        </h2>
        <img src={hero} alt="" className="" />
      </div>
      <div className=" p-4 lg:absolute lg:w-full lg:top-[350px] 2xl:top-[550px] bg-white">
        <form onSubmit={handleSubmit} className=" flex flex-col gap-2 h-min lg:mx-[200px] 2xl:mx-[400px]">
          <div className="w- full flex gap-2">
            {/* <!-- Batting Team Dropdown --> */}
            <div className="bat w-1/2">
              <Select
                onChange={handleBattingTeamChange}
                size="md"
                label="Batting Team"
                name="batting_team"
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    className:
                      "flex items-center px-0 gap-2 pointer-events-none",
                  })
                }
              >
                {country_data.map(({ id, name, flag }) => (
                  <Option
                    key={id}
                    value={name}
                    name="batting_team"
                    className="flex items-center gap-2"
                    
                  >
                    <img
                      src={flag}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {name}
                  </Option>
                ))}
              </Select>
            </div>
            {/* <!-- Bowling Team Dropdown --> */}
            <div className="bowl w-1/2">
              <Select
                onChange={handleBowlingTeamChange}
                size="md"
                label="Bowling Team"
                name="bowling_team"
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    className:
                      "flex items-center px-0 gap-2 pointer-events-none",
                  })
                }
              >
                {country_data.map(({ id, name, flag }) => (
                  <Option
                    key={id}
                    value={name}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={flag}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          {/* <!-- Venue Dropdown --> */}
          <div className="venue">
            <Select
              onChange={handleVenueChange}
              size="md"
              label="Venue"
              name="venue"
              selected={(element) =>
                element &&
                React.cloneElement(element, {
                  className:
                    "flex items-center  px-0 gap-2 pointer-events-none",
                })
              }
            >
              {venues_data.map((index) => (
                <Option
                  key={index}
                  value={index}
                  className="flex items-center gap-2"
                >
                  {index}
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              label="Runs"
              size="md"
              onChange={handleChange}
              className="form-input"
              type="text"
              name="runs"
              required
            />
            <Input
              label="Wickets"
              size="md"
              onChange={handleChange}
              className="form-input"
              type="text"
              name="wickets"
              required
            />
          </div>
          <div className="flex gap-2">
            <Input
              label="Previous 5 over wickets"
              size="md"
              onChange={handleChange}
              className="form-input"
              type="text"
              name="wickets_last_5"
              required
            />
            <Input
              label="Previous 5 Over Run"
              onChange={handleChange}
              size="md"
              className="form-input"
              type="text"
              name="runs_in_prev_5"
              required
            />
          </div>
          <div>
          <Input
              label="Over"
              size="md"
              onChange={handleChange}
              className="form-input"
              type="text"
              name="overs"
              required
            />
          </div>
          <div className="mb-10  mt-3 flex justify-center">
            <Button className="absolute" type="submit" value="Predict Score">
              Predict
            </Button>
          </div>
        </form>
      </div>

      <div className="results mb-5 lg:mt-[190px] xl:mt-[100px] 2xl:mt-[250px]">
        {predict_score ? (
          <p className="text-2xl text-center font-bold">
            The final predicted score : {predict_score}
          </p>
        ) : (
          <p className="text-2xl text-center font-bold">Not Predict Yet !!</p>
        )}
      </div>
    </div>
  );
}

export default App;
