import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link} from 'react-router-dom';

function ClientList() {
    const [, setError] = useState(null);
    const [, setIsLoaded] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    const removeTeamMember = (id) => {
        fetch(apiUrl + '/api/clients/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
           setTeamMembers(oldTeamMembers => {
                return oldTeamMembers.filter(item => item.id !== id);
            });
        });
    }

    useEffect( ()=> {
        fetch(apiUrl + '/api/clients')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                    return response.json();
                })
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTeamMembers(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }, [apiUrl]);


    const teamMemberList = teamMembers.map(teamMember => {
        return (
            <tr key={teamMember.id}>
                <td style={{whiteSpace: 'nowrap'}}>{teamMember.name}</td>
                <td>{teamMember.email}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/team/" + teamMember.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => removeTeamMember(teamMember.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    });

    return (
        <div>

            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/team/new">Add Team Member</Button>
                </div>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="30%">Name</th>
                        <th width="30%">Email</th>
                        <th width="40%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {teamMemberList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default ClientList;