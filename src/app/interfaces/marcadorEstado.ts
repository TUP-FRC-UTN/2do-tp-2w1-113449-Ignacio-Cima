import { Marcador } from "./marcador";

export interface marcadorEstado{
    ok: boolean,
    error: string,
    statusCode: string,
    listaMarcadores: Marcador[]
}