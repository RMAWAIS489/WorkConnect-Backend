var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, } from "typeorm";
import { User } from "./User.js";
let Candidate = class Candidate {
    id;
    user;
    fullname;
    contact_number;
    email;
    address;
    skill;
    education;
    work_experience;
    resume_link;
    portfolio_link;
    linkedin_url;
    github_url;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Candidate.prototype, "id", void 0);
__decorate([
    OneToOne(() => User, (user) => user.id, { eager: true, nullable: false }),
    JoinColumn({ name: "userId" }),
    __metadata("design:type", User)
], Candidate.prototype, "user", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Candidate.prototype, "fullname", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Candidate.prototype, "contact_number", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Candidate.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Candidate.prototype, "address", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Candidate.prototype, "skill", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Candidate.prototype, "education", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Candidate.prototype, "work_experience", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Candidate.prototype, "resume_link", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Candidate.prototype, "portfolio_link", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Candidate.prototype, "linkedin_url", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Candidate.prototype, "github_url", void 0);
Candidate = __decorate([
    Entity("candidates")
], Candidate);
export { Candidate };
