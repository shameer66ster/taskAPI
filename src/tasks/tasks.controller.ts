import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | null {
    return this.taskService.getAllTaskbyId(id);
  }
  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.taskService.CreateTask(CreateTaskDto);
  }
}
