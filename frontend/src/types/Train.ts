export interface TrainDto {
    trainNumber: string;
    direction: string;
    departureStation: string;
    arrivalStation: string;
    departureTime: string;
    arrivalTime: string;
  }
  
  export interface Train {
    id: number;
    trainNumber: string;
    direction: string;
    departureStation: { id: number; name: string };
    arrivalStation: { id: number; name: string };
    departureTime: string;
    arrivalTime: string;
  }
  
  export const toTrainDto = (t: Train): TrainDto => ({
    trainNumber: t.trainNumber,
    direction: t.direction,
    departureStation: t.departureStation.name,
    arrivalStation: t.arrivalStation.name,
    departureTime: t.departureTime,
    arrivalTime: t.arrivalTime,
  });

  export interface Station {
    id: number;
    name: string;
  }