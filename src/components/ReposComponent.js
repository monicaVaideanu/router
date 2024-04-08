import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {getRepos} from '../apis/GetData';

const ReposComponent = () => {
    const [userRepo, setUserRepo] = useState([]);
    const navigate = useNavigate();

    const handleRowClick = (repoId) => {
        navigate(`/repos/${repoId}`);
    };

    useEffect(() => {
        getRepos().then((response) => {
            setUserRepo(response.data);
        });
    }, []);
    
    return (
        <TableContainer component={Paper} elevation={3} sx={{ margin: '20px', overflow: 'hidden' }}>
            <Typography variant="h4" component="div" sx={{ padding: '20px' }}>Repositories</Typography>
            <Table aria-label="repository table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>URL</TableCell> 
                        <TableCell>Owner</TableCell>
                        <TableCell>Default Branch</TableCell>
                        <TableCell>Language</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userRepo.map((r) => (
                        <TableRow
                            key={r.id} hover
                            onClick={() => handleRowClick(r.id)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell>{r.name}</TableCell>
                            <TableCell>{r.id}</TableCell>
                            <TableCell>
                                <Link href={r.html_url} target="_blank" rel="noopener noreferrer">
                                    GitHub URL
                                </Link>
                            </TableCell>
                            <TableCell>{r.owner.login}</TableCell> 
                            <TableCell>{r.default_branch}</TableCell>
                            <TableCell>{r.language}</TableCell>
                            <TableCell>{r.description}</TableCell>
                            <TableCell>{r.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReposComponent;
