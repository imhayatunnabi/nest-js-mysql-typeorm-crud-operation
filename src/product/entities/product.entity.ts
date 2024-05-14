import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;
    @Column({unique: true})
    name: string;
    @Column()
    description: string;
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @Column({ nullable: true })
    @UpdateDateColumn()
    updated_at: Date;
}
