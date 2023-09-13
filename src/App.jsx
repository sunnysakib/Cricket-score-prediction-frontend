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
import Country from "./Component/Country/Country";
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

  // useEffect(() => {

  // });

  return (
    <div className="">
      <NavBar />
      <div className="mx-10">
        <Country/>
        <div className="container mx-auto mt-20 mb-20">
          <h2 className="container-heading text-5xl text-center font-bold">
            <span className="heading_second">ODI Cricket Score Prediction</span>
          </h2>
        </div>

        <div className="prediction-area h-24 flex flex-col justify-center rounded-md shadow-md">
          <div className="div2  mx-20">
            <form onSubmit={handleSubmit} className="flex gap-2 ">
                {/* <!-- Batting Team Dropdown --> */}
                <div className="">
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
                <div className="">
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
              {/* <!-- Venue Dropdown --> */}
              <div className="">
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

              <div className="w-72">
                <Input
                  label="Runs"
                  size="md"
                  onChange={handleChange}
                  className="form-input"
                  type="text"
                  name="runs"
                />
              </div>
              <div className="w-72">
                <Input
                  label="Wickets"
                  size="md"
                  onChange={handleChange}
                  className="form-input"
                  type="text"
                  name="wickets"
                />
              </div>
              <div className="w-72">
                <Input
                  label="Over"
                  size="md"
                  onChange={handleChange}
                  className="form-input"
                  type="text"
                  name="overs"
                />
              </div>

              <div className="w-72">
                <Input
                  label="Previous 5 Over Run"
                  onChange={handleChange}
                  size="md"
                  className="form-input"
                  type="text"
                  name="runs_in_prev_5"
                />
              </div>
              <div>
                <Button className="" type="submit" value="Predict Score">
                  Predict
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="results my-24">
          {predict_score ? (
            <p className="text-2xl text-center font-bold">
              The final predicted score : {predict_score}
            </p>
          ) : (
            <p className="text-2xl text-center font-bold">Not Predict Yet !!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
