
export class SimulatorDto {
  uavNumber:number;
  address?:string;
  port?:number;
  channel?: string;
  type?: string;
  status?:string;
  pcap?:boolean;
}

export class CreateUavDto {
  uavNumber: number;
  status: string;
}
