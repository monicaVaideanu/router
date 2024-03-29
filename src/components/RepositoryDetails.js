import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RepositoryDetails = () => {
    const [repoData, setRepoData] = useState(null);
    const [allRepos, setAllRepos] = useState([]);
    const { repoId } = useParams();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRepositoryDetails() {
            try {
                const response = await fetch(`https://api.github.com/repositories/${repoId}`);
                if (!response.ok) throw new Error('Repository not found');
                const data = await response.json();
                setRepoData(data);
            } catch (error) {
                setError(error.message);
            }
        }

        async function fetchAllRepositories() {
            try {
                const response = await fetch("https://api.github.com/users/monicaVaideanu/repos");
                const data = await response.json();
                setAllRepos(data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchRepositoryDetails();
        fetchAllRepositories();
    }, [repoId]);

    const handleChange = (event) => {
        navigate(`/repos/${event.target.value}`);
    };

    if (error) return <div>{error}</div>;
    if (!repoData) return <div>Loading...</div>;

    return (
        <div>
            <FormControl fullWidth margin="normal">
                <InputLabel id="repo-select-label">Select Repository</InputLabel>
                <Select
                    labelId="repo-select-label"
                    id="repo-select"
                    value={repoId}
                    label="Select Repository"
                    onChange={handleChange}
                >
                    {allRepos.map((repo) => (
                        <MenuItem key={repo.id} value={repo.id}>
                            {repo.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <h2>{repoData.name}</h2>
            <p>ID: {repoData.id}</p>
            <p>URL: <a href={repoData.html_url} target="_blank" rel="noopener noreferrer">{repoData.html_url}</a></p>
        </div>
    );
};

export default RepositoryDetails;
