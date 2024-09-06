// tipos.ts
export interface ConstanciaSalarioProps {
    nombre: string;
    cedula: string;
    puesto: string;
    fechaInicio: string;
    salarioBruto: number;
    salarioNeto: number;
    deducciones: {
      ccss: number;
      bancoPopular: number;
      tributacion: number;
      coopeAnde: number;
      asemuna: number;
      funeralesVida: number;
      servicoop: number;
    };
    fechaEmision: string;
  }
  