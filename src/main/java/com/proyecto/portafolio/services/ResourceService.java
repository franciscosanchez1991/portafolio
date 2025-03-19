package com.proyecto.portafolio.services;

import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
// import commons codec

@Service
public class ResourceService {
    @Autowired
    private ResourceLoader resourceLoader;
    
    private final Map<String, GameResource> resources = new ConcurrentHashMap<>();
    private int loadedResources = 0;
    
    private final Map<String, String> base64Resources = new HashMap<>();

    public void loadResource(String key, String path) throws IOException {
        ClassPathResource resource = new ClassPathResource(path);
        try (InputStream inputStream = resource.getInputStream()) {
            byte[] bytes = inputStream.readAllBytes();
            String base64 = Base64.getEncoder().encodeToString(bytes);
            String mimeType = determineMimeType(path);
            base64Resources.put(key, "data:" + mimeType + ";base64," + base64);
        }
    }

    public String getEncodedResource(String key) {
        return base64Resources.get(key);
    }
    private String determineMimeType(String path) {
        if (path.endsWith(".png")) {
            return "image/png";
        } else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (path.endsWith(".gif")) {
            return "image/gif";
        }
        return "image/png"; // default
    }    
    public boolean areAllResourcesLoaded() {
        return resources.values().stream()
                .allMatch(GameResource::isLoaded);
    }
    
    public GameResource getResource(String key) {
        return resources.get(key);
    }
    
    public static class GameResource {
        private final Resource resource;
        private boolean isLoaded;
        private byte[] data;
        
        public GameResource(Resource resource) {
            this.resource = resource;
            this.isLoaded = false;
        }
        
        public boolean isLoaded() { return isLoaded; }
        public Resource getResource() { return resource; }
        public byte[] getData() { return data; }
        
        public void setData(byte[] data) {
            this.data = data;
            this.isLoaded = true;
        }
    }
}