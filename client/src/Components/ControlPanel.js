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
import GetLocationsDialog from './popups/GetLocations';
import GetEventsDialog from './popups/GetEvents';
import AddSuppliersDialog from './popups/AddSuppliers';
import AddLocationsDialog from './popups/AddLocations';
import GetOptionOffersDialog from './popups/getOptionOffers';
import GetSuppliersDialog from './popups/GetSuppliers';

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
  const [open, setOpen] = React.useState("");

  const classes = useStyles();

  const getAllClients = async () => {
    const response = await fetch('/api/getAllClients');
    const data = await response.json();
    updateData(data[0]);
  }

  const getAllLocations = async () => {
    const response = await fetch('/api/getAllLocation');
    const data = await response.json();
    updateData(data[0]);
  }

  const handleOpen = (name) => () => {
    setOpen(name);
  }

  const handleClose = () => {
      setOpen('');
  }

  return (
    <div  className={classes.root}>
        <Paper className={classes.addMarging}>
            <List component="nav" aria-label="Main mailbox folders">
                <ListItem button onClick={getAllClients}>
                <ListItemText primary="Get All Clients" />
                </ListItem>
                <ListItem button onClick={getAllLocations}>
                <ListItemText primary="Get All Locations" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav">
                <ListItem button onClick={handleOpen('get event')}>
                <ListItemText primary="query events" />
                </ListItem>
                <ListItem button onClick={handleOpen('get client')}>
                <ListItemText primary="query clients" />
                </ListItem>
                <ListItem button onClick={handleOpen('get supplier')}>
                <ListItemText primary="get supplier" />
                </ListItem>
                <ListItem button onClick={handleOpen('get location')}>
                <ListItemText primary="query locations" />
                </ListItem>
                <ListItem button onClick={handleOpen('add client')}>
                <ListItemText primary="add a client" />
                </ListItem>
                <ListItem button onClick={handleOpen('add supplier')}>
                <ListItemText primary="add suppliers" />
                </ListItem>
                <ListItem button onClick={handleOpen('add location')}>
                <ListItemText primary="add locations" />
                </ListItem>
                <ListItem button onClick={handleOpen('get option offer')}>
                <ListItemText primary="get option offer" />
                </ListItem>
                
            </List>
        </Paper>
        <GetClientsDialog 
            open={open === "get client"} 
            handleClose={handleClose} 
            updateData={updateData} 
            title="Find Clients"/>
        <AddClientsDialog 
            open={open === "add client"} 
            handleClose={handleClose} 
            updateData={updateData} 
            title="Add Client"/>
        <GetLocationsDialog 
            open={open === "get location"} 
            handleClose={handleClose}
            updateData={updateData} 
            title="Find Locations"/>
        <GetEventsDialog 
            open={open === "get event"} 
            handleClose={handleClose} 
            updateData={updateData} 
            title="Find Events"/>
        <AddSuppliersDialog 
            open={open === "add supplier"} 
            handleClose={handleClose} 
            updateData={updateData} 
            title="Add Supplier"/>
        <AddLocationsDialog 
            open={open === "add location"} 
            handleClose={handleClose} 
            updateData={updateData} 
            title="Add Location"/>
        <GetOptionOffersDialog
            open={open === "get option offer"} 
            handleClose={handleClose} 
            updateData={updateData} 
            title="Find Option Offers"/>
        <GetSuppliersDialog
            open={open === "get supplier"} 
            handleClose={handleClose} 
            updateData={updateData} 
            title="Get Suppliers"/>
    </div>
  );
}