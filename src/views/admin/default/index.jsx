import { useEffect, useState } from "react";
import axios from "axios";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import { MdWebhook } from "react-icons/md";
import { BsTruck, BsFillCpuFill } from "react-icons/bs";
import Widget from "components/widget/Widget";

const Dashboard = () => {
  const [vehiclesCount, setVehiclesCount] = useState();
  const [devicesCount, setDevicesCount] = useState();
  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:3001/api/Vehicles/getAllVehicle"),
        axios.get("http://localhost:3001/api/Devices/get-all-devices"),
      ])
      .then(
        axios.spread((res1, res2) => {
          setVehiclesCount(res1.data.TotalCount);
          setDevicesCount(res2.data.TotalCount);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h4 className="text-dark text-xl font-bold dark:text-white">Dashboard</h4>

      {/* Card widget */}

      <div className="mt-3 flex flex-wrap justify-center gap-12">
        <Widget
          icon={<BsTruck className="h-7 w-7" />}
          title={"Customers"}
          subtitle={"10"}
          cardhref={"/admin/customers"}
        />
        <Widget
          icon={<BsFillCpuFill className="h-6 w-6" />}
          title={"Devices"}
          subtitle={devicesCount}
          cardhref={"/admin/devices"}
        />
        <Widget
          icon={<MdWebhook className="h-7 w-7" />}
          title={"Vehicles"}
          subtitle={vehiclesCount}
          cardhref={"/admin/vehicles"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2">
        <div className="mb-5 md:mb-0">
          <TotalSpent />
          <br />
          <TotalSpent />
        </div>
        <div>
          <WeeklyRevenue />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
