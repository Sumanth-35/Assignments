package com.eurekaclient.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/greet")
public class Greetingsctrl {

    static Map<String, String> greetings;

    static {
        greetings = new HashMap<>();
        greetings.put("fr", "BONJOUR");
        greetings.put("es", "HOLA");
        greetings.put("de", "GUTENTAG");
        greetings.put("it", "CIAO");
        greetings.put("hi", "नमस्ते");
        greetings.put("en", "GOOD MORNING");
        greetings.put("jp", "ohayo gozaimasu");
    }

    @GetMapping("/welcome/{localeId}")
    public String getGreetings(@PathVariable String localeId) {
        return greetings.entrySet()
                .stream()
                .filter(e -> localeId.equalsIgnoreCase(e.getKey()))
                .map(Map.Entry::getValue)
                .collect(Collectors.joining());
    }
}
