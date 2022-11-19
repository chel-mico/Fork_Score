import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item"
import { Location } from "./Location"

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name: string

    // how tf do i make this an image
    @Column()
    logo: string

    @OneToMany(() => Item, (item) => item.restaurant)
    items: Item[]

    @OneToMany(() => Location, (location) => location.restaurant)
    locations: Location[]
}