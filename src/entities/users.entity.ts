import { getRounds, hashSync } from 'bcryptjs';
import { 
    BeforeInsert, 
    BeforeUpdate, 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from 'typeorm';
import { Schudele } from './schudeles.entity';

@Entity('users') 
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    isAdm: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany( () => Schudele, schudele => schudele.user )
    schudeles: Schudele[];

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword() {
        const isEncrypted = getRounds(this.password);
        if( !isEncrypted ) {
            this.password = hashSync( this.password, 10 );
        };
    };
};

export { User };