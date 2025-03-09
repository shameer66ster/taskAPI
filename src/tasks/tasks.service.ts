import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getAllTaskbyId(id: string): Task | null {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return null;
    }
    return task;
  }
  GetTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks(); // Assuming this returns an array of tasks

    // Filter by status if provided
    if (status) {
      tasks = tasks.filter((task) => task.status === status); // Corrected to access task's status
    }

    // Filter by search keyword if provided
    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search); // Fixed typo: 'titile' -> 'title'
      });
    }

    return tasks;
  }

  deleteTaskbyId(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getAllTaskbyId(id);
    if (!task) {
      throw new Error('Task not found');
    }
    task.status = status;
    return task;
  }

  CreateTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
