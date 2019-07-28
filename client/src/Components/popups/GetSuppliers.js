import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

export default function GetSuppliersDialog(props) {
    const {open, handleClose, title, updateData} = props;
    const [query, setQuery] = React.useState({
        IsCater: false,
        IsFlower: false,
        IsEntertainment: false
    });
    
    const handleSubmit = async () => {
        let url;
        if(query.IsCater || query.IsFlower || query.IsEntertainment) {
            url = '/api/getSuppliers/'+ (query.IsCater? 1:0) + '/' + 
                    (query.IsFlower? 1: 0) + '/' + 
                    (query.IsEntertainment? 1:0);
        } else if (query.OptionName){
            url = '/api/getAllSuppliersOfOption/' + query.OptionName;
        } else if (query.locationName || query.Season){
            url='/api/getAllSuppliersOfferLocation/' + query.locationName + '/' + query.Season;
        } else if (query.EventID) {
            url = '/api/getAllSuppliersInEvent/' + query.EventID;
        } else {
            url = '/api/getSuppliers/0/0/0';
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
                <DialogContentText>Option Name</DialogContentText>
                <TextField onChange={handleChange('OptionName')}/>
                <DialogContentText>Event ID</DialogContentText>
                <TextField onChange={handleChange('EventID')}/>
                <DialogContentText>Catering</DialogContentText>
                <Checkbox checked={query.isCater} onChange={handleChange('IsCater')} value={!query.isCater}/>
                <DialogContentText>Flower</DialogContentText>
                <Checkbox checked={query.isFlower} onChange={handleChange('IsFlower')} value={!query.isFlower}/>
                <DialogContentText>Entertainment</DialogContentText>
                <Checkbox checked={query.isEntertainment} onChange={handleChange('IsEntertainment')} value={!query.isEntertainment}/>
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