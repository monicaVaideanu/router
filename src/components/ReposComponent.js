import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReposComponent = () => {
    const[userRepo, setUserRepo] = useState([]);
    const navigate = useNavigate();

    const handleRowClick = (repoId) => {
        navigate(`/repos/${repoId}`);
    };

    useEffect(() =>{
        async function fetchRepo(){
        const fetchResponse = await fetch("https://api.github.com/users/monicaVaideanu/repos")
        const reponse = await fetchResponse.json();
        setUserRepo(reponse);
    } fetchRepo();
    }, []);
    
    return (
        <TableContainer>
            <Table aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Url</TableCell> 
                        <TableCell>Owner</TableCell>
                        <TableCell>Default Branch</TableCell>
                        <TableCell>Language</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userRepo.map ((r)=>
                    <TableRow
                        key ={r.id} hover onClick={() => handleRowClick(r.id)}
                    >
                            <TableCell>{r.name}</TableCell>
                            <TableCell>{r.id}</TableCell>
                            <TableCell>{r.url}</TableCell>
                            <TableCell>{r.owner.login}</TableCell> 
                            <TableCell>{r.default_branch}</TableCell>
                            <TableCell>{r.language}</TableCell>
                            <TableCell>{r.description}</TableCell>
                            <TableCell>{r.created_at}</TableCell>
                    </TableRow>
                    )}
                </TableBody>

            </Table>
        </TableContainer>
    )
}
export default ReposComponent;