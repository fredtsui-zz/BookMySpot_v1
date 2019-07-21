// control panel is the left-sided list

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import GetClientsDialog from './popups/GetClients';
import AddClientsDialog from './popups/AddClients';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '20%',
    float: 'left',
    display: 'block',
    top: 0,
    marginTop: theme.spacing(3),
    paddingTop: '20px',
    backgroundColor: theme.palette.background.paper,
  },
  addMarging: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
  }
}));


export default function ControlPanel(props) {
  const {updateData} = props;
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const classes = useStyles();

  const handleOpen1 = () => {
      setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen2 = () => {
      setOpen2(true);
  };
  
  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <div  className={classes.root}>
        <Paper className={classes.addMarging}>
            <List component="nav" aria-label="Main mailbox folders">
                <ListItem button>
                <ListItemText primary="Get All Clients" />
                </ListItem>
                <ListItem button>
                <ListItemText primary="Get All Suppliers" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="Secondary mailbox folders">
                <ListItem button onClick={handleOpen1}>
                <ListItemText primary="query clients" />
                </ListItem>
                <ListItem button onClick={handleOpen2}>
                <ListItemText primary="add a client" />
                </ListItem>
            </List>
        </Paper>
        <GetClientsDialog open={open1} handleClose={handleClose1} updateData={updateData} title="query clients parameters"/>
        <AddClientsDialog open={open2} handleClose={handleClose2} updateData={() => {console.log('succeed')}} title="add client"/>
    </div>
  );
}