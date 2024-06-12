export interface StoreReference {
  id: string;
  typeId: string;
}

export interface StoreKeyReference {
  key: string;
  typeId: string;
}

export interface StoreResourceIdentifier {
  id?: string;
  key?: string;
  typeId: string;
}
