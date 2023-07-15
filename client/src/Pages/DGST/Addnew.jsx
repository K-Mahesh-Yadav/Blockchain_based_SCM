import React, { useState } from 'react';
import axios from "axios";
import Navbar from "../../Components/Navbar";
import { useLocation } from 'react-router-dom';

const RegistrationForm = () => {
  const [selectedSeason, setSelectedSeason] = useState('');
  const [divId, setDivId] = useState('');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [Account, setAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [Registered, setRegistered] = useState('');
  const x = useLocation().state.userData;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (selectedSeason === "Unit") {
      const data = {
        Name: name,
        Id: parseInt(userId),
        Id1: parseInt(divId),
        Password: password,
        Role: 'ADST',
        Account: Account,
      };

      try {
        await axios.post('http://localhost:4000/Register', { ...data }, { withCredentials: true });
      } catch (error) {
        console.error(error);
        setErrorMessage("New user is not unique");
      }
    }

    if (selectedSeason === "Division") {
      const data = {
        Name: name,
        Id: parseInt(userId),
        Id1: 0,
        Password: password,
        Role: 'DDST',
        Account: Account,
      };

      try {
        await axios.post('http://localhost:4000/Register', { ...data }, { withCredentials: true }).then(()=>{
          setRegistered("User Registered sucessfully.")
        });
      } catch (error) {
        setErrorMessage("Oops ! Error while Registering");
      }
    }
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <>
      <Navbar x={x} />
      <section className="vh-100">
        <div className="container">
          <form style={{ marginTop: '100px', maxWidth: '500px', border: '2px solid black', padding: '15px' }} onSubmit={handleRegister} method='POST'>
            <div className="form-group row">
              <label> Add unit / div</label>
              <div>
                <label>
                  <input type="radio" name="season" value="Unit" checked={selectedSeason === "Unit"} onChange={handleSeasonChange} /> Unit
                </label>
                <label style={{ marginLeft: '10px' }}>
                  <input type="radio" name="season" value="Division" checked={selectedSeason === "Division"} onChange={handleSeasonChange} /> Division
                </label>
              </div>
            </div>
            {selectedSeason === "Unit" && (
              <div className="form-group row">
                <label htmlFor="div_id" className="col-sm-2 col-form-label">Division ID</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="div_id" placeholder="In case of unit, enter division ID under which it is" value={divId} onChange={(e) => setDivId(e.target.value)} /><br />
                </div>
              </div>
            )}
            <div className="form-group row">
              <label htmlFor="user_id" className="col-sm-2 col-form-label">User ID</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="user_id" placeholder="Enter User ID here" value={userId} onChange={(e) => setUserId(e.target.value)} required /><br />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="name" placeholder="Enter name to the base" value={name} onChange={(e) => setName(e.target.value)} required /><br />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="Account" className="col-sm-2 col-form-label">Account</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="Account" placeholder="Etherium Account" value={Account} onChange={(e) => setAccount(e.target.value)} required /><br />
              </div>
            </div>
            {Registered && <div id="login404" className='alert alert-success'role='alert' style={{ color: 'green' }}>{Registered}</div>}
            {errorMessage && <div id="login404" className='alert alert-danger'role='alert' style={{ color: 'red' }}>{errorMessage}</div>}
            <button type="submit" className="btn btn-primary" style={{ minWidth: '200px' }}>Register</button>
            <br /><br />
          </form>
        </div>
      </section>
    </>
  );
};

export default RegistrationForm;
