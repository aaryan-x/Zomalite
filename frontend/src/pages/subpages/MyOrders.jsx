import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { FoodCard } from "../components/FoodCard";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import OrderService from "../../services/orders";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: "100%",
    },
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
  },
  paperContent: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  contentLeft: {
    marginLeft: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  contentMid: {
    display: "flex",
    justifyContent: "center",
  },
  searchButton: {
    // marginTop: theme.spacing(2),
  },
  searchBar: {
    width: "65%",
  },
  lowerContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  slider: {
    marginTop: theme.spacing(2),
  },
  salary: {
    width: 200,
  },
  textBar: {
    width: "70%",
  },
}));

const App = ({ profileDets }) => {
  const classes = useStyles();

  const handleUpdate = async (status, order) => {
    await OrderService.updateOrder({
      orderId: order._id,
      status: status,
    });
  };

  const genContent = (order) => {
    const food = order.food;
    return (
      <>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {food.name}
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          {food.veg ? "Veg" : "Non-Veg"} • Rs. {food.price}
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          gutterBottom
        >
          Amount: {order.amount}
        </Typography>
      </>
    );
  };

  const genActionVendor = (order) => {
    let nextAction = "";
    let nextStatus = "";
    let nextCancel = false;
    let nextButton = false;

    if (order.status == "PLACED") {
      nextAction = "ACCEPT";
      nextStatus = "ACCEPTED";
      nextButton = true;
      nextCancel = true;
    } else if (order.status == "ACCEPTED") {
      nextAction = "START COOKING";
      nextStatus = "COOKING";
      nextButton = true;
      nextCancel = false;
    } else if (order.status == "COOKING") {
      nextAction = "FINISH COOKING";
      nextStatus = "READY FOR PICKUP";
      nextButton = true;
      nextCancel = false;
    }

    const handleCancel = async () => {
      await handleUpdate("REJECTED", order);
    };

    const handleAction = async () => {
      await handleUpdate(nextStatus, order);
    };

    return (
      <>
        <Button disabled>{order.status}</Button>

        {nextButton ? (
          <Button variant="contained" onClick={handleAction}>
            {nextAction}
          </Button>
        ) : (
          ""
        )}

        {nextCancel ? (
          <Button variant="contained" onClick={handleCancel}>
            Reject
          </Button>
        ) : (
          ""
        )}
      </>
    );
  };

  const genActionBuyer = (order) => {
    let nextAction = "";
    let nextStatus = "";
    let nextCancel = false;
    let nextButton = false;

    if (order.status == "READY FOR PICKUP") {
      nextAction = "PICK UP";
      nextStatus = "COMPLETED";
      nextButton = true;
      nextCancel = false;
    } else {
      nextAction = "";
      nextStatus = "";
      nextCancel = false;
      nextButton = false;
    }

    const handleCancel = async () => {
      await handleUpdate("REJECTED", order);
    };

    const handleAction = async () => {
      await handleUpdate(nextStatus, order);
    };

    return (
      <>
        <Button disabled>{order.status}</Button>

        {nextButton ? (
          <Button variant="contained" onClick={handleAction}>
            {nextAction}
          </Button>
        ) : (
          ""
        )}

        {nextCancel ? (
          <Button variant="contained" onClick={handleCancel}>
            Reject
          </Button>
        ) : (
          ""
        )}
      </>
    );
  };

  const [orders, setOrders] = useState([]);

  const setData = async () => {
    const res = await OrderService.getAll();
    setOrders(res);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {orders.map((order) => (
            <div key={order._id}>
              <Grid item>
                <FoodCard
                  content={genContent(order)}
                  action={
                    profileDets.profileType == 0
                      ? genActionBuyer(order)
                      : genActionVendor(order)
                  }
                />
              </Grid>
            </div>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
