export type UserKey = keyof { nome: string; rg: string; cpf: string; nascimento: string; filiacao: { pai: string; mae: string}}


export type RootStackParamList = {
  Main: undefined;
  Camera: { foto: string, base64: string };
};

export interface iLocate {
  locate: string,
  key: string,
  copyLine?: [number?, number?],
  copyIndex?: [number?, number?]
}


export type LocateArr = iLocate[]

