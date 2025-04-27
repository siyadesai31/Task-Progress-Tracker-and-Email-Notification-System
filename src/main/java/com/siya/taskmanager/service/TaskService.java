// service/TaskService.java
package com.siya.taskmanager.service;

import com.siya.taskmanager.model.Task;
import com.siya.taskmanager.exception.TaskNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {
    private final List<Task> tasks = new ArrayList<>();
    private int currentId = 1;

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task addTask(Task task) {
        task.setId(currentId++);
        tasks.add(task);
        return task;
    }

    public Task getTaskById(int id) {
        return tasks.stream()
                .filter(task -> task.getId() == id)
                .findFirst()
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task updateTask(int id, Task updatedTask) {
        Task task = getTaskById(id);
        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setCompleted(updatedTask.isCompleted());
        return task;
    }

    public Task updateProgress(int id, int progress) {
        Task task = getTaskById(id);
        task.setProgress(progress);
        return task;
    }
    
    public Task sendEmailToEmployee(int id, String emailContent) {
        Task task = getTaskById(id);
        task.setEmailContent(emailContent);  // Save the email content
        return task;
    }
    
    public void deleteTask(int id) {
        Task task = getTaskById(id);
        tasks.remove(task);
    }
}
