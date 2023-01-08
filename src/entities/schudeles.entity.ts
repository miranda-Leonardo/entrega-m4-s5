import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from 'typeorm';
import { Property } from './properties.entity';
import { User } from './users.entity';

@Entity('schudeles')
class Schudele {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'time' })
    hour: string

    @ManyToOne( () => Property, property => property.id )
    property: Property;

    @ManyToOne( () => User, user => user.id )
    user: User;
};

export { Schudele };