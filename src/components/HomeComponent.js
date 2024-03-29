import React, {useEffect, useState} from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const HomeComponent = () => {
    const[userData, setUserData] = useState([]);
    const[avatar, setUserAvatar] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchUserData(){
        const fetchResponse = await fetch("https://api.github.com/users/monicaVaideanu");
        const jsonResponse = await fetchResponse.json();
        setUserData(jsonResponse);
        }
        fetchUserData();
    }, []);

    const goToRepos = () => {
        navigate ('/repos');
    }

    useEffect(()=>{
        if(userData){
        async function fetchUserAvatar(){
        const fetchResponse = await fetch(userData.avatar_url);
        const img = await fetchResponse.blob();
        setUserAvatar(URL.createObjectURL(img));
        }
         fetchUserAvatar();
        }
       
    },[userData]);

    if(!userData){
        return <div>Loading...</div>; 
    }

    return(
        <div>
            <h1>Hello {userData.login}</h1>
                {avatar && <img src={avatar} alt="User Avatar" />}
            <h5>Public repos: {userData.public_repos}</h5>
            <h5>Public following: {userData.followers}</h5>
            <h5>Public followers: {userData.following}</h5>
            <Box display="flex" justifyContent="center" m={2}>
                <Button variant="contained" onClick={goToRepos}>Repos</Button>
            </Box>
        </div>
    );
    
}
export default HomeComponent;