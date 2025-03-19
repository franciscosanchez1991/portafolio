package com.proyecto.portafolio.services;

import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ResourceService {
    @Autowired
    private ResourceLoader resourceLoader;
    
    private final Map<String, GameResource> resources = new ConcurrentHashMap<>();
    private int loadedResources = 0;
    
    public void loadResource(String key, String path) {
        try {
            Resource resource = resourceLoader.getResource("classpath:" + path);
            GameResource gameResource = new GameResource(resource);
            resources.put(key, gameResource);
            loadedResources++;
        } catch (Exception e) {
            System.err.println("Failed to load resource: " + path);
        }
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