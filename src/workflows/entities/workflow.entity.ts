import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum WorkflowsStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

@Entity('workflows')
export class Workflow {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'enum', enum: WorkflowsStatus, default: WorkflowsStatus.ACTIVE })
    status: WorkflowsStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
