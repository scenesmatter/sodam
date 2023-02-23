import { DbMainRepository } from "../models/DbMainRepository";

export class MainService {
    static repository = new DbMainRepository();

    static async getAllCourse() {
        return await this.repository.findAllCourse();
    }

    static async updateVisitedStatus(code) {
        const course = await this.repository.findOne(code);
        if (!course) throw Error.NOT_FOUND;
        if (course.visited === "Y") throw Error.CONFLICT;

        await this.repository.updateStatus(code);
    }
}
