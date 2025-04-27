package com.siya.taskmanager.exception;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(int id) {
        super("Task with ID " + id + " not found.");
    }
}
