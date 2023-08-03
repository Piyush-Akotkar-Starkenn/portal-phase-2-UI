import React, { useState } from "react";
import AnalyticsList from "./components/AnalyticsList";
import { Button } from "primereact/button";
import AddAnalytics from "./components/AddAnalytics";

const AnalyticsThreshold = () => {
  const [showAddAnalytics, setShowAddAnalytics] = useState(false);

  const toggleAddAnalytics = () => {
    setShowAddAnalytics((prevShowAddAnalytics) => !prevShowAddAnalytics);
  };

  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-dark text-xl font-bold dark:text-white">
          Analytics Threshold
        </h4>
      </div>
      <div>
        <Button
          label={showAddAnalytics ? "Back" : "Create New"}
          icon={showAddAnalytics ? "pi pi-arrow-left" : "pi pi-plus"}
          severity={showAddAnalytics ? "secondary" : "primary"}
          className="mt-2 h-10 px-3 py-0 text-left dark:hover:text-white"
          onClick={toggleAddAnalytics}
        />
        {showAddAnalytics ? (
          <AddAnalytics onClose={toggleAddAnalytics} />
        ) : (
          <AnalyticsList />
        )}
      </div>
    </>
  );
};

export default AnalyticsThreshold;
