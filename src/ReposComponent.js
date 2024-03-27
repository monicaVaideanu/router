import React, {useState, useEffect} from '.react';
import HomeComponent from './HomeComponent';

const ReposComponent = () => {
    const[userRepo, setUserRepo] = useState(null);

    useEffect(() =>{
async function fetchRepo(){
        const fetchResponse = await fetch("https://api.github.com/users/monicaVaideanu/repos")
        const reponse = await fetchResponse.json();
        setUserData(reponse);
    } fetchRepo();
    }
    
    )
}