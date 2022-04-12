export interface OutputStructField {
  type: string;
  name: string;
}

export interface OutputStruct {
  exported: boolean;
  inherit?: string;
  name: string;
  fields: Array<OutputStructField>;
}
