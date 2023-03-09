import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuyerModel } from "../buyer/buyer.model";




@ObjectType()
@Entity()
export class ProductModel {

    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Field()
    @Column({ length: 500, nullable: false })
    name: string

    @Field()
    @Column({ length: 500, nullable: false })
    qrCode: string

    @Field()
    @Column()
    @CreateDateColumn()
    createdAt?: Date

    @Field()
    @Column()
    @UpdateDateColumn()
    updatedAt?: Date

    @Field(() => BuyerModel)
    @ManyToOne(type => BuyerModel, buyer => buyer.id)
    @JoinColumn()
    buyer: BuyerModel;


}


