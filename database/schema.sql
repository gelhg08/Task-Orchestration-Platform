CREATE TABLE workflows (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT, 
    status ENUM('active', 'inactive') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE worflow_steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    workflow_id BIGINT NOT NULL, 
    name VARCHAR(100),
    step_order INT NOT NULL,
    type ENUM('email', 'payment') NOT NULL,   
    CONSTRAINT fk_workflowsStep_workflows 
       FOREIGN KEY (workflow_id) references workflows(id)
    INDEX idx_workflow_steps_workflow_id (workflow_id)
);

CREATE TABLE executions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    workflow_id BIGINT NOT NULL, 
    status ENUM('running', 'success', 'failed'), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL, 
    CONSTRAINT fk_execution_workflows 
    FOREIGN KEY (workflow_id) references workflows(id)
    INDEX idx_executions_workflow_id (workflow_id)
);

CREATE TABLE execution_steps( 
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    execution_id BIGINT NOT NULL, 
    step_name VARCHAR(100) NOT NULL,
    step_order INT NOT NULL,
    status ENUM('pending', 'running', 'success', 'failed') NOT NULL DEFAULT 'pending',
    error_message TEXT NULL, 
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    CONSTRAINT fk_execution_steps_execution 
    FOREIGN KEY (execution_id) references executions(id),
    INDEX idx_execution_steps_execution_id (execution_id)
);


CREATE TABLE logs( 
    id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    execution_id BIGINT NOT NULL, 
    message TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_execution 
    FOREIGN KEY (execution_id) references executions(id),
    INDEX idx_logs_execution_id(execution_id)
);