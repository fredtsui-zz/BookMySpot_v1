import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function GetClientsDialog(props) {
    const {open, handleClose, title, updateData} = props;
    const [query, setQuery] = React.useState({});
    const handleSubmit = async () => {
        if(!query.name || query.name === "") {
            console.log('calling get all clients');
            const response = await fetch('/api/getAllClients');
            const data = await response.json();
            updateData(data[0]);
        } else {
            console.log('calling get clients where name = ' + query.name);
            const response = await fetch('/api/getAllClients');
            const data = await response.json();
            updateData(data);
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