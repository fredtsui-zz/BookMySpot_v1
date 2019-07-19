// control panel is the left-sided list

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

function GetClientsDialog(props) {
    const {open, handleClose, title} = props;
    const [query, setQuery] = React.useState({name: ""});
    const handleSubmit = () => {
        if(!query.name || query.name == "") {
            console.log('calling get all clients');
        } else {
            console.log('calling get clients where name = ' + query.name);
        }
        handleClose();
    }

    const handleChange = (name) => (event) => {
        setQuery({ ...query, [name]: event.target.value});
    }

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>GetClientsFilter</DialogContentText>
                <TextField onChange={handleChange('name')}/>
            
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Query
                </Button>
            </DialogActions>
        </Dialog>
    )

}

function FormDialog(props) {
    const {open, handleClose, title} = props;
    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>DialogContentText</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default function ControlPanel() {
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
                <ListItemText primary="Form Submit 1" />
                </ListItem>
                <ListItem button onClick={handleOpen2}>
                <ListItemText primary="Form Submit 2" />
                </ListItem>
            </List>
        </Paper>
        <GetClientsDialog open={open1} handleClose={handleClose1} title="Form 1"/>
        <FormDialog open={open2} handleClose={handleClose2} title="Form 2"/>
    </div>
  );
}