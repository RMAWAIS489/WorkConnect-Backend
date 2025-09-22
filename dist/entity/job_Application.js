var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from "typeorm";
import { Job } from "./jobs.js";
import { Candidate } from "./candidate.js";
let JobApplication = class JobApplication {
    id;
    job;
    candidate;
    status;
    resume;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], JobApplication.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Job, (job) => job.id, { nullable: false, onDelete: "CASCADE" }),
    JoinColumn({ name: "job_id" }),
    __metadata("design:type", Job)
], JobApplication.prototype, "job", void 0);
__decorate([
    ManyToOne(() => Candidate, (candidate) => candidate.id, { nullable: false, onDelete: "CASCADE" }),
    JoinColumn({ name: "candidate_id" }),
    __metadata("design:type", Candidate)
], JobApplication.prototype, "candidate", void 0);
__decorate([
    Column({ type: "enum", enum: ["Pending", "Shortlisted", "Rejected", "Accepted"], default: "Pending" }),
    __metadata("design:type", String)
], JobApplication.prototype, "status", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], JobApplication.prototype, "resume", void 0);
JobApplication = __decorate([
    Entity("job_applications")
], JobApplication);
export { JobApplication };
