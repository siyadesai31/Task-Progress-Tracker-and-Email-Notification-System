package com.siya.taskmanager.model;

public class Task {
    private int id;
    private String title;
    private String description;
    private boolean completed;
    private int progress;
    private String emailContent;


    // Constructors
    public Task() {}

    public Task(int id, String title, String description, boolean completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public int getProgress() { return progress; }
    public void setProgress(int progress) { this.progress = progress;}

    public String getEmailContent() { return emailContent; }
    public void setEmailContent(String emailContent) { this.emailContent = emailContent; }

}
