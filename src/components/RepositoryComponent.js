import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { useParams } from 'react-router-dom';

const Repo = (props) => {
    const [repoData, setRepoData] = useState([]);
    const {repoId} = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRepositoryDetails() {
            try {
                const response = await fetch(`https://api.github.com/repositories/${repoId}`);
                if (!response.ok) { 
                    throw new Error('Repository not found');
                }
                const data = await response.json();
                setRepoData(data);
                setError(null); 
            } catch (error) {
                setError(error.message);
                setRepoData(null);
            }
        }

        fetchRepositoryDetails();
    }, [repoId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>{repoData.name}</h2>
            <p>{repoData.id}</p>
            <p>{repoData.html_url}</p>
        </div>
    );
}

export default Repo;