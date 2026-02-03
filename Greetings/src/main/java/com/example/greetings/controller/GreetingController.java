package com.example.greetings.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private static final Map<String, String> greetings = new HashMap<>();

    static {
        greetings.put("es", "HOLA");
        greetings.put("de", "GUTENTAG");
        greetings.put("it", "CIAO");
        greetings.put("hi", "नमस्ते");
        greetings.put("en", "GOOD MORNING");
        greetings.put("jp", "ohayo gozaimasu");
        greetings.put("fr", "BONJOUR");
    }

    @GetMapping("/welcome/{localeId}")
    public String getGreetings(@PathVariable("localeId") String langCode) {

        System.out.println("Fetching greetings type for locale id = " + langCode);

        String msg = greetings.entrySet()
                .stream()
                .filter(code -> langCode.equalsIgnoreCase(code.getKey()))
                .map(lang -> lang.getValue())
                .collect(Collectors.joining());

        return msg.isEmpty() ? "Language not supported" : msg;
    }
}
