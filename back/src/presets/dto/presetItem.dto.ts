
export interface PresetItem {
  parameterName : string;
  communication: string,
  isConcat: boolean,
  telemetryItems : GridsterItems[];
  cols: number,
  rows: number,
  x: number,
  y: number
}

export interface GridsterItems{
  parameter: IcdParameter;
  chartType: SingleChart;
}

export class IcdParameter {
  parameterName: string;
  communication: string;
  uavNumber: number;
  units :string
  InterfaceLimitMin: number;
  InterfaceLimitMax: number;

  constructor(parameterName: string, communication: string, uavNumber: number , units :string, InterfaceLimitMin: number, InterfaceLimitMax: number) {
    this.parameterName = parameterName;
    this.communication = communication;
    this.uavNumber = uavNumber; 
    this.units = units;
    this.InterfaceLimitMin = InterfaceLimitMin;
    this.InterfaceLimitMax = InterfaceLimitMax;
  }
}
export enum SingleChart {
  GAUGE = 0,
  GRAPH = 1,
  PIE = 2,
  LABEL = 3,
}