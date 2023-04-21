import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { FoodCard } from "../components/FoodCard";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import FoodService from "../../services/foods";

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

const EditDialog = ({ food, setData }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    ...food,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await FoodService.editFood({ ...form, id: food._id });
    handleClose();
    await setData();
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Edit</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Food</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={form.name}
            name="name"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={form.price}
            name="price"
            onChange={handleChange}
          />
          <Grid item xs={12} className={classes.content}>
            <FormControl className={classes.formControl}>
              <InputLabel>Veg/NonVeg</InputLabel>
              <Select name="veg" value={form.veg} onChange={handleChange}>
                <MenuItem value={true}>Veg</MenuItem>
                <MenuItem value={false}>Non Veg</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

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

  const genAction = (food) => (
    <>
      <EditDialog food={food} setData={setData} />
      <Button value={food._id} onClick={handleDelete}>
        Delete
      </Button>
    </>
  );

  const [foods, setFoods] = useState([]);

  const setData = async () => {
    const res = await FoodService.getRecFoods();
    setFoods(res);
  };

  useEffect(() => {
    setData();
  }, []);

  const handleDelete = async (event) => {
    await FoodService.deleteFood({ foodId: event.currentTarget.value });
    setData();
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {foods.map((food) => (
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
