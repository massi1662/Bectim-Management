import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";


const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tâches",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Terminées",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "En cours",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "À faire",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Equipe",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Corbeille",
    link: "trash",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-500 text-white hover:text-gray-600" : ""
        )}
      >

        {el.icon}
        <span className="hover:text-[#2564ed]">{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-500 p-1 rounded-full">
          <img alt="logo-bectim" src="https://bectim.com/images/logo%20bectim.png" className="text-white w-12 text-2xl font-black" />
        </p>
        <span className="text-2xl font-black text-red-900">BECTIM</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-2 py-8">
        {sidebarLinks.map((link) => {
          console.log(link.label);
         return <NavLink el={link} key={link.label} />;
        })}
      </div>

      <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span>Settings</span>                   
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
