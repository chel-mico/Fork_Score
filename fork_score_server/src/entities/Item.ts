import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./Restaurant"

@Entity()
export class Item {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name: string

    @Column({type: "float"})
    cost: number

    @Column({type: "int"})
    protein: number

    @Column({type: "int"})
    carbs: number

    @Column({type: "int"})
    fat: number

    @Column({type: "int"})
    calories: number

    // list of regions the item is available in
    @Column({array: true})
    region: string

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.items)
    restaurant: Restaurant

}