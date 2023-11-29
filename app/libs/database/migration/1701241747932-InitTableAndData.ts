import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitTableAndData1701241747932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'member',
        columns: [
          {
            name: 'member_id',
            type: 'uuid',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'uuid',
            comment: '멤버 ID',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            comment: '멤버 이름',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'team',
        columns: [
          {
            name: 'team_id',
            type: 'uuid',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'uuid',
            comment: '팀 ID',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            comment: '팀 이름',
          },
        ],
      }),
    );
    await queryRunner.query(`
    insert into member
    (name, team_id)
    values
    ('김','A'),('이','A'),('박','A'),('정','A'),('강','A'),('조','A'),('윤','A'),('장','A'),('임','A'),('한','B'),('오','B'),('서','B'),('신','C')`);
    await queryRunner.query(`
    insert into team
    (name)
    values
    ('A'),('B'),('C')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // queryRunner
  }
}
