var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";
let Job = class Job {
    id;
    title;
    description;
    company_name;
    location;
    salary_range;
    job_type;
    employment_status;
    skills_required;
    application_deadline;
    user;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Job.prototype, "company_name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Job.prototype, "salary_range", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Job.prototype, "job_type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Job.prototype, "employment_status", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], Job.prototype, "skills_required", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Job.prototype, "application_deadline", void 0);
__decorate([
    ManyToOne("User", "job", { nullable: false }),
    JoinColumn(),
    __metadata("design:type", User)
], Job.prototype, "user", void 0);
Job = __decorate([
    Entity("jobs")
], Job);
export { Job };
