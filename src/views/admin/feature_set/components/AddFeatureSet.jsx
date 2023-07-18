import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import Dropdown from "components/dropdown";

const AddFeatureSet = () => {
  return (
    <>
      <form>
        <div className="card">
          <div className="flex" style={{ flexDirection: "column" }}>
            <label htmlFor="username">Feature Set ID*</label>
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
              placeholder="Feature Set ID"
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
              placeholder="Feature Set Name"
            />
            <small id="username-help">Unique id to identify feature set</small>
          </div>
          <p className="mt-4 font-bold ">System Type</p>
          <div className="my-3 flex flex-wrap gap-3">
            <div className="align-items-center flex">
              <RadioButton
                inputId="ingredient1"
                name="offline"
                value="Offline"
              />
              <label htmlFor="ingredient1" className="ml-2">
                Offline Mode
              </label>
            </div>
            <div className="align-items-center flex">
              <RadioButton inputId="ingredient2" name="online" value="Online" />
              <label htmlFor="ingredient2" className="ml-2">
                Online Mode
              </label>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <div className="field my-3 w-[63vw]">
          <label htmlFor="ecu">Version*</label>
          <Dropdown
            name="ecu"
            id="ecu"
            style={{
              width: "63vw",
              borderBottom: "1px dashed #ced4da",
              borderRadius: "0px",
              padding: "0.30px",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
            placeholder="Tap To Select"
            optionLabel="ecu"
            className="md:w-14rem mt-2 w-full"
          />
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Collision Avoidance System</p>
        <div className="card justify-content-center mt-5 flex gap-4">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
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
              placeholder="10"
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
              placeholder="1.5"
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
              placeholder="0.4"
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
              placeholder="40"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[63vw]">
            <label htmlFor="ecu">Detect Stationary Object</label>
            <Dropdown
              name="ecu"
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
              placeholder="No"
              optionLabel="ecu"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Allow Complete Brake</label>
            <Dropdown
              name="ecu"
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
              placeholder="No"
              optionLabel="ecu"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[63vw]">
            <label htmlFor="ecu">Detect Oncoming Obstacle</label>
            <Dropdown
              name="ecu"
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
              placeholder="No"
              optionLabel="ecu"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Safety Mode</label>
            <Dropdown
              name="ecu"
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
              placeholder="Normal"
              optionLabel="ecu"
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
              placeholder="175"
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
              placeholder="1000"
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
              placeholder="1000"
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
              placeholder="12"
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
              placeholder="12"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Sleep Alert</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
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
              placeholder="5"
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
              placeholder="60"
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
              placeholder="40"
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
              placeholder="23"
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
              placeholder="6"
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
              placeholder="10"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Braking</label>
            <Dropdown
              name="ecu"
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
              placeholder="No"
              optionLabel="ecu"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Driver Evaluation</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
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
              placeholder="0.35"
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
              placeholder="-0.35"
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
              placeholder="0.25"
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
              placeholder="0"
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
              placeholder="-0.4"
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
              placeholder="0.5"
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
              placeholder="10"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Governor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
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
              placeholder="100"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Cruise</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
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
            placeholder="100"
          />
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Vehicle Type</label>
            <Dropdown
              name="ecu"
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
              placeholder="12V Pedal"
              optionLabel="ecu"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">OBD</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Protocol Type</label>
            <Dropdown
              name="ecu"
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
              placeholder="SAE J1393"
              optionLabel="ecu"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">TPMS</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
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
              name="ecu"
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
              placeholder="Sensor"
              optionLabel="ecu"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Sensor</p>
        <p className="mt-4 font-bold ">Laser Sensor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <p className="mt-4 font-bold ">RF Sensor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
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
              placeholder="0"
            />
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
              placeholder="1"
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
              placeholder="0"
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
              placeholder="0"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Settings</p>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Speed Source</label>
            <Dropdown
              name="ecu"
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
              placeholder="Speed Wire"
              optionLabel="ecu"
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
              placeholder="0.51"
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
              placeholder="4.08"
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
            placeholder="30"
          />
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">RF Name</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
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
              placeholder="0"
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
              placeholder="0"
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
              placeholder="0"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">TPMS</label>
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
              placeholder="0"
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
              placeholder="100"
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
              placeholder="100"
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
              placeholder="100"
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
              placeholder="100"
            />
          </div>
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
              placeholder="0"
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
              placeholder="0"
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
              placeholder="0"
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
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Laser Sensor Absent</label>
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
              placeholder="0"
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
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">IOT Absent</label>
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
              placeholder="0"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Accessory Board</label>
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
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">DD Module Disconnected</label>
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
              placeholder="60"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Alcohol Sensor Disconnected</label>
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
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Temperature Sensor Disconnected</label>
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
              placeholder="0"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Firmware OTA Update</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient1" name="offline" value="Offline" />
            <label htmlFor="ingredient1" className="ml-2">
              Not Available
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton inputId="ingredient2" name="online" value="Online" />
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
              placeholder="0"
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
              placeholder="0"
            />
          </div>
        </div>
        <div className="text-right">
          <Button
            label="Add Feature Set"
            icon="pi pi-check"
            className="p-button-primary px-3 py-2 text-right hover:bg-none dark:hover:bg-gray-50"
            style={{ width: "fit-content" }}
          />
        </div>
      </form>
    </>
  );
};

export default AddFeatureSet;
