import React from "react";

// Admin Imports
import Dashboard from "views/admin/default";
import VehiclesAdmin from "views/admin/vehicles";
import RFIDsAdmin from "views/admin/rfids";
import OngoingTripsAdmin from "views/admin/ongoing";
import DevicesAdmin from "views/admin/devices";
import TriggersAdmin from "views/admin/alert-triggers";
import ContactsAdmin from "views/admin/contacts";
import CompletedTripsAdmin from "views/admin/completed";
import ReportsAdmin from "views/admin/reports";

// Customer Imports
import MainDashboard from "views/customer/default";
import Vehicles from "views/customer/vehicles";
import RFIDs from "views/customer/rfids";
import Devices from "views/customer/devices";
import OngoingTrips from "views/customer/ongoing";
import Triggers from "views/customer/alert-triggers";
import Contacts from "views/customer/contacts";
import CompletedTrips from "views/customer/completed";
import Reports from "views/customer/reports";

// Icon Imports
import { MdOutlineDashboard, MdWebhook } from "react-icons/md";
import { BsTruck, BsFillCpuFill } from "react-icons/bs";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { RiAlertLine, RiContactsLine } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { BiRfid } from "react-icons/bi";

export const routes_admin = [
  {
    name: "",
    title: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdOutlineDashboard className="h-7 w-7" />,
    component: <Dashboard />,
  },
  {
    name: "",
    title: "Vehicles",
    layout: "/admin",
    path: "vehicles",
    icon: <BsTruck className="h-7 w-7" />,
    component: <VehiclesAdmin />,
    secondary: true,
  },
  {
    name: "",
    title: "Devices",
    layout: "/admin",
    icon: <BsFillCpuFill className="h-7 w-7" />,
    path: "devices",
    component: <DevicesAdmin />,
  },
  {
    name: "",
    title: "Ongoing Trips",
    layout: "/admin",
    path: "ongoing-trips",
    icon: <MdWebhook className="h-7 w-7" />,
    component: <OngoingTripsAdmin />,
  },
  {
    name: "",
    title: "Completed Trips",
    layout: "/admin",
    path: "completed-trips",
    icon: <AiOutlineCheckSquare className="h-7 w-7" />,
    component: <CompletedTripsAdmin />,
  },
  {
    name: "",
    title: "Alert Triggers",
    layout: "/admin",
    path: "alert-triggers",
    icon: <RiAlertLine className="h-7 w-7" />,
    component: <TriggersAdmin />,
  },
  {
    name: "",
    title: "Contacts",
    layout: "/admin",
    path: "contacts",
    icon: <RiContactsLine className="h-7 w-7" />,
    component: <ContactsAdmin />,
  },
  {
    name: "",
    title: "Reports",
    layout: "/admin",
    path: "reports",
    icon: <TbReport className="h-7 w-7" />,
    component: <ReportsAdmin />,
  },
  {
    name: "",
    title: "RFIDs",
    layout: "/admin",
    path: "RFIDs",
    icon: <BiRfid className="h-7 w-7" />,
    component: <RFIDsAdmin />,
  },
];
export const routes_customer = [
  {
    name: "",
    title: "Dashboard",
    layout: "/customer",
    path: "default",
    icon: <MdOutlineDashboard className="h-7 w-7" />,
    component: <MainDashboard />,
  },
  {
    name: "",
    title: "Vehicles",
    layout: "/customer",
    path: "vehicles",
    icon: <BsTruck className="h-7 w-7" />,
    component: <Vehicles />,
    secondary: true,
  },
  {
    name: "",
    title: "Devices",
    layout: "/customer",
    icon: <BsFillCpuFill className="h-7 w-7" />,
    path: "devices",
    component: <Devices />,
  },
  {
    name: "",
    title: "Ongoing Trips",
    layout: "/customer",
    path: "ongoing-trips",
    icon: <MdWebhook className="h-7 w-7" />,
    component: <OngoingTrips />,
  },
  {
    name: "",
    title: "Completed Trips",
    layout: "/customer",
    path: "completed-trips",
    icon: <AiOutlineCheckSquare className="h-7 w-7" />,
    component: <CompletedTrips />,
  },
  {
    name: "",
    title: "Alert Triggers",
    layout: "/customer",
    path: "alert-triggers",
    icon: <RiAlertLine className="h-7 w-7" />,
    component: <Triggers />,
  },
  {
    name: "",
    title: "Contacts",
    layout: "/customer",
    path: "contacts",
    icon: <RiContactsLine className="h-7 w-7" />,
    component: <Contacts />,
  },
  {
    name: "",
    title: "Reports",
    layout: "/customer",
    path: "reports",
    icon: <TbReport className="h-7 w-7" />,
    component: <Reports />,
  },
  {
    name: "",
    title: "RFIDs",
    layout: "/customer",
    path: "RFIDs",
    icon: <BiRfid className="h-7 w-7" />,
    component: <RFIDs />,
  },
];
