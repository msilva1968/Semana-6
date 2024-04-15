import { MigrationInterface, QueryRunner } from 'typeorm';

export class criaTabelas1684864570168 implements MigrationInterface {
  name = 'criaTabelas1684864570168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categoria" ("idcategoria" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("idcategoria"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "autor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "biografia" character varying(500) NOT NULL, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "livros" ("isbn" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying(100) NOT NULL, "sinopse" character varying(500) NOT NULL, "sumario" character varying(500) NOT NULL, "preco" integer NOT NULL, "publicacao" date NOT NULL, "idcategoria" character varying(100) NOT NULL, "idautor" character varying(100) NOT NULL, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("isbn"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "livros" ADD CONSTRAINT "FK_eb1531605709dd94ec67b2141d0" FOREIGN KEY ("id") REFERENCES "autor"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "livros" ADD CONSTRAINT "FK_67339e59ab4b3ed091cf318f426" FOREIGN KEY ("idcategoria") REFERENCES "catregoria"("idcategoria") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "livros" DROP CONSTRAINT "FK_67339e59ab4b3ed091cf318f426"`,
    );
    await queryRunner.query(
      `ALTER TABLE "livros" DROP CONSTRAINT "FK_eb1531605709dd94ec67b2141d0"`,
    );
    await queryRunner.query(`DROP TABLE "livro"`);
    await queryRunner.query(`DROP TABLE "autor"`);
    await queryRunner.query(`DROP TABLE "categoria"`);
  }
}
