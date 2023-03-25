import React, { useState } from "react";
import Base from "../core/Base";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import LOGO from "../assets/GIF/fingerprint-scan.gif";
import key from "../assets/GIF/key.gif";
import Pic from "../assets/images/login_nitc.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Input, TextField } from "@mui/material";

import { Button, Form } from "react-bootstrap";
import {
  authenticate,
  signin,
  isAuthenticated,
  forgotpassword,
} from "./helper/userapicalls";
import { Navigate } from "react-router-dom";
import { Label } from "@mui/icons-material";

function Signin() {
  const [details, setDetails] = useState({
    username: "b190501cs",
    password: "Sathwik@2311",
    forgot: false,
    loading: false,
    error: "",
  });
  const [showPassword, setshowPassword] = useState(false);

  const { username, password, forgot, loading, error } = details;

  const contactHO = () => {
    if (username === "") {
      return (
        <div
          className="alert alert-success"
          style={{ display: forgot ? "" : "none" }}
        >
          Enter username and click forgot password
        </div>
      );
    }
  };

  const loadingMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: loading ? "" : "none" }}
      >
        Loading
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-warning"
        style={{ display: error !== "" ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const forgotPass = (event) => {
    event.preventDefault();
    if (username) {
      setDetails({ ...details, forgot: true });
      forgotpassword(username).then((data) => {
        if (data.message) {
          setDetails({
            ...details,
            forgot: "Your new password will be sent to your mail.",
          });
        } else {
          setDetails({ ...details, forgot: "Enter proper username." });
        }
      });
    } else {
      setDetails({ ...details, forgot: true });
    }
  };

  const handleChange = (name) => (event) => {
    setDetails({
      ...details,
      error: "",
      forgot: false,
      loading: false,
      [name]: event.target.value,
    });
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Navigate to="/dashboard" />;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setDetails({ ...details, error: "", loading: true });
    signin({ id: username, pswd: password })
      .then((data) => {
        if (data.err) {
          console.log(data.err);
          setDetails({ ...details, error: data.err, loading: false });
        } else {
          authenticate(data, () => {
            setDetails({
              username: "",
              password: "",
              error: "",
              loading: false,
              forgot: false,
            });
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Base>
      {errorMessage()}
      {contactHO()}
      {loadingMessage()}
      <div className="loginpage">
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol sm="6">
              <div className="login-heading">
                <img src={LOGO} width="70" alt="Login logo" />
                <span className="login-heading-span">Log In</span>
              </div>

              <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
                {/*<MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Username"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  className="MDBinput"
                  placeholder="Username"
                  value={username}
                  right={0}
                  onChange={handleChange("username")}
                />
                  <MDBInput
                    className="MDBinput"
                    wrapperClass="mb-4 mx-5 w-100"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={handleChange("password")}
                    placeholder="Password"
                  > 
                  </MDBInput>
                 */}
                <FormControl variant="outlined" className="mb-4 mx-5 w-100">
                  <OutlinedInput
                    style={{ borderRadius: "8px", height: "50px" }}
                    value={username}
                    onChange={handleChange("username")}
                    placeholder="Username"
                  />
                  <p>Username</p>
                </FormControl>

                <FormControl variant="outlined" className="mb-4 mx-5 w-100">
                  <OutlinedInput
                    style={{ borderRadius: "8px", height: "50px" }}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setshowPassword(!showPassword);
                          }}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={handleChange("password")}
                    placeholder="Password"
                  />
                  <p>Password</p>
                </FormControl>

                <Button
                  className="mb-4 px-5 mx-5 w-100"
                  onClick={onSubmit}
                  color="info"
                  size="lg"
                >
                  Login
                </Button>
                <p className="mx-4">
                  <Button onClick={forgotPass} className="forgot">
                    Forgot password?
                  </Button>
                </p>
              </div>
            </MDBCol>

            <MDBCol sm="6" className="d-none d-sm-block px-0">
              <img
                src={Pic}
                height="100%"
                alt="Login image"
                className="w-100 loginimg"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      {performRedirect()}
    </Base>
  );
}

export default Signin;
