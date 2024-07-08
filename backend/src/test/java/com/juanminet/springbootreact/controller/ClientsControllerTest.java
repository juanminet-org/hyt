package com.juanminet.springbootreact.controller;

import com.juanminet.springbootreact.controller.ClientsController;
import com.juanminet.springbootreact.domain.Client;
import com.juanminet.springbootreact.repository.ClientRepository;
import org.assertj.core.util.Lists;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(MockitoExtension.class)
public class ClientsControllerTest {

    @Mock
    private ClientRepository clientRepository;

    private ClientsController clientsController;

    @BeforeEach
    void init() {
        clientsController = new ClientsController(clientRepository);
    }
    @Test
    public void should_retrieveAllClients() {
        // Given
        Client client1 = new Client(1L,"John", "john@gmail.com");
        Client client2 = new Client(2L,"Sarah", "sarah.connor@yahoo.com");

        when(clientRepository.findAll()).thenReturn(Lists.list(client1,client2));

        // When
        List<Client> result = clientsController.getClients();

        // Then
        List<Client> expected = List.of(client1, client2);
        assertThat(result).isEqualTo(expected);

    }

}
