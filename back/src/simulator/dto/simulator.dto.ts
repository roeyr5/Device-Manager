
export class SimulatorDto {
  uavNumber:number;
  address?:string;
  port?:number;
  channel?: string;
  type?: string;
  status?:boolean;
  pcap?:boolean;
}

export class CreateUavDto {
  uavNumber: number;
  status: string;
}
