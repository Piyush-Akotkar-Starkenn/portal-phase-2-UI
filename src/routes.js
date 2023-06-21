import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Vehicles from "views/admin/vehicles";
import RFIDs from "views/admin/rfids";
import DataTables from "views/admin/ongoing";
import Triggers from "views/admin/alert-triggers";
import Contacts from "views/admin/contacts";
import CompletedTrips from "views/admin/completed";
import Reports from "views/admin/reports";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdOutlineDashboard, MdWebhook } from "react-icons/md";
import { BsTruck, BsFillCpuFill } from "react-icons/bs";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { RiAlertLine, RiContactsLine } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { BiRfid } from "react-icons/bi";
import OngoingTrips from "views/admin/ongoing";

//this is the new route
console.log("Hello");
const routes = [
  {
    name: "",
    title: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdOutlineDashboard className="h-7 w-7" />,
    component: <MainDashboard />,
  },
  {
    name: "",
    title: "Vehicles",
    layout: "/admin",
    path: "vehicles",
    icon: <BsTruck className="h-7 w-7" />,
    component: <Vehicles />,
    secondary: true,
  },
  {
    name: "",
    title: "Devices",
    layout: "/admin",
    icon: <BsFillCpuFill className="h-7 w-7" />,
    path: "devices",
    component: <DataTables />,
  },
  {
    name: "",
    title: "Ongoing Trips",
    layout: "/admin",
    path: "ongoing-trips",
    icon: <MdWebhook className="h-7 w-7" />,
    component: <OngoingTrips />,
  },
  {
    name: "",
    title: "Completed Trips",
    layout: "/admin",
    path: "completed-trips",
    icon: <AiOutlineCheckSquare className="h-7 w-7" />,
    component: <CompletedTrips />,
  },
  {
    name: "",
    title: "Alert Triggers",
    layout: "/admin",
    path: "alert-triggers",
    icon: <RiAlertLine className="h-7 w-7" />,
    component: <Triggers />,
  },
  {
    name: "",
    title: "Contacts",
    layout: "/admin",
    path: "contacts",
    icon: <RiContactsLine className="h-7 w-7" />,
    component: <Contacts />,
  },
  {
    name: "",
    title: "Reports",
    layout: "/admin",
    path: "reports",
    icon: <TbReport className="h-7 w-7" />,
    component: <Reports />,
  },
  {
    name: "",
    title: "RFIDs",
    layout: "/admin",
    path: "RFIDs",
    icon: <BiRfid className="h-7 w-7" />,
    component: <RFIDs />,
  },
];
export default routes;
