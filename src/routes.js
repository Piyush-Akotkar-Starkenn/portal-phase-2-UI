import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdOutlineDashboard,
  MdWebhook
} from "react-icons/md";
import {BsTruck, BsFillCpuFill} from "react-icons/bs"
import { AiOutlineCheckSquare } from "react-icons/ai"
import { RiAlertLine, RiContactsLine } from "react-icons/ri"
import { TbReport } from "react-icons/tb"
import { BiRfid } from "react-icons/bi"

const routes = [
  {
    name: "",
    title:"Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdOutlineDashboard className="h-7 w-7" />,
    component: <MainDashboard />,
  },
  {
    name: "",
    title:"Vehicles",
    layout: "/admin",
    path: "devices",
    icon: <BsTruck className="h-7 w-7" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "",
    title:"Devices",
    layout: "/admin",
    icon: <BsFillCpuFill className="h-7 w-7" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "",
    title:"Ongoing Trips",
    layout: "/admin",
    path: "profile",
    icon: <MdWebhook className="h-7 w-7" />,
    component: <Profile />,
  },
  {
    name: "",
    title:"Completed Trips",
    layout: "/auth",
    path: "sign-in",
    icon: <AiOutlineCheckSquare className="h-7 w-7" />,
    component: <SignIn />,
  },
  {
    name: "",
    title:"Alert Triggers",
    layout: "/auth",
    path: "sign-in",
    icon: <RiAlertLine className="h-7 w-7" />,
    component: <SignIn />,
  },
  {
    name: "",
    title:"Contacts",
    layout: "/auth",
    path: "sign-in",
    icon: <RiContactsLine className="h-7 w-7" />,
    component: <SignIn />,
  },
  {
    name: "",
    title:"Reports",
    layout: "/auth",
    path: "sign-in",
    icon: <TbReport className="h-7 w-7" />,
    component: <SignIn />,
  },
  {
    name: "",
    title:"RFIDs",
    layout: "/auth",
    path: "sign-in",
    icon: <BiRfid className="h-7 w-7" />,
    component: <SignIn />,
  },
  
];
export default routes;
