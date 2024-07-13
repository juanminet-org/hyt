import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';


function ClientEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({});

    const handleNameInput = e => {
        setClient((previous) => ({...previous, name: e.target.value}));
    };
    const handleEmailInput = e => {
        setClient((previous) => ({...previous, email: e.target.value}));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const requestOptions = {
            method: (id !== 'new' ? 'PUT' : 'POST'),
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(client)
        };
        const path = '/clients' + (id !== 'new' ? '/' + id : '');
        fetch(path, requestOptions)
        .then(item => navigate(-1));
    }

    useEffect(() => {
        if (id !== "new") {
            fetch('/clients/' + id)
                .then(response => response.json())
                .then(data => {
                    setClient(data);
                })
                .catch(error => console.error(error));
        }
    },[id]);

    const title = <h2>{id ? 'Edit Team Member' : 'Add Team Member'}</h2>;

    return <div>
        <Container>
            {title}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={client.name}
                           onChange={handleNameInput} autoComplete="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" id="email" value={client.email}
                           onChange={handleEmailInput} autoComplete="email"/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/team">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
}

export default ClientEdit;