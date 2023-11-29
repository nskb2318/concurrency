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
          {
            name: 'team_id',
            type: 'uuid',
            comment: '팀 ID',
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
    const result = await queryRunner.query(`
    insert into team
    (name)
    values
    ('A'),('B'),('C')
    returning team_id
    `);
    console.log(result);
    await queryRunner.query(`
    insert into member
    (name, team_id)
    values
    ('김','${result[0].team_id}'),
    ('이','${result[0].team_id}'),
    ('박','${result[0].team_id}'),
    ('정','${result[0].team_id}'),
    ('강','${result[0].team_id}'),
    ('조','${result[0].team_id}'),
    ('윤','${result[0].team_id}'),
    ('장','${result[0].team_id}'),
    ('임','${result[0].team_id}'),
    ('한','${result[1].team_id}'),
    ('오','${result[1].team_id}'),
    ('서','${result[1].team_id}'),
    ('신','${result[2].team_id}')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // queryRunner
  }
}
