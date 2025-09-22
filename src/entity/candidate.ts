import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.js";
@Entity("candidates")
export class Candidate {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.id, { eager: true, nullable: false })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ type: "varchar", length: 255 })
  fullname!: string;

  @Column({ type: "varchar", length: 50 })
  contact_number!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  address!: string;

  @Column({ type: "varchar", length: 100 })
  skill!: string;

  @Column({ type: "varchar", length: 100 })
  education!: string;

  @Column({ type: "varchar", length: 100 })
  work_experience!: string;

  @Column({ type: "varchar", length: 100 })
  resume_link!: string;

  @Column({ type: "varchar", length: 100 })
  portfolio_link!: string;

  @Column({ type: "varchar", length: 255 })
  linkedin_url!: string;

  @Column({ type: "varchar", length: 255 })
  github_url!: string;
}
