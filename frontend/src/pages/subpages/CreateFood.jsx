import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
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
  },
  paperContent: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();

  const [foodForm, setForm] = useState({
    name: "",
    price: 0,
    veg: true,
  });

  const handleChange = (event) => {
    setForm({
      ...foodForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    await FoodService.addFood(foodForm);

    setForm({
      name: "",
      price: 0,
      veg: true,
    });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={6}>
        <div className={classes.paperContent}>
          <Container component="main" maxWidth="xs">
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.content}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={foodForm.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.content}>
                <TextField
                  label="Price"
                  helperText="Price of food item"
                  variant="outlined"
                  fullWidth
                  name="price"
                  onChange={handleChange}
                  value={foodForm.price}
                />
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Veg/NonVeg</InputLabel>
                  <Select
                    name="veg"
                    value={foodForm.veg}
                    onChange={handleChange}
                  >
                    <MenuItem value={true}>Veg</MenuItem>
                    <MenuItem value={false}>Non Veg</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                >
                  Create Food
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Paper>
    </div>
  );
};

export default App;
