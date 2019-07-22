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
    const handleFindOverCapacity = async () => {
        let url = '/api/getClientIDOverCapacity';
        const response = await fetch(url);
        const data = await response.json();
        if(!data){
            console.log('no data returned, something wrong might happened at server');
        }
        updateData(data[0]);
        handleClose();
    }
    const handleSubmit = async () => {
        let url;
        if(!query.clientID || query.clientID === "") {
            url = '/api/getAllClients';
            console.log('calling get all clients');
        } else {
            console.log('calling get clients where ID = ' + query.CLientID);
            url='/api/getClientsInfoWithClientID/' + query.ClientID;
        }
        const response = await fetch(url);
        const data = await response.json();
        if(!data){
            console.log('no data returned, something wrong might happened at server');
        }
        updateData(data[0]);
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
                <TextField onChange={handleChange('ClientID')}/>
            
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleFindOverCapacity} color="primary">
                    Find Over Capacity
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Find
                </Button>
            </DialogActions>
        </Dialog>
    )

}