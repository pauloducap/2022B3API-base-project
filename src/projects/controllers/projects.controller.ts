import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorators';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { CreateProjectDto } from '../dto/projects.dto';
import { Project } from '../project.entity';
import { ProjectsServices } from '../services/projects.service';
import { UserRole } from '../../users/user.entity';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsServices: ProjectsServices,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PROJECTMANAGER)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsServices.create(createProjectDto);
  }
  
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Project | null> {
    return this.projectsServices.findById(id);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsServices.findAll();
  }
}

