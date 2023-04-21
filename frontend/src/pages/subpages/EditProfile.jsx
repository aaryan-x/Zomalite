import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";

import ProfileService from "../../services/profile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: "100%",
    },
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    height: theme.spacing(20),
    width: theme.spacing(20),
  },
  divider: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
  },
  avatarGrid: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  },
  paperContentAbove: {
    marginTop: theme.spacing(8),
  },
  paperContentBelow: {
    marginBottom: theme.spacing(4),
  },
}));

const EditForm = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const res = await ProfileService.getProfile();
      if (res.status === 0) {
        setProfile(res);
      }
      setLoading(false);
    };

    setData();
  }, []);

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const res = await ProfileService.updateProfile(profile);

    if (res.status === 1) {
      console.log(res.error);
    } else {
      console.log(res.content);
    }
  };

  let renderSection = "";
  let renderContainer = "";

  if (profile.type === 0) {
    renderContainer = (
      <>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={profile.name}
            onChange={handleChange}
            name="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact"
            variant="outlined"
            fullWidth
            value={profile.contact}
            onChange={handleChange}
            name="contact"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            value={profile.age}
            onChange={handleChange}
            name="age"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Money"
            variant="outlined"
            fullWidth
            value={profile.money}
            onChange={handleChange}
            name="money"
          />
        </Grid>
      </>
    );
  } else {
    renderContainer = (
      <>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={profile.name}
            onChange={handleChange}
            name="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact"
            variant="outlined"
            fullWidth
            value={profile.contact}
            onChange={handleChange}
            name="contact"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Shop"
            variant="outlined"
            fullWidth
            value={profile.shop}
            onChange={handleChange}
            name="shop"
          />
        </Grid>
      </>
    );
  }

  if (isLoading) {
    return "";
  } else {
    return (
      <div className={classes.root}>
        <Paper elevation={6}>
          <Container component="main" maxWidth="xs">
            <div className={classes.paperContentAbove}>
              <Grid container spacing={1}>
                <Grid item xs={12} className={classes.content}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    disabled
                    defaultValue={profile.email}
                  />
                </Grid>
                {renderContainer}
              </Grid>
            </div>
          </Container>
          <div className={classes.paperContentBelow}>
            <Grid container spacing={1} className={classes.paperContentBelow}>
              {renderSection}
            </Grid>
            <Grid item xs={12} className={classes.content}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
              >
                Save Changes
              </Button>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
};

const App = ({ profileDets }) => {
  return <EditForm profileType={profileDets.profileType} />;
};

export default App;
