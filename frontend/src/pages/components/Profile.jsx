import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
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
  paperContent: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
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
}));

const Profile = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState({});
  const [isLoading, setLoading] = useState({});

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

  let renderSection = "";

  if (profile.type == 0) {
    renderSection = (
      <>
        <Divider variant="middle" className={classes.divider} />
        <Grid item xs={12} className={classes.content}>
          <Typography>Contact: {profile.contact}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <Typography>Age: {profile.age}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <Typography>Batch: {profile.batch}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <Typography>Wallet: {profile.money}</Typography>
        </Grid>
      </>
    );
  } else {
    renderSection = (
      <>
        <Divider variant="middle" className={classes.divider} />
        <Grid item xs={12} className={classes.content}>
          <Typography>Contact: {profile.contact}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <Typography>Shop: {profile.shop}</Typography>
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
          <div className={classes.paperContent}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.content}>
                <Typography component="h6" variant="h4">
                  {profile.name}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.content}>
                <Typography component="h1" variant="subtitle1">
                  {profile.email} | {profile.type ? "Vendor" : "Buyer"}
                </Typography>
              </Grid>
              {renderSection}
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
};

export default Profile;
