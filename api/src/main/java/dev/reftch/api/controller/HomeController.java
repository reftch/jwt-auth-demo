package dev.reftch.api.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1")
public class HomeController {

    @GetMapping
    public String home(Principal principal) {
        return "Hello, " + principal.getName();
    }

}
