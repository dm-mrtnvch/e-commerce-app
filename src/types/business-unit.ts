export interface BusinessUnitKeyReference {
  key: string;
  typeId: string;
}

export interface BusinessUnitReference {
  id: string;
  typeId: string;
}

export interface BusinessUnitResourceIdentifier {
  id?: string;
  key?: string;
  typeId: string;
}
