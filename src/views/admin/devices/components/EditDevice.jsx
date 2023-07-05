import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function DeviceEditForm({ device, onSave, onCancel }) {
  const [editedDevice, setEditedDevice] = useState(device);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDevice((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedDevice);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <div>
        <label>Device ID:</label>
        <InputText
          name="device_id"
          value={editedDevice.device_id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Device Type:</label>
        <InputText
          name="device_type"
          value={editedDevice.device_type}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Customer ID:</label>
        <InputText
          name="customer_id"
          value={editedDevice.customer_id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>SIM Number:</label>
        <InputText
          name="sim_number"
          value={editedDevice.sim_number}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <InputText
          name="status"
          value={editedDevice.status}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button label="Save" onClick={handleSave} />
        <Button label="Cancel" onClick={handleCancel} />
      </div>
    </div>
  );
}
