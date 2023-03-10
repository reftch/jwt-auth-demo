package dev.reftch.api.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static dev.reftch.api.config.SecurityConfig.USERNAME;
import static dev.reftch.api.config.SecurityConfig.PASSWORD;

@SpringBootTest
@AutoConfigureMockMvc
public class HomeControllerTests {

    @Autowired
    MockMvc mvc;

    @Test
    void tokenWhenAnonymousThenStatusIsUnauthorized() throws Exception {
        this.mvc.perform(post("/api/v1/token")).andExpect(status().isUnauthorized());
    }

    @Test
    void tokenWithBasicThenGetToken() throws Exception {
        MvcResult result = this.mvc.perform(post("/api/v1/token").with(httpBasic(USERNAME, PASSWORD)))
                .andExpect(status().isOk()).andReturn();

        assertThat(result.getResponse().getContentAsString()).isNotEmpty();
    }

    @Test
    void rootWhenUnauthenticatedThen401() throws Exception {
        this.mvc.perform(get("/api/v1")).andExpect(status().isUnauthorized());
    }

    @Test
    public void rootWithBasicStatusIsUnauthorized() throws Exception {
        this.mvc.perform(get("/api/v1").with(httpBasic(USERNAME, PASSWORD))).andExpect(status().isUnauthorized());
    }

    @Test
    void indexWhenUnauthenticatedThen200() throws Exception {
        this.mvc.perform(get("/index.html")).andExpect(status().isOk());
    }

    @Test
    void assetsWhenUnauthenticatedThen200() throws Exception {
        this.mvc.perform(get("/assets")).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    public void rootWithMockUserStatusIsOK() throws Exception {
        this.mvc.perform(get("/api/v1")).andExpect(status().isOk());
    }

}
