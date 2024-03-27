import React from "react";
import { useForm, Controller,useFieldArray  } from "react-hook-form";
import { TextField, Button, Typography, Grid, Container,MenuItem } from "@mui/material";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { addClient } from "./clientApi";

const verticalTypographyStyle = {
  writingMode: 'vertical-lr', // vertical writing mode from left to right
  textOrientation: 'mixed', // allows vertical text to be readable from top to bottom
  whiteSpace: 'nowrap', // prevents text from wrapping
 fontSize:'24px'
};
const allowedProducers = ['Pfizer-BioNTech', 'Moderna', 'Novavax'];

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    idNumber: Joi.string().required().min(9).max(9), // Assuming ID number should have 9 characters
    address: Joi.object().keys(
        {
            city: Joi.string().required(),
            road: Joi.string().required(),
            number: Joi.number().required()
        }
    ).required(),
    birthDate: Joi.date().iso(),
    phone: Joi.string().required(),
    selfPhone: Joi.string(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    positivRes: Joi.date().iso(),
    recovery: Joi.date().iso(),
    vaccinations: Joi.array().items(Joi.object({
        date: Joi.date().iso(),
        producer: Joi.string().valid(...allowedProducers)
    }))
});
const Add = ({ person={address:{}} }) => {
    //const navigate = useNavigate();
    const { handleSubmit, control, formState } = useForm({
        resolver: joiResolver(schema),
        mode: "onChange",
  
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "vaccinations",
      });
    const onSubmit = async (data) => {
        try {
            console.log(data);
            // let {firstName, lastName, idNumber, address, birthDate, phone, selfPhone, email,vaccinations,positivRes,recovery  } = data;
             let res = await addClient(data);
             console.log(res);
            window.location.href = "/";
            
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "oops!",
                text: error.request.statusText,

            });
            console.error(error)

        }
    };
    function generateIdRandom() {
        let randomString = '';
        for (let i = 0; i < 9; i++) {
          randomString += Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
        }
        return randomString;
      }
      
    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">
                            new Person details
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="First name"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Last name"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="idNumber"
                            control={control}
                            defaultValue={generateIdRandom}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="id number"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid> 
                    <Grid item xs={12}>
                        <Controller
                            name="birthDate"
                            control={control}
                            defaultValue={new Date().toISOString().split('T')[0]}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="birth date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }} // This ensures the label doesn't overlap with the value
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid> 
                      <Grid item xs={12}>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Phone number"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>  <Grid item xs={12}>
                        <Controller
                            name="selfPhone"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Self phone"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>  <Grid item xs={12}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Controller
                            name="address.city"
                            control={control}
                            defaultValue=" "
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="City"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Controller
                            name="address.road"
                            control={control}
                            defaultValue=" "
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Road"
                                    type="string"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                    <Typography style={verticalTypographyStyle}>Address</Typography>
</Grid>
                    <Grid item xs={10}>
                        <Controller
                            name="address.number"
                            control={control}
                            defaultValue=" "
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Number"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
            
                    </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="positivRes"
                            control={control}
                            defaultValue={new Date().toISOString().split('T')[0]}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="positive result date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }} // This ensures the label doesn't overlap with the value
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="recovery"
                            control={control}
                            defaultValue={new Date().toISOString().split('T')[0]}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="recovery date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }} // This ensures the label doesn't overlap with the value
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </Grid> 
                    <Typography>vaccinations</Typography>
        {fields.map((vaccination, index) => (
          <Grid container spacing={2} key={vaccination.id}>
            <Grid item xs={5}>
              <Controller
                name={`vaccinations[${index}].date`}
                control={control}
                defaultValue={new Date().toISOString().split('T')[0]}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Vaccine date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Controller
                name={`vaccinations[${index}].producer`}
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Producer"
                    variant="outlined"
                    fullWidth
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    select
                  >
                    {allowedProducers.map((producer) => (
                      <MenuItem key={producer} value={producer}>
                        {producer}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => remove(index)}>Remove</Button>
            </Grid>
          </Grid>
        ))}
        <Button onClick={() => append({ date: "", producer: "" })}>
          Add Vaccination
        </Button>
                   
                    <Grid item xs={12}> 
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            disabled={!formState.isValid}
                            fullWidth
                        >

                            submit

                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>

    );
}

export default Add;