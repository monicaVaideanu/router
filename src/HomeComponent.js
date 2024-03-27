import React, {useState, useEffect} from 'react';

const HomeComponent = () => {
    const[userData, setUserData] = useState(null);
    const[avatar, setUserAvatar] = useState(null);

    useEffect(()=>{
        async function fetchUserData(){
        const fetchResponse = await fetch("https://api.github.com/users/monicaVaideanu");
        const jsonResponse = await fetchResponse.json();
        setUserData(jsonResponse);
        }
        fetchUserData();
    }, []);

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
            {avatar && <img src={avatar} alt="User Avatar" />} {/* Afisează imaginea doar dacă avatar este setat */}
            <h5>Public repos: {userData.public_repos}</h5>
            <h5>Public following: {userData.followers}</h5>
            <h5>Public followers: {userData.following}</h5>
        </div>
    );
    
}
export default HomeComponent;