import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Station } from "./Station";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Train {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    trainNumber!: string;

    @Column()
    @IsNotEmpty()
    direction!: string;

    @Column()
    departureStationId!: number;

    @Column()
    arrivalStationId!: number;


    @Column({ type: 'timestamp' })
    departureTime!: Date;

    @Column({ type: 'timestamp' })
    arrivalTime!: Date;

    

    @ManyToOne(() => Station, { eager: true })
    @JoinColumn({ name: 'departureStationId' })
    departureStation!: Station;

    @ManyToOne(() => Station, { eager: true })
    @JoinColumn({ name: 'arrivalStationId' })
    arrivalStation!: Station;
}
