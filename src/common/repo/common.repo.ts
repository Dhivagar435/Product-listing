import { injectable } from "tsyringe";
import { AppDataSource } from "../../config/data-source";
import { QueryRunner } from "typeorm";


@injectable()
export class CommonRepository {
  async findActiveRecord(
    tableName: string,
    columns: string | string[] = "*",
    conditions: Record<string, any>,
    queryRunner?: QueryRunner,
  ): Promise<any | null> {
    const cols = Array.isArray(columns) ? columns.join(", ") : columns;
    const allConditions = { ...conditions, isDeleted: 0 };
    const whereClauses = Object.keys(allConditions)
      .map((key) => `${key} = ?`)
      .join(" AND ");
    const values = Object.values(allConditions);

    const query = `
      SELECT ${cols}, id
      FROM ${tableName}
      WHERE ${whereClauses}
      LIMIT 1
    `;

    const manager = queryRunner ? queryRunner.manager : AppDataSource.manager;
    const rows = await manager.query(query, values);
    return rows[0] || null;
  }
}
