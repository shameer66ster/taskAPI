import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    if (status || search) {
      // Call the correct method name with the exact casing
      return this.taskService.GetTaskWithFilters(filterDto); // Corrected casing
    } else {
      return this.taskService.getAllTasks(); // Return all tasks if no filters are provided
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | null {
    return this.taskService.getAllTaskbyId(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.taskService.deleteTaskbyId(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.taskService.CreateTask(CreateTaskDto);
  }
}
