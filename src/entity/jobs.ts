import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  company_name!: string;

  @Column()
  location!: string;

  @Column()
  salary_range!: string;

  @Column()
  job_type!: string;

  @Column()
  employment_status!: string;

  @Column("text")
  skills_required!: string;

  @Column()
  application_deadline!: Date;

  @ManyToOne("User", "job", { nullable: false })
   @JoinColumn()
   user!: User; 

}