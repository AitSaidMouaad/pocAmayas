import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "data/dev.db",
})

export default AppDataSource;