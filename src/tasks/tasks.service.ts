import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

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

  deleteTaskbyId(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
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
