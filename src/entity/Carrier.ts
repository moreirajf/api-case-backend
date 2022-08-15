import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("carrier")
export class Carrier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    carrier_name: string;

    @Column("double precision")
    carrier_constant: number;

    @Column("double precision")
    max_height: number;

    @Column("double precision")
    min_height: number;

    @Column("double precision")
    max_width: number;

    @Column("double precision")
    min_width: number;

    @Column("integer")
    delivery_time: number;

    @CreateDateColumn()
    created_at: Date;

}