import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;
    @Column()
    created_at: Date;
    @Column({ nullable: true })
    @UpdateDateColumn()
    updated_at: Date;
}