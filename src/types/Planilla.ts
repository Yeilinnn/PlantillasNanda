// src/types/PlanillaData.ts
export interface PlanillaData {
    nombre: string;
    cedula: string;
    puesto: string;
    codPresu: string;
    horas: number;
    pHext: number;
    total: number;
    seg10: number;
    tributacion: number;
    coopeservidores: number;
    asemuna: number;
    asemuna3: number;
    asemuna5: number;
    coopealianza: number;
    coopeAnde: number;
    servicoop: number;
    funeralesVida: number;
    ins: number;
    pension:number;
    embargos: number;
    sitramuna: number;
    polizaAnep: number;
    anep125: number;
    totalDeducciones: number;
    oficio:string;
        nombramientoInterino?: boolean; 
        leyUsura?: boolean; 
        incapacidad?: boolean; 
        permisoSinGoce?: boolean; 
        accionPersonal?: string;
}
      
  
  