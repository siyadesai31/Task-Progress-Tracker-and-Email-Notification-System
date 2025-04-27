package com.siya.taskmanager.controller;

import com.siya.taskmanager.email.EmailService;
import com.siya.taskmanager.email.EmailTemplateType;
import com.siya.taskmanager.model.Task;
import com.siya.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*") // Needed for React
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Task> getAll() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getById(@PathVariable int id) {
        return taskService.getTaskById(id);
    }

    // @GetMapping("/{id}/email")
    // public String generateEmail(@PathVariable int id, @RequestParam(defaultValue = "TASK_COMPLETION") EmailTemplateType type) {
    //     Task task = taskService.getTaskById(id);
    //     return emailService.generateEmail(task, type);
    // }

    @PostMapping("/{id}/send-email")
    public Task sendEmail(@PathVariable int id, @RequestParam EmailTemplateType type) {
        Task task = taskService.getTaskById(id);
        String emailContent = emailService.generateEmail(task, type);
        return taskService.sendEmailToEmployee(id, emailContent);  // Store email content
    }
    
    @PostMapping
    public Task add(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable int id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @PutMapping("/{id}/progress")
    public Task updateProgress(@PathVariable int id, @RequestParam int progress) {
        return taskService.updateProgress(id, progress);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        taskService.deleteTask(id);
    }
}
