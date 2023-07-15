import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
// import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import ADSTDashboard from "./Pages/ADST/Adst";
import Adrr from "./Pages/ADST/Adrr";
import DDSTDashboard from "./Pages/DDST/Ddst";
import RequestReceived from "./Pages/DDST/Ddrr";
import RequestForm from "./Pages/ADST/req";
import Allreq from "./Pages/ADST/Allreq";
import DgstDashboard from "./Pages/DGST/Dgst";
import DgrrRequests from "./Pages/DGST/Dgrr";
import RegistrationForm from "./Pages/DGST/Addnew";
import Manufacturer from "./Pages/MANUFACTURER/Manufacturer";
import CardList from "./Pages/ADST/Transactions";
import Error404 from "./Pages/ErrorPage";
import UpdatePassword from "./Pages/DGST/UpdatePassword";

function App() {
    return (
        <Router>
            {/* <Navbar/> */}
            <Routes>
                <Route path='/' element={<Login />} /> {/*  onChangeUser={handleOnLogInUsed} */}

                <Route path={`/:user/ADSTdashboard`} element={<ADSTDashboard />} >
                    <Route path='AdrrRequests' element={<Adrr />} />
                    <Route path='request' element={<RequestForm />} />
                    <Route path='Allreq' element={<Allreq />} />
                    <Route path="Transactions" element={<CardList />} />
                </Route>

                <Route path={`/:user/DDSTDashboard`} element={<DDSTDashboard />}>
                    <Route path='DdrrRequests' element={<RequestReceived />} />
                    <Route path='Allreq' element={<Allreq />} />
                    <Route path="Transactions" element={<CardList />} />
                </Route>

                <Route path={`/:user/DgstDashboard`} element={<DgstDashboard />} >
                    <Route path='DgrrRequests' element={<DgrrRequests />} />
                    <Route path='Addnew' element={<RegistrationForm />} />
                    <Route path='Allreq' element={<Allreq />} />
                    <Route path="Transactions" element={<CardList />} />
                    <Route path='UpdatePassword' element={<UpdatePassword/>} />
                </Route>

                <Route path={`/:user/Manufacturer`} element={<Manufacturer />}>
                    <Route path="Transactions" element={<CardList />} />
                </Route>
                <Route path='*' element={<Error404 />} />
            </Routes>
        </Router>
    );
}

export default App;
