import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id = undefined;

    @Column('varchar')
    username = ''

    @Column('varchar')
    password = ''
}