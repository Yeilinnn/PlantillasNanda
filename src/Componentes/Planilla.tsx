import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { PlanillaData } from '../types/Planilla';

const Planilla: React.FC = () => {
  const [data, setData] = useState<PlanillaData[]>([]);

  useEffect(() => {
    // Obtener los datos de la API
    axios
      .get('https://66d90c3e4ad2f6b8ed5352b1.mockapi.io/api/constancia/ConstanciaSalarial')
      .then((response) => {
        console.log(response.data);
        const fetchedData = response.data.map((row: PlanillaData) => ({
          ...row,
          totalDeducciones: calcularTotalDeducciones(row), 
        }));
        setData(fetchedData);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        
      });
  }, []);
  

  // Función para calcular el total de deducciones
  const calcularTotalDeducciones = (row: PlanillaData): number => {
    return (
      row.seg10 +
      row.tributacion +
      row.coopeservidores +
      row.asemuna +
      row.asemuna3 +
      row.asemuna5 +
      row.coopealianza +
      row.coopeAnde +
      row.servicoop +
      row.funeralesVida +
      row.ins + 
      row.pension + 
      row.embargos +
      row.sitramuna +
      row.polizaAnep +
      row.anep125
    );
  };
  const downloadExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Planilla');

   
    const titles = [
        'MUNICIPALIDAD DE NANDAYURE',
        'PERIODO DEL 01 AL 15 DE MARZO DE 2024',
        'SUELDOS FIJOS FUNCIONARIOS MUNICIPALES',
        'PLANILLA N°026-2024',
    ];

    titles.forEach((title, index) => {
        const rowNumber = index + 1;
        worksheet.mergeCells(`A${rowNumber}:X${rowNumber}`);
        const cell = worksheet.getCell(`A${rowNumber}`);
        cell.value = title;
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.font = { bold: true, size: 14 };
    });

    worksheet.mergeCells('A5:G5');
    worksheet.getCell('A5').value = 'Detalle';
    worksheet.getCell('A5').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('A5').font = { bold: true };

    worksheet.mergeCells('H5:X5');
    worksheet.getCell('H5').value = 'Deducciones';
    worksheet.getCell('H5').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('H5').font = { bold: true };

    const headerRow = [
        'Nombre', 'Cédula', 'Oficio', 'Cod. Presu', 'Horas', 'P/H Ext.', 'Total',
        'SEG. 10.67%', 'Tributación', 'Coopeservidores', 'Asemuna', 'Asemuna 3%', 'Asemuna 5%',
        'Coopealianza', 'Coope-Ande', 'Servicoop', 'Funerales Vida', 'INS', 'Pensión',
        'Embargos', 'Sitramuna', 'Póliza ANEP', 'ANEP 1.25%', 'Total Deducciones',
    ];

    worksheet.addRow(headerRow).eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.font = { bold: true };
    });

    worksheet.columns = [
        { key: 'nombre', width: 20 }, { key: 'cedula', width: 15 }, { key: 'oficio', width: 25 },
        { key: 'codPresu', width: 15 }, { key: 'horas', width: 10 }, { key: 'pHext', width: 10 },
        { key: 'total', width: 15 }, { key: 'seg10', width: 15 }, { key: 'tributacion', width: 15 },
        { key: 'coopeservidores', width: 15 }, { key: 'asemuna', width: 15 }, { key: 'asemuna3', width: 15 },
        { key: 'asemuna5', width: 15 }, { key: 'coopealianza', width: 15 }, { key: 'coopeAnde', width: 15 },
        { key: 'servicoop', width: 15 }, { key: 'funeralesVida', width: 15 }, { key: 'ins', width: 15 },
        { key: 'pension', width: 15 }, { key: 'embargos', width: 15 }, { key: 'sitramuna', width: 15 },
        { key: 'polizaAnep', width: 15 }, { key: 'anep125', width: 15 }, { key: 'totalDeducciones', width: 20 },
    ];

    type ConditionKeys = 'Nombramiento Interino' | 'Ley 9859 Ley de Usura' | 'Incapacidad' | 'Permiso sin Goce';

    const conditionsMap: Record<ConditionKeys, string[]> = {
        'Nombramiento Interino': [],
        'Ley 9859 Ley de Usura': [],
        'Incapacidad': [],
        'Permiso sin Goce': [],
    };

    data.forEach((row) => {
        const excelRow = worksheet.addRow([
            row.nombre, row.cedula, row.oficio, row.codPresu, row.horas, row.pHext, row.total,
            row.seg10, row.tributacion, row.coopeservidores, row.asemuna, row.asemuna3, row.asemuna5,
            row.coopealianza, row.coopeAnde, row.servicoop, row.funeralesVida, row.ins, row.pension,
            row.embargos, row.sitramuna, row.polizaAnep, row.anep125, row.totalDeducciones
        ]);

        // Aplicar color de fondo según condiciones
        if (row.nombramientoInterino) { 
            excelRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'F8CBAD' }, 
                };
            });
            const message = `A la señorita ${row.nombre} se le cancelan 15 días como ${row.oficio}, correspondiente a la acción de personal.`;
            conditionsMap['Nombramiento Interino'].push(message);
        }
        
        if (row.leyUsura) {
            excelRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'C6E0B4' }, 
                };
            });
            const message = `A partir del 01 de agosto de 2022 se inicia aplicar la Ley de Usura (¢246.640,40/2: ¢123.320,20), siempre y cuando exista solicitud de los funcionarios municipales. Se procede a aplicar dicha ley a los funcionarios: ${row.nombre}.`;
            conditionsMap['Ley 9859 Ley de Usura'].push(message);
        }
        
        if (row.incapacidad) {
            excelRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'B4C6E7' }, 
                };
            });
            const message = `A la señora ${row.nombre} se le cancelan días por incapacidad.`;
            conditionsMap['Incapacidad'].push(message);
        }
        
        if (row.permisoSinGoce) {
            excelRow.eachCell({ includeEmpty: true }, (cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFD966' }, 
                };
            });
            const message = `A la señora ${row.nombre} se le otorgan días de permiso sin goce de salario.`;
            conditionsMap['Permiso sin Goce'].push(message);
        }
        
    });

  
    worksheet.addRow([]); 
    
    (Object.keys(conditionsMap) as ConditionKeys[]).forEach(condition => {
        if (conditionsMap[condition].length > 0) {
            const titleRow = worksheet.addRow([condition]);
            titleRow.font = { bold: true };
    
            let fillColor;
            switch (condition) {
                case 'Nombramiento Interino':
                    fillColor = 'F8CBAD'; // Naranja
                    break;
                case 'Ley 9859 Ley de Usura':
                    fillColor = 'C6E0B4'; // Verde claro
                    break;
                case 'Incapacidad':
                    fillColor = 'B4C6E7'; // Azul
                    break;
                case 'Permiso sin Goce':
                    fillColor = 'FFD966'; // Amarillo
                    break;
                default:
                    fillColor = 'FFFFFF'; // Blanco por defecto
            }
    
            titleRow.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: fillColor },
                };
            });
    
            worksheet.addRow([conditionsMap[condition].join(', ')]); 
        }
    });

    // Exportar el archivo Excel
    workbook.xlsx.writeBuffer()
        .then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'planilla.xlsx');
        })
        .catch((error) => {
            console.error('Error al escribir el buffer:', error);
        });
};


    
const renderConditions = () => {
    return (
      <div className="mt-6 p-4 border border-gray-300 rounded">

        
        {/* NOMBRAMIENTO INTERINO */}
        <h2 className="text-xl font-bold text-black bg-[#F8CBAD] p-2 rounded mt-4">NOMBRAMIENTO INTERINO</h2>
        {data.map((row) => {
          if (row.nombramientoInterino) {
            return (
              <div key={`${row.cedula}-nombramiento`} className="p-2 mb-2">
                A la señorita {row.nombre} se le cancelan 15 días como {row.oficio}, correspondiente a la acción de personal {row.accionPersonal}.
              </div>
            );
          }
          return null;
        })}
  
        {/* LEY 9859 LEY DE USURA */}
        <h2 className="text-xl font-bold text-black bg-[#C6E0B4] p-2 rounded mt-4">LEY 9859 LEY DE USURA</h2>
        <p>
          A partir del 01 de agosto de 2022 se inicia aplicar la Ley de Usura (¢246.640,40/2: ¢123.320,20), siempre y cuando exista solicitud de los funcionarios municipales. Se procede a aplicar dicha ley a los funcionarios:
        </p>
        <ul>
          {data.filter(row => row.leyUsura).map((row) => (
            <li key={row.cedula} className="p-2 mb-1">{row.nombre}</li>
          ))}
        </ul>
  
        {/* INCAPACIDAD */}
        <h2 className="text-xl font-bold text-black bg-[#B4C6E7] p-2 rounded mt-4">INCAPACIDAD</h2>
        {data.map((row) => {
          if (row.incapacidad) {
            return (
              <div key={`${row.cedula}-incapacidad`} className="p-2 mb-2">
                A la señora {row.nombre} se le cancelan días por incapacidad.
              </div>
            );
          }
          return null;
        })}
  
        {/* PERMISO SIN GOCE */}
        <h2 className="text-xl font-bold text-black bg-[#FFD966] p-2 rounded mt-4">PERMISO SIN GOCE</h2>
        {data.map((row) => {
          if (row.permisoSinGoce) {
            return (
              <div key={`${row.cedula}-permisoSinGoce`} className="p-2 mb-2">
                A la señora {row.nombre} se le otorgan días de permiso sin goce de salario.
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };
  
  
  return (
    <div className="p-6 bg-white min-h-screen">
      <table className="w-full border border-gray-300 border-collapse">
      <thead>
  <tr>
    <th colSpan={17} className="text-black py-2 px-4 text-center text-xl font-bold">MUNICIPALIDAD DE NANDAYURE</th>
  </tr>
  <tr>
    <th colSpan={17} className="text-black py-2 px-4 text-center text-lg">PERIODO DEL 01 AL 15 DE MARZO DE 2024</th>
  </tr>
  <tr>
    <th colSpan={17} className="text-black py-2 px-4 text-center text-lg">SUELDOS FIJOS FUNCIONARIOS MUNICIPALES</th>
  </tr>
  <tr>
    <th colSpan={17} className="text-black py-2 px-4 text-center text-lg">PLANILLA N°026-2024</th>
  </tr>
  <tr>
    <td colSpan={17} className="border-t border-gray-300 py-1"></td>
  </tr>
  <tr>
    <th colSpan={7} className="text-black py-2 px-4 text-lg font-semibold">Detalle</th> 
    <th colSpan={10} className="text-black py-2 px-4 text-lg font-semibold">Deducciones</th> 
  </tr>
          <tr className="">
            <th className="border border-gray-300 py-2 px-4">Nombre</th>
            <th className="border border-gray-300 py-2 px-4">Cédula</th>
            <th className="border border-gray-300 py-2 px-4">Oficio</th>
            <th className="border border-gray-300 py-2 px-4">Cod. Presu</th>
            <th className="border border-gray-300 py-2 px-4">Horas</th>
            <th className="border border-gray-300 py-2 px-4">P/H Ext.</th>
            <th className="border border-gray-300 py-2 px-4">Total</th>
            <th className="border border-gray-300 py-2 px-4">SEG. 10.67%</th>
            <th className="border border-gray-300 py-2 px-4">Tributación</th>
            <th className="border border-gray-300 py-2 px-4">Coopeservidores</th>
            <th className="border border-gray-300 py-2 px-4">Asemuna</th>
            <th className="border border-gray-300 py-2 px-4">Asemuna 3%</th>
            <th className="border border-gray-300 py-2 px-4">Asemuna 5%</th>
            <th className="border border-gray-300 py-2 px-4">Coopealianza</th>
            <th className="border border-gray-300 py-2 px-4">Coope-Ande</th>
            <th className="border border-gray-300 py-2 px-4">Servicoop</th>
            <th className="border border-gray-300 py-2 px-4">Funerales Vida</th>
            <th className="border border-gray-300 py-2 px-4">INS</th>
            <th className="border border-gray-300 py-2 px-4">Pensión</th>
            <th className="border border-gray-300 py-2 px-4">Embargos</th>
            <th className="border border-gray-300 py-2 px-4">Sitramuna</th>
            <th className="border border-gray-300 py-2 px-4">Póliza ANEP</th>
            <th className="border border-gray-300 py-2 px-4">ANEP 1.25%</th>
            <th className="border border-gray-300 py-2 px-4">Total Deducciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            // Definir el estilo de la fila según las condiciones
            let rowStyle = '';

            if (row.nombramientoInterino) {
              rowStyle = 'bg-[#F8CBAD]'; // naranja para Nombramiento Interino
            } else if (row.leyUsura) {
              rowStyle = 'bg-[#C6E0B4]'; // Verde para Ley de Usura
            } else if (row.incapacidad) {
              rowStyle = 'bg-[#B4C6E7]'; // azul para Incapacidad
            } else if (row.permisoSinGoce) {
              rowStyle = 'bg-[#FFD966]'; // amarillo para Permiso sin Goce
            }

            return (
              <tr key={row.cedula} className={rowStyle}>
                <td className="border border-gray-300 py-2 px-4">{row.nombre}</td>
                <td className="border border-gray-300 py-2 px-4">{row.cedula}</td>
                <td className="border border-gray-300 py-2 px-4">{row.puesto}</td>
                <td className="border border-gray-300 py-2 px-4">{row.codPresu}</td>
                <td className="border border-gray-300 py-2 px-4">{row.horas}</td>
                <td className="border border-gray-300 py-2 px-4">{row.pHext}</td>
                <td className="border border-gray-300 py-2 px-4">{row.total}</td>
                <td className="border border-gray-300 py-2 px-4">{row.seg10}</td>
                <td className="border border-gray-300 py-2 px-4">{row.tributacion}</td>
                <td className="border border-gray-300 py-2 px-4">{row.coopeservidores}</td>
                <td className="border border-gray-300 py-2 px-4">{row.asemuna}</td>
                <td className="border border-gray-300 py-2 px-4">{row.asemuna3}</td>
                <td className="border border-gray-300 py-2 px-4">{row.asemuna5}</td>
                <td className="border border-gray-300 py-2 px-4">{row.coopealianza}</td>
                <td className="border border-gray-300 py-2 px-4">{row.coopeAnde}</td>
                <td className="border border-gray-300 py-2 px-4">{row.servicoop}</td>
                <td className="border border-gray-300 py-2 px-4">{row.funeralesVida}</td>
                <td className="border border-gray-300 py-2 px-4">{row.ins}</td>
                <td className="border border-gray-300 py-2 px-4">{row.pension}</td>
                <td className="border border-gray-300 py-2 px-4">{row.embargos}</td>
                <td className="border border-gray-300 py-2 px-4">{row.sitramuna}</td>
                <td className="border border-gray-300 py-2 px-4">{row.polizaAnep}</td>
                <td className="border border-gray-300 py-2 px-4">{row.anep125}</td>
                <td className="border border-gray-300 py-2 px-4">{row.totalDeducciones}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {renderConditions()}

      <button
        onClick={downloadExcel}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Descargar Excel
      </button>

    </div>
  );
};

export default Planilla;