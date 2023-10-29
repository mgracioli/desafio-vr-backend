import { MigrationInterface, QueryRunner } from "typeorm"

export class PopulaTabelaLoja1698605304328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "loja" (descricao) VALUES ('Matriz'), ('Filial 1'), ('Filial 2'), ('Filial 3'), ('Filial 4'), ('Filial 5')`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "loja" WHERE id between 1 and 6`,
        );
    }

}
