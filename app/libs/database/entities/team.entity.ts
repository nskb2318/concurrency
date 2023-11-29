import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MemberEntity } from './member.entity';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'team_id' })
  teamId: string;

  @Column('varchar', { name: 'name' })
  email: string;

  @OneToMany(() => MemberEntity, (member) => member.team)
  members: MemberEntity[];
}
