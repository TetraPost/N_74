import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as loginAction from 'actions/auth';




function Form(){
    const {status: statusAuth, profile: getName} = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const users = [];
    const [status, setStatus] = useState('');
    const [userinfo, setUserInfo] = useState(users);
    
    const handleSubmit = (event) => {
        if (event){
        event.preventDefault();
        const data = new FormData(event.target);
        const mess = data.getAll('name')
        getDataFromSwapi(mess);
        }
        return null;
    }

    const getDataFromSwapi = async (data) => {
        try{
        const result = await axios.get(`https://swapi.dev/api/people/${data[0]}/`);
        //console.log(result.data);
        setStatus(true);
        
        setUserInfo(result.data.name);
        const action = await loginAction.login(result.data.name, 'no data');
        dispatch(action);

        } catch (error){
            setStatus(false);
            if(error.response){
                setUserInfo(error.response.status);
                console.log(error.response.status);
        }
    }   

    }

    useEffect(()=>{
        handleSubmit();
    })
    
    return (
        <div>
            <form id="form" onSubmit={handleSubmit} enctype="multipart/form-data">
                <div class="form-group">
                    <label for="inputUserId">User ID</label>
                    <input type="text" name="name" class="form-control" id="inputUserId" aria-describedby="userIdInputHelper" placeholder="Enter user ID" />
                    <small id="userIdInputHelper" class="form-text text-muted">id</small>
                </div>
                <button class="btn btn-primary">Send data</button>
                <p>{statusAuth}</p>
                <p>{getName}</p>
                
                
            </form>
            <p>{status ? `OK` : 'Not OK'}</p>
            <p>{userinfo}</p>
            <hr/>
        </div>
        
    )
};

export default Form;