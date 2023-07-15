import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios'

const UpdatePassword = () => {
    const [ASCId , setASCUser] = useState('');
    const [userId, setUser] = useState("");
    const [ASCPassword, setASCPassword] = useState('');
    const [newPassword, setPassword] = useState('');
    async function handleSubmit(e){
        e.preventdfault()
        const data={
            ASCId,
            ASCPassword,
            userId,
            newPassword
        }
        try {
            axios.post('http://localhost:4000/Register',{...data},{withCredentials:true});
        } catch (error) {
            
        }
        console.log("Arigatho");
    }

    return (
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                <label>This id to check whether it is you </label><br/>
                <label>your userId :<input onChange={(e) => { setASCUser(e.target.value) }} /></label>
                <label>your password :<input onChange={(e) => { setASCPassword(e.target.value) }} /> </label><br/><br/>

                <label>Change Password For </label><br/>
                <label>userId : <input onChange={(e) => { setUser(e.target.value) }}/></label>
                <label>New password :<input onChange={(e) => { setPassword(e.target.value) }} /></label>
                <Button type='submit' >Submit</Button>
            </form>
        </div>
    );
}

export default UpdatePassword;
