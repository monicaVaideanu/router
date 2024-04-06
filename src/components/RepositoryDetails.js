import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box, Paper, Link } from '@mui/material';
import { getRepos, getRepoIndividual } from '../apis/GetData';

const RepositoryDetails = () => {
    const [repoData, setRepoData] = useState(null);
    const [allRepos, setAllRepos] = useState([]);
    const { repoId } = useParams();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
/*todo refactor */
    useEffect(() => {
        const fetchRepositoryDetails = async () => {
            try {
                const response = await getRepoIndividual(repoId);
                setRepoData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        const fetchAllRepositories = async () => {
            try {
                const response = await getRepos();
                setAllRepos(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        if (repoId) {
            fetchRepositoryDetails();
        }
        fetchAllRepositories();
    }, [repoId]);


    const handleChange = (event) => {
        navigate(`/repos/${event.target.value}`);
    };

    if (error) return <Typography color="error">{error}</Typography>;
    if (!repoData) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="repo-select-label">Select Repository</InputLabel>
                <Select
                    labelId="repo-select-label"
                    id="repo-select"
                    value={repoId}
                    label="Select Repository"
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                >
                    {allRepos.map((repo) => (
                        <MenuItem key={repo.id} value={repo.id}>
                            {repo.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h5" gutterBottom>{repoData.name}</Typography>
                <Typography variant="body1">ID: {repoData.id}</Typography>
                <Typography variant="body1">
                    URL: <Link href={repoData.html_url} target="_blank" rel="noopener noreferrer">{repoData.html_url}</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default RepositoryDetails;
