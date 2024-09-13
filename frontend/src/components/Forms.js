import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Forms() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    hr: "",
    o2sat: "",
    temp: "",
    sbp: "",
    map: "",
    dbp: "",
    resp: "",
    bun: "",
    lactate: "",
    creatinine: "",
    bilirubin_total: "",
    glucose: "",
    wbc: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [submitStatus, setSubmitStatus] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        Age: formData.age,
        Gender: formData.gender,
        HR: formData.hr,
        O2Sat: formData.o2sat,
        Temp: formData.temp,
        SBP: formData.sbp,
        MAP: formData.map,
        DBP: formData.dbp,
        Resp: formData.resp,
        BUN: formData.bun,
        Lactate: formData.lactate,
        Creatinine: formData.creatinine,
        Bilirubin_total: formData.bilirubin_total,
        Glucose: formData.glucose,
        WBC: formData.wbc
      });

      setSubmitStatus(`Prediction: ${response.data.prediction}`);
    } catch (error) {
      setSubmitStatus("Something went wrong. Please try again.",error);
      console.error("Error:", error);
    }
  };
  return (
    <div className="container mt-1">
      <form onSubmit={handleFormSubmit}>
        <h2>Sepsis Prediction form</h2>
        <h3>Fill the details appropriately</h3>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            placeholder="Name"
            id="name"
            autoComplete="name"
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            name="age"
            id="age"
            onChange={handleInputChange}
            value={formData.age}
          />
          <label htmlFor="age">Your Age</label>
        </div>
        <div className="mb-3">
          <div className="form-check form-check-inline">
            <label className="form-label col-md-5">Gender :</label>
            <div
              className="btn-group"
              role="group"
              aria-label="Gender radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="gender"
                id="maleRadio"
                value="0"
                onChange={handleInputChange}
                required
              />
              <label className="btn btn-outline-primary" htmlFor="maleRadio">
                Male
              </label>

              <input
                type="radio"
                className="btn-check"
                name="gender"
                id="femaleRadio"
                value="1"
                onChange={handleInputChange}
                required
              />
              <label className="btn btn-outline-primary" htmlFor="femaleRadio">
                Female
              </label>

              <input
                type="radio"
                className="btn-check"
                name="gender"
                id="othersRadio"
                value="1"
                onChange={handleInputChange}
                required
              />
              <label className="btn btn-outline-primary" htmlFor="othersRadio">
                Others
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Height"
                name="height"
                id="height"
                onChange={handleInputChange}
                value={formData.height}
              />
              <label htmlFor="height">Height</label>
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Weight"
                name="weight"
                id="weight"
                onChange={handleInputChange}
                value={formData.weight}
              />
              <label htmlFor="weight">Weight</label>
            </div>
          </div>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Heart Rate"
            name="hr"
            id="hr"
            onChange={handleInputChange}
            value={formData.hr}
          />
          <label htmlFor="hr">Heart Rate</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="O2 Saturation"
            name="o2sat"
            id="o2sat"
            onChange={handleInputChange}
            value={formData.o2sat}
          />
          <label htmlFor="o2sat">O2 Saturation</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Temperature"
            name="temp"
            id="temp"
            onChange={handleInputChange}
            value={formData.temp}
          />
          <label htmlFor="temp">Temperature</label> 
        </div>
        <div className="row">
          <div className="col-md-2">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="SBP"
                name="sbp"
                id="sbp"
                onChange={handleInputChange}
                value={formData.sbp}
              />
              <label htmlFor="height">SBP</label>
              <div className="form-text">
                Systolic Blood Pressure (SBP) is top measurement in BP reading
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="DBP"
                id="dbp"
                name="dbp"
                onChange={handleInputChange}
                value={formData.dbp}
              />
              <label htmlFor="weight">DBP</label>
              <div className="form-text">
                Diastolic Blood Pressure (DBP) is bottom measurement in BP reading
              </div>
            </div>
          </div>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="MAP"
            name="map"
            id="map"
            onChange={handleInputChange}
            value={formData.map}
          />
          <label htmlFor="map">Mean Arterial Pressure</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Respiratory Rate"
            name="resp"
            id="resp"
            onChange={handleInputChange}
            value={formData.resp}
          />
          <label htmlFor="resp">Respiratory Rate</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="BUN"
            name="bun"
            id="bun"
            onChange={handleInputChange}
            value={formData.bun}
          />
          <label htmlFor="bun">Blood Urea Nitrogen</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Lactate"
            name="lactate"
            id="lactate"
            onChange={handleInputChange}
            value={formData.lactate}
          />
          <label htmlFor="lactate">Lactate</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Creatinine"
            name="creatinine"
            id="creatinine"
            onChange={handleInputChange}
            value={formData.creatinine}
          />
          <label htmlFor="creatinine">Creatinine</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Bilirubin Total"
            name="bilirubin_total"
            id="bilirubin_total"
            onChange={handleInputChange}
            value={formData.bilirubin_total}
          />
          <label htmlFor="bilirubin_total">Bilirubin Total</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Glucose"
            id="glucose"
            name="glucose"
            onChange={handleInputChange}
            value={formData.glucose}
          />
          <label htmlFor="glucose">Glucose</label>
        </div>
        <div className="form-floating mb-3 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="WBC"
            id="wbc"
            name="wbc"
            onChange={handleInputChange}
            value={formData.wbc}
          />
          <label htmlFor="wbc">White Blood Cell Count</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {submitStatus && <div className="mt-3">{submitStatus}</div>}
      </form>
    </div>
  );
}

export default Forms;
