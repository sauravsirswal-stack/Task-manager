const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const result = await this.model.create(data)
        return result
    }

    async delete(modelId) {
        const response = await this.model.findByIdAndDelete(modelId)
        if (!response) {
            throw new AppError("Not able to delete the data", StatusCodes.NOT_FOUND);
        }
        return response
    }

    async findById(Id) {
        const response = await this.model.findById(Id)
        if (!response) {
            throw new AppError("Data not found", StatusCodes.NOT_FOUND);
        }
        return response
    }

    async update(Id, data) {
        const response = await this.model.findByIdAndUpdate(Id, data, { new: true })
        if (!response) {
            throw new AppError("Not able to update the data", StatusCodes.NOT_FOUND);
        }
        return response
    }
}

module.exports = CrudRepository;