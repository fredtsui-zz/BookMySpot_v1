import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function AddInviteesDialog(props) {
    const {open, handleClose, title, subID} = props;
    
    const [query, setQuery] = React.useState({
        Invitees: []
    });
    if(!subID) {
        return <Dialog open={open} onClose={handleClose} >
            <DialogContentText>No EventID provided</DialogContentText>
        </Dialog>
    }
    const handleSubmit = async () => {
        console.log(query);
        if(query.Invitees.length > 0) {
            console.log('calling insertNewInvitation');
            query.Invitees.map(async (invitee, i) => {
                const response = await fetch('/api/insertNewInvitation', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        EventID: subID,
                        Email: invitee.Email,
                        InviteeName: invitee.Name
                    }),
                  });
                const data = await response.text();
                if(data){
                    console.log('succeeded at index' + i, data);
                } else {
                    console.log('failed');
                }
            });
            handleClose();
        } else {
            alert('Error: no EventID as input');
        }
    }
    const addInvitee = () => {
        setQuery({...query, Invitees:query.Invitees.concat({name: "", email: ""})});
    }

    const handleChange = (name, i) => (event) => {
        if(name === 'InviteesName'){
            let invitees = query.Invitees;
            invitees[i].Name = event.target.value;
            setQuery({...query, Invitees: invitees});
        } else if (name === 'InviteesEmail'){
            let invitees = query.Invitees;
            invitees[i].Email = event.target.value;
            setQuery({...query, Invitees: invitees});
        } else {
            setQuery({ ...query, [name]: event.target.value});
        }
        
    }

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>Invitees</DialogContentText>
                {query.Invitees && query.Invitees.map((invitee, i) => {
                    return (<div>
                        <DialogContentText>Invitees #{i}</DialogContentText>
                        <TextField value={invitee.Name} onChange={handleChange('InviteesName', i)}/>
                        <DialogContentText>Email</DialogContentText>
                        <TextField value={invitee.Email} onChange={handleChange('InviteesEmail', i)}/>
                    </div>)
                })}
            </DialogContent>

            <DialogActions>
                <Button onClick={addInvitee}>
                    Add A Row
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Insert
                </Button>
            </DialogActions>
        </Dialog>
    )

}