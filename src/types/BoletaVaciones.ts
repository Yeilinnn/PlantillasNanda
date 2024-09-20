export interface BoletaVacacionesProps {
    nombreSolicitante: string;
    cedula: string;
    departamento: string;
    fechaIngreso: string; // Puedes usar Date si prefieres manejarlo con formato de fecha
    diasSolicitados: number;
    saldoVacaciones: number;
    fechaRegreso: string; // Puedes usar Date si prefieres manejarlo con formato de fecha
    control: string;
    observaciones?: string;
    fechaSalida?: string; // Campo opcional de fecha de salida
    fechaHasta?: string; // Campo opcional de fecha hasta
    dias: number;   // Campo individual para los días
    anios: number;   // Campo individual para el año
    total: number;  // Campo individual para el total
}
    
