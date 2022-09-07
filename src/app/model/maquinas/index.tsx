import { Setor } from "../empresas";

export interface Maquina {
    
    maqCodigo?: string;
    maqNome?: string;
    maqAndar?: string;
    maqStatus?: boolean;
    setor: Setor
    
    
}