import { AppDataSource } from "../data-source";
import { Train } from "../entity/Train";
import { Station } from "../entity/Station";

const stationRepository = AppDataSource.getRepository(Station);

export class StationService{

    static async getAllStations(): Promise<Station[]> {

        return await stationRepository.find();
    }

    

}