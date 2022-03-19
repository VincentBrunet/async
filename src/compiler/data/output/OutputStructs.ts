export interface OutputStructField {
  type: string;
  name: string;
}

export interface OutputStruct {
  name: string;
  fields: Array<OutputStructField>;
}
