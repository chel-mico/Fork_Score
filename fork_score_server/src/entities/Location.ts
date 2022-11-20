import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./Restaurant";

@Entity()
export class Location {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    address: string

    @Column()
    region: string

    @Column({
        array: true,
        type: "int"
    })
    rating: number

    @Column()
    name: string

    @Column({type: "float"})
    distance: number

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.locations)
    restaurant: Restaurant
}