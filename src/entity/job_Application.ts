import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToOne,
  } from "typeorm";
import { Job } from "./jobs.js";
import { Candidate } from "./candidate.js";
import { User } from "./User.js";

  @Entity("job_applications")
  export class JobApplication {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => Job, (job) => job.id, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "job_id" })
    job!: Job;
    
    @ManyToOne(() => Candidate, (candidate) => candidate.id, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "candidate_id" })
    candidate!: Candidate;
  
    @Column({ type: "enum", enum: ["Pending", "Shortlisted", "Rejected", "Accepted"], default: "Pending" })
    status!: string;
  
    @Column({ type: "varchar", length: 255 })
    resume!: string;
  
   
  }
  