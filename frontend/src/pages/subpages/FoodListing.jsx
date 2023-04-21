import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { FoodCard } from "../components/FoodCard";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import FuzzySearch from "fuzzy-search";

import FoodService from "../../services/foods";
import UserService from "../../services/users";
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
  price: {
    width: 200,
  },
  textBar: {
    width: "70%",
  },
}));

const App = () => {
  const classes = useStyles();

  const genContent = (food) => {
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
          Shop : {food.vendor.shop}
        </Typography>
      </>
    );
  };

  const [user, setUser] = useState("");

  const genAction = (food) => {
    const handleSubmit = async () => {
      const res = await OrderService.addOrder({
        food,
        user,
        amount: filters.amount,
      });
      if (res.status == 1) {
        alert("Not enough cash in wallet");
      }
      setData();
    };

    return (
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Buy
      </Button>
    );
  };

  const [foods, setFoods] = useState([]);

  const setData = async () => {
    const foodRes = await FoodService.getAll();
    const userRes = await UserService.initDashboard();
    setFoods(foodRes);
    setUser(userRes);
  };

  useEffect(() => {
    setData();
  }, []);

  const [filters, setFilters] = useState({
    search: "",
    sortBase: "name",
    order: "1",
    type: "both",
    amount: 1,
    price: [0, 100],
  });

  const handleChange = (event, newVal) => {
    if (event.target.value !== undefined) {
      setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      });
    } else if (event.currentTarget.value != undefined) {
      setFilters({
        ...filters,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    } else {
      setFilters({
        ...filters,
        price: newVal,
      });
    }
  };

  let filtered = foods;

  const fizz = new FuzzySearch(foods, ["name"]);

  filtered = fizz.search(filters.search);

  filtered = filtered.sort((a, b) => {
    if (filters.sortBase == "name") {
      if (a.name < b.name) {
        return filters.order * 1;
      } else if (a.name > b.name) {
        return filters.order * -1;
      } else {
        return 0;
      }
    }

    if (filters.sortBase === "price") {
      return filters.order * (a.price - b.price);
    }
  });

  filtered = filtered.filter((val) => {
    if (filters.type === "both") {
      return true;
    } else if (filters.type == "veg") {
      return val.veg;
    } else {
      return !val.veg;
    }
  });

  filtered = filtered.filter(
    (food) =>
      food.price >= filters.price[0] * 100 &&
      food.price <= filters.price[1] * 100
  );

  return (
    <>
      <Container>
        <div className={classes.root}>
          <Paper elevation={3}>
            <div className={classes.paperContent}>
              <Grid container spacing={1}>
                <Grid item xs={4} className={classes.contentLeft}>
                  <TextField
                    className={classes.searchBar}
                    label="Search"
                    helperText="Search for foods"
                    name="search"
                    value={filters.search}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4} className={classes.searchButton}>
                  <InputLabel>
                    <Typography variant="caption">Sort Based On</Typography>
                  </InputLabel>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="primary"
                      name="sortBase"
                      value="name"
                      onClick={handleChange}
                    >
                      Name
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      name="sortBase"
                      value="price"
                      onClick={handleChange}
                    >
                      Price
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={3} className={classes.searchButton}>
                  <InputLabel>
                    <Typography variant="caption">Sorting Order</Typography>
                  </InputLabel>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="primary"
                      name="order"
                      value={1}
                      onClick={handleChange}
                    >
                      Ascending
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      name="order"
                      value={-1}
                      onClick={handleChange}
                    >
                      Descending
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <br />
              <div className={classes.paperContent}>
                <Grid container spacing={1}>
                  <Grid item xs={3} className={classes.contentLeft}>
                    <FormControl className={classes.textBar}>
                      <InputLabel>Food Type</InputLabel>
                      <Select
                        name="type"
                        value={filters.type}
                        onChange={handleChange}
                      >
                        <MenuItem value="veg">Veg</MenuItem>
                        <MenuItem value="nonveg">Non Veg</MenuItem>
                        <MenuItem value="both">Both</MenuItem>
                      </Select>
                      <FormHelperText>Filter based on Food Type</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} className={classes.contentLeft}>
                    <div className={classes.price}>
                      <InputLabel>
                        <Typography variant="caption">
                          Filter Price (in 100s)
                        </Typography>
                      </InputLabel>
                      <Slider
                        value={filters.price}
                        className={classes.slider}
                        valueLabelDisplay="auto"
                        name="price"
                        onChange={handleChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={3} className={classes.searchButton}>
                    <TextField
                      className={classes.searchBar}
                      label="Amount"
                      helperText="Number of Items you want to buy"
                      name="amount"
                      type="number"
                      value={filters.amount}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Paper>
        </div>
        <Grid container spacing={3}>
          {filtered.map((food) => (
            <div key={food._id}>
              <Grid item>
                <FoodCard content={genContent(food)} action={genAction(food)} />
              </Grid>
            </div>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
