import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Avatar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {getAllData, getAvatar} from '../apis/GetData';

const HomeComponent = () => {
    const [userData, setUserData] = useState(null);
    const [avatar, setUserAvatar] = useState(null);
    const [avatarUrl, setUserAvatarUrl] = useState(null);
    const navigate = useNavigate(); 

    // useEffect(() => {
    //     async function fetchUserData() {
    //         const fetchResponse = await fetch("https://api.github.com/users/monicaVaideanu");
    //         const jsonResponse = await fetchResponse.json();
    //         setUserData(jsonResponse);
    //     }
    //     fetchUserData();
    // }, []);

    useEffect(() => {
        getAllData().then((response) => {
            setUserData(response.data);
            setUserAvatarUrl(response.data.avatar_url)
        });
    }, []);
    
    useEffect(() => {
        getAvatar(avatarUrl).then((response) => {
            setUserAvatar(URL.createObjectURL(response.data))
        });
    }, [avatarUrl]);

    // useEffect(() => {
    //     if (userData) {
    //         async function fetchUserAvatar() {
    //             const fetchResponse = await fetch(userData.avatar_url);
    //             const img = await fetchResponse.blob();
    //             setUserAvatar(URL.createObjectURL(img));
    //         }
    //         fetchUserAvatar();
    //     }
    // }, [userData]);

    const goToRepos = () => {
        navigate('/repos');
    };

    if (!userData) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Typography variant="h4">Loading...</Typography>
        </Box>;
    }

    return (
        <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar src={avatar} alt="User Avatar" sx={{ width: 120, height: 120, marginBottom: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom>Hello {userData.login}</Typography>
                <Typography variant="subtitle1">Public Repositories: {userData.public_repos}</Typography>
                <Typography variant="subtitle1">Followers: {userData.followers}</Typography>
                <Typography variant="subtitle1">Following: {userData.following}</Typography>
                <Box m={2}>
                    <Button variant="contained" onClick={goToRepos}>View Repos</Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default HomeComponent;
