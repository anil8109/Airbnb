import { CreationAttributes, Model, ModelStatic, WhereOptions } from "sequelize";
import { NotFoundError } from "../utils/errors/app.error";

// T extends model because our different models will access these methods
// And we will pass model here so Adding generic type as Model only
// Ex. Hotel is a model, Room is a model, RoomCategory is a model etc.

// Making it abstract we only want this to be used or over ridden, extend etc but not creation of object
abstract class BaseRepository<T extends Model> { 

    // We use ModelStatic to define a model class type.
    protected model: ModelStatic<T>;

    // can we do it like this
    // protected model: T;
    // constructor(model: T) {

    // No Because T is model here and we wan to define model type not model object/instance
    // model: T this syntex defines that model is an object of T (Hotel or Rooms or Roomcategory models)

    // Note: We want model to be a class so that from that class we can call standard methods of models like findByPk, findAll etc.. So we can 
    // access static property of the class
    // Ex Hotel.findById here Hotel is class but not object. thats why are able to use Model method like findByPk, findAll.

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async findById(id: number) : Promise<T | null> {
        const record = await this.model.findByPk(id);
        if (!record) {
            return null;
        }
        return record;
    }

    async findAll(): Promise<T[]> {
        const records = await this.model.findAll();
        if (!records) {
            return []
        }
        return records;
    }

    async delete(whereOptions: WhereOptions<T>): Promise<void> {
        const record = await this.model.destroy({
            where: {
                ...whereOptions
            }
        });

        if (!record) {
            throw new NotFoundError(`Record not found for deletion with options:    ${JSON.stringify(whereOptions)}`)
        }
        return;
    }

    // CreationAttributes used for minimum required attribute for any model.
    async create(data: CreationAttributes<T>): Promise<T> {
        const record = await this.model.create(data);
        return record;
    }

    // Partial used because we may update one or all fields so we can use some part of whole object by using partial.
    async update(id: number, data: Partial<T>): Promise<T> {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new NotFoundError(`The given record with id ${id} is not found`);
        }
        Object.assign(record, data);
        await record.save();
        return record;
    }
}

export default BaseRepository;