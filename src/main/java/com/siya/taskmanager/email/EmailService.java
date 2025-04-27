package com.siya.taskmanager.email;

import com.siya.taskmanager.model.Task;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public String generateEmail(Task task, EmailTemplateType type) {
        return switch (type) {
            case TASK_COMPLETION -> generateCompletionEmail(task);
            case TASK_ASSIGNMENT -> generateAssignmentEmail(task);
            case TASK_REMINDER -> generateReminderEmail(task);
        };
    }

    private String generateCompletionEmail(Task task) {
        return """
                Subject: Task Completed - %s

                Hello,

                The task titled '%s' has been marked as completed.

                Description:
                %s

                Regards,
                Task Manager System
                """.formatted(task.getTitle(), task.getTitle(), task.getDescription());
    }

    private String generateAssignmentEmail(Task task) {
        return """
                Subject: New Task Assigned - %s

                Hello,

                You have been assigned a new task: '%s'.

                Description:
                %s

                Please begin as soon as possible.

                Regards,
                Task Manager System
                """.formatted(task.getTitle(), task.getTitle(), task.getDescription());
    }

    private String generateReminderEmail(Task task) {
        return """
                Subject: Reminder - Task Pending - %s

                Hello,

                This is a reminder that the following task is pending:

                Task: %s
                Description: %s

                Please complete it at your earliest convenience.

                Regards,
                Task Manager System
                """.formatted(task.getTitle(), task.getTitle(), task.getDescription());
    }
}
