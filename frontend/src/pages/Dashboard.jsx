import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "./components/DashboardSkeleton";
import ApiService from "../services/users.js";

import MyProfile from "./subpages/MyProfile";
import FoodListing from "./subpages/FoodListing";
import MyOrders from "./subpages/MyOrders";
import EditProfile from "./subpages/EditProfile";
import CreateFood from "./subpages/CreateFood";
import MyOrdersRec from "./subpages/MyOrdersRec";

const App = () => {
  const history = useHistory();
  const [page, setPage] = useState("myprofile");
  const [profileDets, setProfileDets] = useState({});

  const handlePage = (event) => {
    const value = event.currentTarget.getAttribute("value");

    setPage(value);
  };

  useEffect(() => {
    const setData = async () => {
      ApiService.setToken();
      const res = await ApiService.initDashboard();
      setProfileDets({
        profileType: res.type,
      });
      if (res.status === 1) {
        history.push("/login");
      }
    };
    setData();
  }, [history]);

  let content = "";
  if (page === "myprofile") {
    content = <MyProfile profileDets={profileDets} />;
  } else if (page === "editprofile") {
    content = <EditProfile profileDets={profileDets} />;
  } else if (page === "addfooditem") {
    content = <CreateFood profileDets={profileDets} />;
  } else if (page === "foodlistings") {
    content = <FoodListing profileDets={profileDets} />;
  } else if (page === "myorderrec") {
    content = <MyOrdersRec />;
  } else if (page === "myorder") {
    content = <MyOrders profileDets={profileDets} />;
  }

  return (
    <>
      <Dashboard
        title={page[0].toUpperCase() + page.substring(1)}
        profileDets={profileDets}
        content={content}
        handlePage={handlePage}
      />
    </>
  );
};

export default App;
