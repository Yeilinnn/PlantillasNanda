import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PaySlip from './Componentes/BoletaPago'; // Asegúrate de usar la ruta correcta al archivo del componente
import { BoletaPagoData } from './types/BoletaPago'; // Asegúrate de usar la ruta correcta al archivo de la interfaz

const App: React.FC = () => {
  const [data, setData] = useState<BoletaPagoData | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      const simulatedData: BoletaPagoData = {
        semanaPago: "Semana 34",
        funcionario: "Juan Pérez ",
        puesto: "Administrador",
        categoriaPuesto: "A1",
        salarioBase: 500000,
        anualidades: 50000,
        horasExtras: 10000,
        dedicacion: 20000,
        prohibicion: 30000,
        totalDevengado: 600000,
        deducciones: {
          seguro: 64000,
          tributacion: 50000,
          coopeservidores: 30000,
          coopealianza: 40000,
          servicoop: 20000,
          coopeAnde: 15000,
          asemuna: 25000,
          embargos: 30000,
          pension: 50000,
          funeralesVida: 10000,
          sitramuna: 12000,
          anep: 15000,
          ins: 16000,
        },
        totalDeducciones: 400000,
        netoAPagar: 200000,
        observaciones: "",
      };

      setTimeout(() => setData(simulatedData), 1000);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <PDFViewer width="100%" height="600">
      <PaySlip data={data} />
    </PDFViewer>
  );
};

export default App;


