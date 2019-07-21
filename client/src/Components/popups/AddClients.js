import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function AddClientsDialog(props) {
    const {open, handleClose, title, updateData} = props;
    const [query, setQuery] = React.useState({});
    const handleSubmit = async () => {
        console.log(query);
        if(query.ClientName) {
            console.log('calling add clients');
            const response = await fetch('/api/insertNewClients', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(query),
              });
            const data = await response.text();
            console.log('succeeded', data);
        } else {
            alert('Error: no name as input');
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
                <DialogContentText>Name</DialogContentText>
                <TextField onChange={handleChange('ClientName')}/>
                <DialogContentText>Address</DialogContentText>
                <TextField onChange={handleChange('Address')}/>
                <DialogContentText>Email</DialogContentText>
                <TextField onChange={handleChange('Email')}/>
                <DialogContentText>Phone</DialogContentText>
                <TextField onChange={handleChange('Phone')}/>
                <DialogContentText>BillingInfo</DialogContentText>
                <TextField onChange={handleChange('BillingInfo')}/>
            
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