import dbClient from "../config/dbClient.js";

class UsersModel {
    async create(UserDataNotification) {
        try {
            if (!dbClient.db) {
                throw new Error("Base de datos no conectada.");
            }

            const colYTNotification = dbClient.db.collection("UserDataNotification");
            await colYTNotification.insertOne(UserDataNotification);
            console.log("✅ Documento insertado correctamente.");
        } catch (error) {
            console.error("❌ Error al insertar el documento en MongoDB:", error.message);
            throw error;
        }
    }
}

export default new UsersModel();
