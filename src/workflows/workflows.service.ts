import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectRepository(Workflow)
    private readonly repoWorkflows: Repository<Workflow>
  ) { }

  async create(createWorkflowDto: CreateWorkflowDto) {
    try {
      const workflow = this.repoWorkflows.create(createWorkflowDto)
      return await this.repoWorkflows.save(workflow)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Workflow name already exists')
      } throw error
    }
  }

  async findAll() {
    return this.repoWorkflows.find({
      order: { createdAt: 'DESC' }
    })
  }

  async findOne(id: number) {
    const workflow = await this.repoWorkflows.findOneBy({ id })
    if (!workflow) {
      throw new NotFoundException('WorkFlow not found')
    }
    return workflow
  }

  async update(id: number, updateWorkflowDto: UpdateWorkflowDto) {
    const workflow = await this.findOne(id);

    try {
      Object.assign(workflow, updateWorkflowDto);
      return await this.repoWorkflows.save(workflow);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Workflow name already exists');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id),
      await this.repoWorkflows.delete(id)
    return { deleted: true }
  }
}
