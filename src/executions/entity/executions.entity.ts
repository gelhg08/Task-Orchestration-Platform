import { Workflow } from "src/workflows/entities/workflow.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum ExecutionsStatus {
    RUNNING = 'running',
    SUCCESS = 'success',
    FAILED = 'failed'
}

@Entity('executions')
export class Execution {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'workflow_id' })
    workflowId: number;

    @ManyToOne(() => Workflow, { eager: true })
    @JoinColumn({ name: 'workflow_id' })
    workflow: Workflow;

    @Column({ type: 'enum', enum: ExecutionsStatus, default: ExecutionsStatus.RUNNING })
    status: ExecutionsStatus

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt?: Date;

}