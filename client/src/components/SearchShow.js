import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { CardHeader } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  content: {
    marginTop: -20,
  },
});

export default function SearchShow(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleAction = () => {
    // add clear searchResults function
    history.push("/object/" + props.searchItem.params);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleAction}>
        <CardMedia
          className={classes.media}
          image={props.searchItem.image}
          title={props.searchItem.name}
        />
        <CardHeader
          action={
            <IconButton onClick={() => console.log("add to list")}>
              <AddIcon />
            </IconButton>
          }
          title={props.searchItem.name}
          subheader={props.searchItem.type}
        />
        <CardContent className={classes.content}>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            Common Name: {props.searchItem.common} <br />
            Other Identifiers: {props.searchItem.ngcic} <br />
            Apparent Magnitude: {props.searchItem.mag} mag <br />
            Distance: {props.searchItem.dist} kly
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
