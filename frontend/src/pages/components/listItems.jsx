import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from "@material-ui/icons/Assignment";

export const buyerListItems = (handlePage) => {
  return (
    <div>
      <ListItem value="myprofile" onClick={handlePage} button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem value="foodlistings" onClick={handlePage} button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Food Listings" />
      </ListItem>
      <ListItem value="myorder" onClick={handlePage} button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="My Orders" />
      </ListItem>
      <ListItem value="editprofile" onClick={handlePage} button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItem>
    </div>
  );
};

export const vendorListItems = (handlePage) => {
  return (
    <div>
      <ListItem value="myprofile" onClick={handlePage} button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem value="addfooditem" onClick={handlePage} button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Add Food Item" />
      </ListItem>
      <ListItem value="myorderrec" onClick={handlePage} button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="My Food Items" />
      </ListItem>
      <ListItem value="editprofile" onClick={handlePage} button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItem>
      <ListItem value="myorder" onClick={handlePage} button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="My Orders" />
      </ListItem>
    </div>
  );
};
