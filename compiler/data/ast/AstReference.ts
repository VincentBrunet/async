
export interface AstReference {
  type: AstType;
  variable?: AstVariable;
  param?: AstParam;
  capture?: AstCapture;
}
