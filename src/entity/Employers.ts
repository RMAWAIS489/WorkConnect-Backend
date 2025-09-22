import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.js";
@Entity("employers")
export class Employer {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne("User", "employer", { nullable: false })
  @JoinColumn()
  user!: User;

  @Column({ type: "varchar", length: 255 })
  company_name!: string;

  @Column({ type: "varchar", length: 50 })
  contact_number!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  address!: string;

  @Column({ type: "varchar", length: 255 })
  website!: string;

  @Column({ type: "varchar", length: 100 })
  industry_type!: string;

  @Column({ type: "text" })
  company_description!: string;

  @Column({ type: "varchar", length: 255 })
  linkedin_url!: string;
}
