import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique} from "typeorm";
import {NewsSite} from "./NewsSite";

export interface ITweet {
    title: string;
    newsSite: NewsSite;
    url: string;
}

@Entity()
@Unique(["title", "url"])
export class Tweet implements ITweet{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title: string

    @ManyToOne(() => NewsSite, newsSite => newsSite.tweets, {eager: true})
    newsSite: NewsSite;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt!: Date; // Using the postfix (!) since the decorator will set it

    @UpdateDateColumn()
    updatedAt!: Date; // Using the postfix (!) since the decorator will set it

    constructor(title: string, newsSite: NewsSite, url: string) {
        this.title = title;
        this.newsSite = newsSite;
        this.url = url
    }
}