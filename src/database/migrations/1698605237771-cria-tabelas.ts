import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelas1698605237771 implements MigrationInterface {
    name = 'CriaTabelas1698605237771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produto" ("id" SERIAL NOT NULL, "descricao" character varying(60) NOT NULL, "custo" numeric(13,3), "imagem" bytea, CONSTRAINT "PK_99c4351f9168c50c0736e6a66be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loja" ("id" SERIAL NOT NULL, "descricao" character varying(100) NOT NULL, CONSTRAINT "PK_81ad5d6a90a7a01aa53b334cea9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtoloja" ("id" SERIAL NOT NULL, "id_produto" integer NOT NULL, "id_loja" integer NOT NULL, "preco_venda" numeric(13,3), CONSTRAINT "PK_66ed310e837b5e92119fd2791dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produtoloja" ADD CONSTRAINT "FK_3d262e636a1406e6001529a8771" FOREIGN KEY ("id_produto") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtoloja" ADD CONSTRAINT "FK_0aba12b3d1042baae40355964d1" FOREIGN KEY ("id_loja") REFERENCES "loja"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtoloja" DROP CONSTRAINT "FK_0aba12b3d1042baae40355964d1"`);
        await queryRunner.query(`ALTER TABLE "produtoloja" DROP CONSTRAINT "FK_3d262e636a1406e6001529a8771"`);
        await queryRunner.query(`DROP TABLE "produtoloja"`);
        await queryRunner.query(`DROP TABLE "loja"`);
        await queryRunner.query(`DROP TABLE "produto"`);
    }

}
