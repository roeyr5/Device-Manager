
export class SimulatorDto {
  uavnumber:number;
  address:string;
  port:number;
  channel?: string;
  type?: string;
  status?:string;
  pcap?:boolean;
}