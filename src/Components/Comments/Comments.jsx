import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Comments = (props) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Card
          sx={{ maxWidth: 500 }}
          style={{ border: "none", boxShadow: "none", marginBottom: "2%" }}
        >
          <CardContent style={{ padding: 0, marginTop: "5%" }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={2.5}
                md={1.5}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  src={props.profilePictureUrl}
                  sx={{ width: 48, height: 48 }}
                >
                  P
                </Avatar>
              </Grid>
              <Grid item xs={9.5} md={10.5}>
                <Typography variant="h6">{props.firstname}</Typography>
                <Typography variant="body2" color="third.main">
                  {new Date(props.createdAt.toDate()).toLocaleString("de-DE", {
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Rating
                  name="half-rating"
                  size="small"
                  value={props.rating}
                  precision={1}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body1" color="third.main">
                  {props.comment}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Comments;
