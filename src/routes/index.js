import Layout from "../components/Layout";
import LayoutAdmin from "../components/LayoutAdmin";
import LayoutDoctor from "../components/LayoutDoctor";
import ClientDoctor from "../pages/ClientDoctor";
import ClientHome from "../pages/ClientHome";
import ClientMajor from "../pages/ClientMajor";
import AdminHome from "../pages/AdminHome";
import AdminMajor from "../pages/AdminMajor";
import AddMajor from "../pages/AdminMajor/AddMajor";
import AdminDoctor from "../pages/AdminDoctor";
import AddDoctor from "../pages/AdminDoctor/AddDoctor";
import AdminBooking from "../pages/AdminBooking";
import AdminArticle from "../pages/AdminArticle";
import ListMajor from "../pages/AdminMajor/ListMajor";
import ListDoctor from "../pages/AdminDoctor/ListDoctor";
import ListDoctorLeave from "../pages/AdminDoctor/ListDoctorLeave";
import DoctorHome from "../pages/DoctorHome";
import DoctorBooking from "../pages/DoctorBooking";
import DoctorCalendar from "../pages/DoctorCalendar";
import AdminSetting from "../pages/AdminSetting";
import DoctorSetting from "../pages/DoctorSettings";
import Login from "../pages/Login";
import PrivateRouterDoctor from "./PrivateRouterDoctor";
import ListDoctorClient from "../pages/ClientDoctor/ListDoctorClient";
import DoctorDetail from "../pages/ClientDoctor/DoctorDetail";
import ClientContact from "../pages/ClientContact";
import PrivateRouterAdmin from "./PrivateRouterAdmin";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ClientHome />,
      },
      {
        path: "majors",
        element: <ClientMajor />,
      },
      {
        path: "contact",
        element: <ClientContact />,
      },
      {
        path: "doctors",
        element: <ClientDoctor />,
        children: [
          {
            index: true,
            element: <ListDoctorClient />,
          },
          {
            path: ":id",
            element: <DoctorDetail />,
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRouterDoctor />,
    children: [
      {
        path: "/doctor",
        element: <LayoutDoctor />,
        children: [
          {
            index: true,
            element: <DoctorHome />,
          },
          {
            path: "booking",
            element: <DoctorBooking />,
          },
          {
            path: "calendar",
            element: <DoctorCalendar />,
          },
          {
            path: "settings",
            element: <DoctorSetting />,
          },
        ],
      },
    ],
  },
  {
    element: <PrivateRouterAdmin />,
    children: [
      {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
          {
            index: true,
            element: <AdminHome />,
          },
          {
            path: "majors",
            element: <AdminMajor />,
            children: [
              {
                index: true,
                element: <ListMajor />,
              },
              {
                path: "create",
                element: <AddMajor />,
              },
              {
                path: ":id/edit",
                element: <AddMajor />,
              },
            ],
          },
          {
            path: "doctors",
            element: <AdminDoctor />,
            children: [
              {
                index: true,
                element: <ListDoctor />,
              },
              {
                path: "create",
                element: <AddDoctor />,
              },
              {
                path: ":id/edit",
                element: <AddDoctor />,
              },
              {
                path: "leave",
                element: <ListDoctorLeave />,
              },
            ],
          },
          {
            path: "bookings",
            element: <AdminBooking />,
          },
          {
            path: "settings",
            element: <AdminSetting />,
          },
          {
            path: "articles",
            element: <AdminArticle />,
          },
        ],
      }
    ]
  },
];
