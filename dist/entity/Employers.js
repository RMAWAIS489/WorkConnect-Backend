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
let Employer = class Employer {
    id;
    user;
    company_name;
    contact_number;
    email;
    address;
    website;
    industry_type;
    company_description;
    linkedin_url;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Employer.prototype, "id", void 0);
__decorate([
    OneToOne("User", "employer", { nullable: false }),
    JoinColumn(),
    __metadata("design:type", User)
], Employer.prototype, "user", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Employer.prototype, "company_name", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Employer.prototype, "contact_number", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Employer.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Employer.prototype, "address", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Employer.prototype, "website", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Employer.prototype, "industry_type", void 0);
__decorate([
    Column({ type: "text" }),
    __metadata("design:type", String)
], Employer.prototype, "company_description", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Employer.prototype, "linkedin_url", void 0);
Employer = __decorate([
    Entity("employers")
], Employer);
export { Employer };
