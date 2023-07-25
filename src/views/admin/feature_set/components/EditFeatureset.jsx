import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "context/AppContext";

const EditFeatureset = (parameters) => {
  const [data, setData] = useState({});
  const [customers, setCustomers] = useState([]);
  const [featuresetDetails, setFeaturesetDetails] = useState({});

  const { updateData, updateFunc } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    setData({ ...data, ["selectCustomer"]: [...customers] });
    console.log(featuresetDetails);
  }, [customers, featuresetDetails]);

  const handleSelectCustomer = (e) => {
    const { name, value } = e.target;
    setCustomers([...customers, value]);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/featureset/featureset/${parameters?.propValue}`
      )
      .then((res) => {
        setFeaturesetDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(Object.keys(data).length);
    try {
      axios
        .put(
          `http://localhost:3001/api/featureset/featureset-edit/${parameters?.propValue}`,
          data
        )
        .then((res) => {
          updateFunc();
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("Error in Adding Featureset");
    }
  };

  const StationaryObjectoptions = [
    { label: "Yes", value: 0 },
    { label: "No", value: 1 },
  ];

  const CompleteBrakeoptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const OncomingObstacleptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const SafetyModeoptions = [
    { label: "Normal", value: "Normal" },
    { label: "Relaxed", value: "Relaxed" },
    {
      label: "Strict",
      value: "Strict",
    },
  ];

  const Brakingoptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const VehicleTypeoptions = [{ label: "12V Pedal", value: "12V Pedal" }];

  const AcceleratorTypeoptions = [
    {
      label: "Sensor",
      value: "Sensor",
    },
    {
      label: "Cylinder",
      value: "Cylinder",
    },
    {
      label: "Solenoid",
      value: "Solenoid",
    },
  ];

  const ProtocolTypeoptions = [
    { label: "SAEJ1939", value: "SAEJ1939" },
    {
      label: "CAN",
      value: "CAN",
    },
  ];

  const BrakeTypeoptions = [
    { label: "Cylinder", value: "Cylinder" },
    { label: "Internal Braking", value: "Internal Braking" },
    {
      label: "Electromagnetic",
      value: "Electromagnetic",
    },
  ];

  const SpeedSourceoptions = [
    { label: "Speed Wire", value: "Speed Wire" },
    { label: "OBD", value: "OBD" },
    { label: "GPS", value: "GPS" },
  ];

  const Customersoptions = [
    {
      label: "Harshal",
      value: "Harshal",
    },
    {
      label: "Starkenn",
      value: "Starkenn",
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="flex" style={{ flexDirection: "column" }}>
            <label htmlFor="username">Feature Set ID12345*</label>
            <InputText
              id="username"
              placeholder={featuresetDetails?.featureSetId}
              aria-describedby="username-help"
              le={{
                width: "63vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="featureSetId"
              onChange={handleChange}
            />
            <small id="username-help">Unique id to identify feature set</small>
          </div>

          <div className="mt-2 flex" style={{ flexDirection: "column" }}>
            <label htmlFor="username">Feature Set Name*</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              le={{
                width: "63vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={featuresetDetails?.featureSetName}
              name="featureSetName"
              onChange={handleChange}
            />
            <small id="username-help">Unique id to identify feature set</small>
          </div>

          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Select Customer</label>
            <Dropdown
              name="selectCustomer"
              onChange={handleSelectCustomer}
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={Customersoptions}
              placeholder={featuresetDetails?.selectCustomer}
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <p className="mt-4 font-bold ">System Type</p>
          <div className="my-3 flex flex-wrap gap-3">
            <div className="align-items-center flex">
              <input
                type="radio"
                name="mode"
                onChange={handleChange}
                value="Offline"
              />
              <label htmlFor="ingredient1" className="ml-2">
                Offline Mode
              </label>
            </div>
            <div className="align-items-center flex">
              <input
                type="radio"
                name="mode"
                onChange={handleChange}
                value="Online"
              />
              <label htmlFor="ingredient2" className="ml-2">
                Online Mode
              </label>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Collision Avoidance System</p>
        <div className="card justify-content-center mt-5 flex gap-4">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="CASMode"
              value="Disable"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="CASMode"
              value="Enable"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Activation Speed</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={featuresetDetails?.activationSpeed}
              name="activationSpeed"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Alarm Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={featuresetDetails?.alarmThreshold}
              name="alarmThreshold"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={featuresetDetails?.brakeThreshold}
              name="brakeThreshold"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Speed</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={featuresetDetails?.brakeSpeed}
              name="brakeSpeed"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[63vw]">
            <label htmlFor="ecu">Detect Stationary Object</label>
            <Dropdown
              id="ecu"
              options={StationaryObjectoptions}
              optionLabel="label"
              optionValue="value"
              placeholder={featuresetDetails?.detectStationaryObject}
              name="detectStationaryObject"
              onChange={handleChange}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Allow Complete Brake</label>
            <Dropdown
              name="allowCompleteBrake"
              onChange={handleChange}
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={CompleteBrakeoptions}
              placeholder={featuresetDetails?.allowCompleteBrake}
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[63vw]">
            <label htmlFor="ecu">Detect Oncoming Obstacle</label>
            <Dropdown
              name="detectOncomingObstacle"
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={OncomingObstacleptions}
              placeholder={featuresetDetails?.detectOncomingObstacles}
              optionLabel="label"
              optionValue="value"
              onChange={handleChange}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Safety Mode</label>
            <Dropdown
              name="safetyMode"
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={SafetyModeoptions}
              placeholder={featuresetDetails?.safetyMode}
              onChange={handleChange}
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">TTC Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={featuresetDetails?.ttcThreshold}
              name="ttcThreshold"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake ON Duration</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="brakeOnDuration"
              onChange={handleChange}
              placeholder={featuresetDetails?.brakeOnDuration}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake OFF Duration</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="brakeOffDuration"
              onChange={handleChange}
              placeholder={featuresetDetails?.brakeOffDuration}
            />
          </div>
        </div>

        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Sleep Alert</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="sleepAlertMode"
              onChange={handleChange}
              value="Offline"
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="sleepAlertMode"
              onChange={handleChange}
              value="Online"
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Pre Warning</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={featuresetDetails?.preWarning}
              name="preWarning"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Sleep Alert Interval</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="sleepAlertInterval"
              onChange={handleChange}
              placeholder={featuresetDetails?.sleepAlertInterval}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Activation Speed</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="activationSpeed"
              onChange={handleChange}
              placeholder={featuresetDetails?.activationSpeed}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Start Time</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="startTime"
              onChange={handleChange}
              placeholder={featuresetDetails?.startTime}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Stop Time</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="stopTime"
              onChange={handleChange}
              placeholder={featuresetDetails?.stopTime}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Activate Time</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="brakeActivateTime"
              onChange={handleChange}
              placeholder={featuresetDetails?.brakeActivateTime}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Braking</label>
            <Dropdown
              name="braking"
              onChange={handleChange}
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={Brakingoptions}
              placeholder={featuresetDetails?.braking}
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Driver Evaluation</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverEvalMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverEvalMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Max Lane Change Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="maxLaneChangeThreshold"
              onChange={handleChange}
              placeholder={featuresetDetails?.maxLaneChangeThreshold}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Min Lane Change Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="minLaneChangeThreshold"
              onChange={handleChange}
              placeholder={featuresetDetails?.minLaneChangeThreshold}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Max Harsh Acceleration Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="maxHarshAccelerationThreshold"
              onChange={handleChange}
              placeholder={featuresetDetails?.maxHarshAccelerationThreshold}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Min Harsh Acceleration Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="minHarshAccelerationThreshold"
              onChange={handleChange}
              placeholder={featuresetDetails?.minHarshAccelerationThreshold}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Sudden Braking Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="suddenBrakingThreshold"
              onChange={handleChange}
              placeholder={featuresetDetails?.suddenBrakingThreshold}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Max Speed Bump Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="maxSpeedBumpThreshold"
              onChange={handleChange}
              placeholder={featuresetDetails?.maxSpeedBumpThreshold}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Min Speed Bump Threshold</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="minSpeedBumpThreshold"
              onChange={handleChange}
              placeholder={featuresetDetails?.minSpeedBumpThreshold}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Governor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="GovernerMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              onChange={handleChange}
              name="GovernerMode"
              value="Online"
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Speed Limit</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="speedLimit"
              onChange={handleChange}
              placeholder={featuresetDetails?.speedLimit}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Cruise</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              onChange={handleChange}
              name="cruiseMode"
              value="Offline"
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="cruiseMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="field my-3 w-[30vw]">
          <label htmlFor="ecu">Activation Speed</label>
          <input
            type="number"
            id="username"
            aria-describedby="username-help"
            style={{
              width: "30vw",
              borderBottom: "1px dashed #ced4da",
              borderRadius: "0px",
              padding: "0.30px",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
            name="activationSpeed"
            onChange={handleChange}
            placeholder={featuresetDetails?.activationSpeed}
          />
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Vehicle Type</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="vehicleType"
              onChange={handleChange}
              options={VehicleTypeoptions}
              placeholder={featuresetDetails?.vehicleType}
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">OBD</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="obdMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="obdMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Protocol Type</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="protocolType"
              onChange={handleChange}
              options={ProtocolTypeoptions}
              placeholder={featuresetDetails?.protocolType}
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">TPMS</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="tpmsMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="tpmsMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Vehicle Settings</p>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Accelerator Type</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={featuresetDetails?.acceleratorType}
              optionLabel="label"
              optionValue="value"
              name="acceleratorType"
              onChange={handleChange}
              options={AcceleratorTypeoptions}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Type</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={featuresetDetails?.brakeType}
              optionLabel="label"
              optionValue="value"
              name="brakeType"
              onChange={handleChange}
              options={BrakeTypeoptions}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Sensor</p>
        <p className="mt-4 font-bold ">Laser Sensor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="lazerMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="lazerMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <p className="mt-4 font-bold ">RF Sensor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfSensorMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfSensorMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">RF Angle</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="rfAngle"
              onChange={handleChange}
              placeholder={featuresetDetails?.rfAngle}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 1</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="reserved1"
              onChange={handleChange}
              placeholder={featuresetDetails?.reserved1}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 2</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="reserved2"
              onChange={handleChange}
              placeholder={featuresetDetails?.reserved2}
            />
          </div>
        </div>
        <div className="field my-3 w-[30vw]">
          <label htmlFor="ecu">Reserved 3</label>
          <input
            type="number"
            id="username"
            aria-describedby="username-help"
            style={{
              width: "30vw",
              borderBottom: "1px dashed #ced4da",
              borderRadius: "0px",
              padding: "0.30px",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
            name="reserved3"
            onChange={handleChange}
            placeholder={featuresetDetails?.reserved3}
          />
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Settings</p>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Speed Source</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="speedSource"
              placeholder={featuresetDetails?.speedSource}
              options={SpeedSourceoptions}
              optionLabel="label"
              optionValue="value"
              onChange={handleChange}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Slope</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="slope"
              onChange={handleChange}
              placeholder={featuresetDetails?.slope}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Offset</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="offset"
              onChange={handleChange}
              placeholder={featuresetDetails?.offset}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Shutdown Delay</p>
        <div className="field my-3 w-[30vw]">
          <label htmlFor="ecu">Delay</label>
          <input
            type="number"
            id="username"
            aria-describedby="username-help"
            style={{
              width: "30vw",
              borderBottom: "1px dashed #ced4da",
              borderRadius: "0px",
              padding: "0.30px",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
            name="delay"
            onChange={handleChange}
            placeholder={featuresetDetails?.delay}
          />
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">RF Name</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfNameMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfNameMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Time Based Errors</p>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">No Alarm</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="noAlarm"
              onChange={handleChange}
              placeholder={featuresetDetails?.noAlarm}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Speed</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="speed"
              onChange={handleChange}
              placeholder={featuresetDetails?.speed}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Acceleration Bypass</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="accelerationBypass"
              onChange={handleChange}
              placeholder={featuresetDetails?.accelerationBypass}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Based Errors</p>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">RF Sensor Absent</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="rfSensorAbsent"
              onChange={handleChange}
              placeholder={featuresetDetails?.rfSensorAbsent}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Gyroscope Absent</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="gyroscopeAbsent"
              onChange={handleChange}
              placeholder={featuresetDetails?.gyroscopeAbsent}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">HMI Absent</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="hmiAbsent"
              onChange={handleChange}
              placeholder={featuresetDetails?.hmiAbsent}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Time Not Set</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="timeNotSet"
              onChange={handleChange}
              placeholder={featuresetDetails?.timeNotSet}
            />
          </div>
        </div>
        <div className="field my-3 w-[30vw]">
          <label htmlFor="ecu">Acceleration Error</label>
          <input
            type="number"
            id="username"
            aria-describedby="username-help"
            style={{
              width: "30vw",
              borderBottom: "1px dashed #ced4da",
              borderRadius: "0px",
              padding: "0.30px",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
            name="accelerationError"
            onChange={handleChange}
            placeholder={featuresetDetails?.accelerationError}
          />
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Error</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="brakeError"
              onChange={handleChange}
              placeholder={featuresetDetails?.brakeError}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">TPMS Error</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="tpmsError"
              onChange={handleChange}
              placeholder={featuresetDetails?.tpmsError}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">OSIM Card Absent</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="simCardAbsent"
              onChange={handleChange}
              placeholder={featuresetDetails?.simCardAbsent}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Low battery</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="lowBattery"
              onChange={handleChange}
              placeholder={featuresetDetails?.lowBattery}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Trip Not Started</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="tripNotStarted"
              onChange={handleChange}
              placeholder={featuresetDetails?.tripNotStarted}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Bluetooth Conn Absent</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="bluetoothConnAbsent"
              onChange={handleChange}
              placeholder={featuresetDetails?.bluetoothConnAbsent}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">OBD Absent</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="obdAbsent"
              onChange={handleChange}
              placeholder={featuresetDetails?.obdAbsent}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">No Alarm</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="noAlarm"
              onChange={handleChange}
              placeholder={featuresetDetails?.noAlarm}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Laser SensorAbsent</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="laserSensorAbsent"
              onChange={handleChange}
              placeholder={featuresetDetails?.laserSensorAbsent}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">RFID Absent</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="rfidAbsent"
              onChange={handleChange}
              placeholder={featuresetDetails?.rfidAbsent}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">IoT Absent</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="iotAbsent"
              onChange={handleChange}
              placeholder={featuresetDetails?.iotAbsent}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Firmware OTA Update</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="firmwareOtaUpdate"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Not Available
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="firmwareOtaUpdate"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Available
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 1</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="firewarereserver1"
              onChange={handleChange}
              placeholder={featuresetDetails?.firewarereserver1}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Alcohol Detection</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="alcoholDetectionMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Not Available
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="alcoholDetectionMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Available
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 1</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="alcoholreserved1"
              onChange={handleChange}
              placeholder={featuresetDetails?.alcoholreserved1}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Driver Drowsiness</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverDrowsinessMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Not Available
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverDrowsinessMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Available
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 1</label>
            <input
              type="number"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="driverreserved1"
              onChange={handleChange}
              placeholder={featuresetDetails?.driverreserved1}
            />
          </div>
        </div>
        <div className="text-right">
          <Button
            label="Update Feature Set"
            icon="pi pi-check"
            type="submit"
            className="px-3 py-2 text-right hover:bg-none dark:hover:bg-gray-50"
            style={{ width: "fit-content", background: "#2152FF" }}
          />
        </div>
      </form>
    </>
  );
};

export default EditFeatureset;
