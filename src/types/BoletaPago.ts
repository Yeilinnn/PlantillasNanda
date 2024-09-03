
export interface BoletaPagoData {
    semanaPago: string;
    funcionario: string;
    puesto: string;
    categoriaPuesto: string;
    salarioBase: number;
    anualidades: number;
    horasExtras: number;
    dedicacion: number;
    prohibicion: number;
    totalDevengado: number;
    deducciones: {
      seguro: number;
      tributacion: number;
      coopeservidores: number;
      coopealianza: number;
      servicoop: number;
      coopeAnde: number;
      asemuna: number;
      embargos: number;
      pension: number;
      funeralesVida: number;
      sitramuna: number;
      anep: number;
      ins: number;
    };
    totalDeducciones: number;
    netoAPagar: number;
    observaciones: string;
  }
  