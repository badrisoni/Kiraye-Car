import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'


class SignUp extends React.Component {

    state = {
        Fname: '',
        Lname: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
      };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
    
        const newUser = {
          Fname: this.state.Fname,
          Lname: this.state.Lname,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        };
    
        //this.props.registerUser(newUser, this.props.history);
        //console.log(newUser)

        axios
          .post('http://127.0.0.1:5000/user/signup', newUser)
          .then(res => {
              if(res.data.Error)
              {
                this.setState({errors:res.data.Error})
              }
              else
              {
                this.setState({errors:{}})
              }
          })
          .catch(err=>{
              console.log(err)
          })
    }

    render()
    {
        const theme = createMuiTheme();
        //console.log(this.state)
        const {errors} = this.state
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{marginTop: theme.spacing(8),display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <Avatar style={{margin: theme.spacing(1),backgroundColor: theme.palette.secondary.main}}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form style={{ width: '100%', marginTop: theme.spacing(3)}} noValidate onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        error={errors.Fname!==undefined}
                        helperText={errors.Fname?errors.Fname:null}
                        autoComplete="fname"
                        name="Fname"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        error={errors.Lname!==undefined}
                        helperText={errors.Lname?errors.Lname:null}
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="Lname"
                        autoComplete="lname"
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        error={errors.email!==undefined}
                        helperText={errors.email?errors.email:null}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        error={errors.password!==undefined}
                        helperText={errors.password?errors.password:null}
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        error={errors.password2!==undefined}
                        helperText={errors.password2?errors.password2:null}
                        variant="outlined"
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{margin: theme.spacing(3, 0, 2)}}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link to="/login" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
        );
    }
}


export default SignUp