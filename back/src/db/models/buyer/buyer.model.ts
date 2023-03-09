import { Field, ObjectType, InputType } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


@ObjectType()
@Entity()
export class BuyerModel {

    @Field()
    @PrimaryGeneratedColumn('increment')
    id?: number

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Field()
    @Column({default: 'France'})
    country?: string

    @Field()
    @Column({nullable: false, default: new Date()})
    @CreateDateColumn()
    createdAt?: Date

    @Field()
    @Column()
    @UpdateDateColumn()
    updatedAt?: Date
}
