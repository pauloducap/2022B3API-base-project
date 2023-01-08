import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../../users/services/user.service";
import { UserRole } from "../../users/user.entity";
import { CreateProjectDto } from "../dto/projects.dto";
import { Project } from "../project.entity";

@Injectable()
export class ProjectsServices {
  constructor(
    private readonly usersServices: UserService,
		@InjectRepository(Project)
		private readonly projectsRepository: Repository<Project>
	) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const user = await this.usersServices.findOneUser(createProjectDto.referringEmployeeId);

    if (user.role === UserRole.ADMIN || user.role === UserRole.PROJECTMANAGER) {
      const project = new Project();
      project.name = createProjectDto.name;
      project.referringEmployeeId = createProjectDto.referringEmployeeId;
      return this.projectsRepository.save(project);
    } else {
      throw new UnauthorizedException();
    }
  }

  async findById(id: string): Promise<Project | null> {
    return this.projectsRepository.findOneBy({id:id});
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }
}
