import { DataSource, In } from "typeorm";
import dotenv from "dotenv";
import { Product } from "../modules/products/entity/product.entity";
import { Category } from "../modules/category/entity/category.entity";
import { Brand } from "../modules/brand/entity/brand.entity";



dotenv.config({ debug: false });
export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: [Brand, Category, Product],
  extra: {
    connectionLimit: Number(process.env.DB_POOL_LIMIT),
    connectTimeout: Number(process.env.DB_TIMEOUT),
    waitForConnections: true,
    queueLimit: 0,
  },
});
