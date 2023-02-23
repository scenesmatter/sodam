import db from "../config/db";

export class DbMainRepository {
    async findAllCourse() {
        const QUERY = `SELECT no, name, code, latitude, longitude, visited FROM course`;
        return db.execute(QUERY).then((result) => result[0]);
    }
    async findOne(code) {
        const QUERY = `SELECT no, name, code, latitude, longitude, visited FROM course WHERE code = ?`;
        return db.execute(QUERY, [code]).then((result) => result[0][0]);
    }
    async updateStatus(code) {
        const QUERY = `UPDATE course SET visited = 'Y' WHERE code = ?`;
        db.execute(QUERY, [code]);
    }
}
