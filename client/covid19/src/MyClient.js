import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {useDispatch} from 'react-redux'
import {
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
     Menu,
 MenuItem 

} from '@mui/material';
import { addVaccine, deleteClient, getClients, updatePositive, updateRecovery } from './clientApi';
import { useNavigate } from 'react-router-dom';
import { resetPerson, setPerson } from './personSlice';
import "./style.css"
const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    addButton: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
    },
    formInput: {
        marginBottom: '20px',
    },
});
const MyClient = () => {
    const navigate=useNavigate();
    const classes = useStyles();
    const [people, setPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [vaccineProdMenuOpen, setVaccineProdMenuOpen] = useState(false);
    const [vaccineProd, setVaccineProd] = useState('');
    const [reGetClients, setReGetClients] = useState(false);
    
const dispatch=useDispatch();
    useEffect(() => {
        getClients()
            .then(res => setPeople(res.data),
            setReGetClients(false))
            .catch(err => console.log(err))
    }, [reGetClients])
    //all the actions
    const handlePersonClick = (person) => {
        
        setSelectedPerson(person);
    };
    const handleDialogClose = () => {
        setSelectedPerson(null);
        dispatch(resetPerson())
    };

    const handleDeletePerson = async(id) => {
        let res=await deleteClient(id)
        console.log(`Deleting person with ID: ${id}`);
        setSelectedPerson(null);
        dispatch(resetPerson())
        handleDialogClose();
        setReGetClients(true)
      };
      const handleEditPerson=()=>{
    dispatch(setPerson(selectedPerson));
    navigate('/edit');
      }
       const handleAddPerson=()=>{
        dispatch(setPerson(selectedPerson));
    navigate('/add');
       }
      const setRecovery=()=>{
        selectedPerson.recovery=new Date().toISOString().split('T')[0];
        updateRecovery(selectedPerson._id,new Date().toISOString().split('T')[0])
        setReGetClients(true)

      }
      const setPositiveResult=()=>{
        selectedPerson.positivRes=new Date().toISOString().split('T')[0];
        updatePositive(selectedPerson._id,new Date().toISOString().split('T')[0])
        setReGetClients(true)

      }
const handleAddVaccineMenuOpen=()=>{
    setVaccineProdMenuOpen(true);
}
const handleAddVaccine=()=>{
    addVaccine(selectedPerson._id,new Date().toISOString().split('T')[0],vaccineProd)
    setReGetClients(true)
    setVaccineProdMenuOpen(false)
    setSelectedPerson(null)

}
//vaccine prod menu
const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (menuItem) => {
    setVaccineProd(menuItem);
    setAnchorEl(null);
  };
    return (<>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="people table">
                <TableHead>
                    <TableRow >
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Self Phone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {people.map((person) => (
                        <TableRow key={person.id} onClick={() => handlePersonClick(person)}>
                            <TableCell>{person.firstName}</TableCell>
                            <TableCell>{person.lastName}</TableCell>
                            <TableCell>{person.phone}</TableCell>
                            <TableCell>{person.selfPhone}</TableCell>
                            <TableCell>{person.email}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Button className="bottom"
        variant="contained"
        color="primary"
        startIcon={<span role="img" aria-label="Add">➕</span>}
        title="Add a client"
        onClick={() => handleAddPerson()}
      >
        Add Client
      </Button>
        <Dialog open={selectedPerson !== null} onClose={handleDialogClose}>
            <DialogTitle>{selectedPerson && `${selectedPerson.firstName} ${selectedPerson.lastName}`}</DialogTitle>
            <DialogContent>
                {selectedPerson && (
                    <div>
                        <Typography><strong>id:</strong> {selectedPerson.idNumber}</Typography>
                        <Typography><strong>birth date:</strong> {selectedPerson.birthDate}</Typography>
                        <Typography><strong>Phone:</strong> {selectedPerson.phone}</Typography>
                        <Typography><strong>Self Phone:</strong> {selectedPerson.selfPhone}</Typography>
                        <Typography><strong>Email:</strong> {selectedPerson.email}</Typography>
                        <Typography><strong>Vaccinations:</strong></Typography>
                        {selectedPerson.vaccinations && selectedPerson.vaccinations.map((vaccination, index) => (
                            <div key={index}>
                                <Typography>Date: {vaccination.date}, Producer: {vaccination.producer}</Typography>
                            </div>
                        ))}
                        {selectedPerson.positivRes && (
                            <Typography><strong>Positive Result:</strong> {selectedPerson.positivRes}</Typography>
                        )}
                        {selectedPerson.recovery && (
                            <Typography><strong>Recovery Date:</strong> {selectedPerson.recovery}</Typography>
                        )}
                    </div>
                )}
            </DialogContent>
            <DialogActions>{selectedPerson&&selectedPerson.recovery?<Typography color="primary">after recovery</Typography>:
            (selectedPerson&&selectedPerson.positivRes?
            (<Button onClick={setRecovery} color="secondary">recovered</Button>):
            (<Button onClick={setPositiveResult} color="secondary">positive result</Button>))
            }
               {selectedPerson&&selectedPerson.vaccinations.length<4&&<Button onClick={handleAddVaccineMenuOpen} color="secondary">Add vaccine</Button>}
               <Button onClick={handleEditPerson} color="secondary">Edit</Button>
                <Button onClick={() => handleDeletePerson(selectedPerson._id)} color="secondary">Delete</Button>
                <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
           { vaccineProdMenuOpen&&<div>
            <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        choose producer
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{handleClose("Pfizer-BioNTech")}}>Pfizer-BioNTech</MenuItem>
        <MenuItem onClick={()=>{handleClose("Moderna")}}>Moderna</MenuItem>
        <MenuItem onClick={()=>{handleClose("Novavax")}}>Novavax</MenuItem>
      </Menu></div>
      <Button onClick={handleAddVaccine} color="secondary">add</Button>
    </div>}
        </Dialog>
    </>
    );
}

export default MyClient;