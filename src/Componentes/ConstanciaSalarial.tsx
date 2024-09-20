import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import logo from '../assets/logoNanda.jpg'; 
import { ConstanciaSalarioProps } from '../types/ConstanciaSalarial';
import '../fonts'; 

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times-Roman',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  tituloContainer: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'justify',
    color: '#333333',
  },
   boldText: {
    fontWeight: 'bold',
    marginVertical: 5, 
    position: 'relative',
    top: -5, 
     color: '#00000',
  },
  containerCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  breakdownContainer: {
    width: '60%',
    fontSize: 12,
    border: '1pt solid black',
    padding: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottom: '1pt solid black',
  },
  lastRow: {
    borderBottom: 'none',
  },
  emptySpace: {
    height: 6,
    borderBottom: 'none',
  },
  signature: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
  },
  atentamente: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
  },
  signatureName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  personalID: {
    fontSize: 12,
    color: '#333333',
  },

  horizontalLine: {
    borderBottomWidth: 2,
    marginVertical: 0,
  

  },
  horizontalLine2: {
    borderBottomWidth: 10,
    marginVertical: 1,

  },
  space: {
    width: '1%',
  },
 footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 10,
    borderTop: '0.5pt solid',
    height: 80,
    flexDirection: 'column', 
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingTop: 10, 
    justifyContent: 'space-between', 
  },
  footerLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  footerRightContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end', 
    marginTop: -50, 
  },
  footerRight: {
    textAlign: 'right',
    marginTop: 5,
  },
  
  
  horizontalLineFooter: {
    width: '100%', 
    borderBottomWidth: 5,
    borderBottomColor: '#000', 
    marginVertical: 5,
  },

  redBackground: {
    backgroundColor: '#f28b82', // Rojo suave
  },
  yellowBackground: {
    backgroundColor: '#fff475', // Amarillo suave
  },
  
});

interface HorizontalLineProps {
  width: string;
  spaceWidth: string;
}


const HorizontalLine: React.FC<HorizontalLineProps> = ({ width, spaceWidth }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ ...styles.horizontalLine, width: width, borderBottomColor: '#4caf50' }} />
    <View style={{ width: spaceWidth }} />
    <View style={{ ...styles.horizontalLine, width: width, borderBottomColor: '#e4df5e' }} />
    <View style={{ width: spaceWidth }} />
    <View style={{ ...styles.horizontalLine, width: width, borderBottomColor: '#2196f3' }} />
  </View>
);
const HorizontalLine2: React.FC<HorizontalLineProps> = ({ width, spaceWidth }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 190 }}>
      <View style={{ ...styles.horizontalLine2, width: width, borderBottomColor: '#4caf50' }} />
      <View style={{ width: spaceWidth }} />
      <View style={{ ...styles.horizontalLine2, width: width, borderBottomColor: '#e4df5e' }} />
      <View style={{ width: spaceWidth }} />
      <View style={{ ...styles.horizontalLine2, width: width, borderBottomColor: '#2196f3' }} />
    </View>
  );
  const HorizontalLineFooter: React.FC<HorizontalLineProps> = ({ width, spaceWidth }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
      <View style={{ ...styles.horizontalLineFooter, width: width, borderBottomColor: '#4caf50' }} />
      <View style={{ width: spaceWidth }} />
      <View style={{ ...styles.horizontalLineFooter, width: width, borderBottomColor: '#e4df5e' }} />
      <View style={{ width: spaceWidth }} />
      <View style={{ ...styles.horizontalLineFooter, width: width, borderBottomColor: '#2196f3' }} />
    </View>
  );
  
const ConstanciaSalario: React.FC = () => {
  const [data, setData] = useState<ConstanciaSalarioProps | null>(null);

  useEffect(() => {
    axios.get('https://66d90c3e4ad2f6b8ed5352b1.mockapi.io/api/constancia/ConstanciaSalarial')
      .then(response => {
        if (response.data && response.data.length > 0) {
          const registro = response.data[0];
          setData({
            nombre: registro.nombre,
            cedula: registro.cedula,
            puesto: registro.puesto,
            fechaInicio: registro.fechaInicio,
            salarioBruto: registro.salarioBruto,
            salarioNeto: registro.salarioNeto,
            deducciones: {
              ccss: registro.ccss,
              bancoPopular: registro.bancoPopular,
              tributacion: registro.tributacion,
              coopeAnde: registro.coopeAnde,
              asemuna: registro.asemuna,
              funeralesVida: registro.funeralesVida,
              servicoop: registro.servicoop,
            },
            fechaEmision: registro.fechaEmision,
          });
        }
      })
      .catch(error => {
        console.error('Error al obtener la constancia salarial:', error);
      });
  }, []);

  return (
    <div>
      {data ? (
        <PDFViewer width="100%" height="600">
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.header}>
                <Image style={styles.logo} src={logo} />
                <View style={styles.tituloContainer}>
                  <Text style={[styles.titulo, styles.boldText]}>Municipalidad de Nandayure</Text>
                  <Text style={[styles.subtitulo, styles.boldText]}>VICEALCALDÍA MUNICIPAL</Text>
                </View>
              </View>

              <HorizontalLine width="100%" spaceWidth="0%" />

              <View style={styles.section}>
                <Text style={[styles.subtitulo, styles.boldText]}>CONSTANCIA DE SALARIO</Text>
                <Text style={styles.body}>
                  La suscrita Cinthya Vanessa Núñez Abarca, Vice Alcaldesa de la Municipalidad de Nandayure,
                  hace constar que el señor(a): <Text style={styles.boldText}>{data.nombre}</Text>, Cédula de identidad número <Text style={styles.boldText}>{data.cedula}</Text>, labora
                  en la <Text style={styles.boldText}>MUNICIPALIDAD DE NANDAYURE</Text>, ocupando el puesto de <Text style={styles.boldText}>{data.puesto}</Text>, la cual se encuentra
                  nombrada en propiedad a partir del {data.fechaInicio}, por lo que ahora obtiene un salario mensual bruto
                  desglosado de la siguiente manera:
                </Text>

                <View style={styles.containerCenter}>
  <View style={styles.breakdownContainer}>
    {/* Sección con fondo amarillo */}
    <View style={[styles.breakdownRow, styles.yellowBackground]}>
      <Text>SALARIO BRUTO fijo:</Text>
      <Text>¢{data.salarioBruto.toLocaleString('es-CR')}</Text>
    </View>
    <View style={[styles.breakdownRow, styles.yellowBackground]}>
      <Text>CCSS 9,67%:</Text>
      <Text>¢{data.deducciones.ccss.toLocaleString('es-CR')}</Text>
    </View>
    <View style={[styles.breakdownRow, styles.yellowBackground]}>
      <Text>BANCO POPULAR 1%:</Text>
      <Text>¢{data.deducciones.bancoPopular.toLocaleString('es-CR')}</Text>
    </View>
    <View style={styles.breakdownRow}>
                      <Text>TRIBUTACIÓN Código Trabajo:</Text>
                      <Text>¢{data.deducciones.tributacion.toLocaleString('es-CR')}</Text>
                    </View>
    {/* Sección con fondo rojo */}
    <View style={[styles.breakdownRow, styles.redBackground]}>
      <Text>COOPEANDE Opcional:</Text>
      <Text>¢{data.deducciones.coopeAnde.toLocaleString('es-CR')}</Text>
    </View>
    <View style={[styles.breakdownRow, styles.redBackground]}>
      <Text>ASEMUNA 3%:</Text>
      <Text>¢{data.deducciones.asemuna.toLocaleString('es-CR')}</Text>
    </View>
    <View style={[styles.breakdownRow, styles.redBackground]}>
      <Text>FUNERALES:</Text>
      <Text>¢{data.deducciones.funeralesVida.toLocaleString('es-CR')}</Text>
    </View>
    <View style={[styles.breakdownRow, styles.redBackground]}>
      <Text>SERVICOOP:</Text>
      <Text>¢{data.deducciones.servicoop.toLocaleString('es-CR')}</Text>
    </View>

    {/* Espacio y salario neto */}
    <View style={styles.emptySpace} />
    <View style={[styles.breakdownRow, styles.lastRow]}>
      <Text>SALARIO NETO:</Text>
      <Text>¢{data.salarioNeto.toLocaleString('es-CR')}</Text>
    </View>
  </View>
</View>
                

                <Text style={styles.body}>
                  Quedándole un salario mensual neto de ¢{data.salarioNeto.toLocaleString('es-CR')} 
                  (Novecientos cuarenta mil seiscientos cincuenta y seis colones 92/100), el que se encuentra libre de embargos.
                </Text>

                <Text style={styles.body}>
                  <Text style={styles.boldText}>ES CONFORME:</Text> Se extiende el presente, a solicitud del interesado, en la Ciudad de Carmona, el día {data.fechaEmision}.
                </Text>

                <View style={styles.atentamente}>
                  <Text>Atentamente</Text>
                </View>

                <View style={styles.signature}>
                < HorizontalLine2 width="12%" spaceWidth="0%"  />
                  <Text><Text style={styles.boldText}>Vicealcaldesa Municipal</Text></Text>
                  <Text style={styles.signatureName}>Cinthya Núñez Abarca</Text>
                  <Text style={styles.personalID}>Cédula: 5-0322-0218</Text>
                </View>

                <Text style={styles.body}>📂CC:</Text>
              </View>

              <View style={styles.footer}>
  <View style={styles.footerLeft}>
    <Text>Telefax: 2657-7500 | Ext: 2013</Text>
    <Text>Correo: yarias@nandayure.go.cr</Text>
    <Text>Sitio web: www.nandayure.go.cr</Text>
  </View>

  <View style={styles.footerRightContainer}> {/* Nuevo contenedor */}
    <Text style={styles.footerRight}>
      “Por un Nandayure de oportunidades para todos”
    </Text>
  </View>

  <HorizontalLineFooter width="50%" spaceWidth="0%" />
</View>

          
            </Page>
          </Document>
        </PDFViewer>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default ConstanciaSalario;
