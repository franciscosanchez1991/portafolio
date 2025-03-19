package com.proyecto.portafolio.models;

public class Resource {
    private String imagePath;
    private boolean isLoaded;
    private byte[] imageData;

    public Resource(String imagePath) {
        this.imagePath = imagePath;
        this.isLoaded = false;
    }

    public String getImagePath() { return imagePath; }
    public boolean isLoaded() { return isLoaded; }
    public void setLoaded(boolean loaded) { isLoaded = loaded; }
    public byte[] getImageData() { return imageData; }
    public void setImageData(byte[] imageData) { 
        this.imageData = imageData;
        this.isLoaded = true;
    }
}