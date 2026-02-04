import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString, MaxLength } from "class-validator"

export class CreateWorkflowDto {

    @IsString()
    @MaxLength(100)
    @ApiProperty({ example: 'Onboarding' })
    name: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'Flow to onboarding users' })
    description?: string
}
