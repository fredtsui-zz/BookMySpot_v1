import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function AddOptionOfferDialog(props) {
    const {open, handleClose, title, subID} = props;
    const [query, setQuery] = React.useState({
        SupplierName: subID
    });
    if(!subID) {
        return <Dialog open={open} onClose={handleClose} >
            Need to provide a valid Supplier Name
        </Dialog>
    }
    const handleSubmit = async () => {
        if(query.SupplierName) {
            console.log('calling insertNewOptionOffer');
            const response = await fetch('/api/insertNewOptionOffer', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(query),
              });
            const data = await response.text();
            if(data){
                console.log('succeeded', data);
            } else {
                console.log('failed');
            }
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
                <DialogContentText>Option Name</DialogContentText>
                <TextField onChange={handleChange('OptionName')}/>
                <DialogContentText>Price</DialogContentText>
                <TextField onChange={handleChange('Price')}/>
                <DialogContentText>Stock</DialogContentText>
                <TextField onChange={handleChange('Stock')}/>
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