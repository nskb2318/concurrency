import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamEntity } from './team.entity';

@Entity('member')
export class MemberEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'member_id' })
  memberId: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @ManyToOne(() => TeamEntity, (team) => team.teamId, {
    nullable: false,
  })
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;
}
