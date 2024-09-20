import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { BoletaVacacionesProps } from '../types/BoletaVaciones';
import logo from '../assets/logoNanda.jpg'; 
import '../fonts';

const styles = StyleSheet.create({
    page: {
      padding: 25,
      fontFamily: 'Times-Roman',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        width: '90%',
       
      },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
      },
    container: {
      border: '2px solid #000',
      margin: 0, 
      padding: 0, 
      borderRadius: 2,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width:'100%'
    },
    sectionFullWidth: {
      flexDirection: 'row',
      marginBottom: 0,
      padding: 0,
      border: '1pt solid black',
      width: '100%',
      justifyContent: 'center',
    },
    section: {
      flexDirection: 'column',
      margin: 0,
      padding: 5, 
      border: '1pt solid black',
      width: '100%', 
      boxSizing: 'border-box',
      fontSize:10,
    },
    titleContainer: {
        flex: 1,
        textAlign: 'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 0,
      textTransform: 'uppercase',
      color: '#3fa59e', 
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 0,
      textTransform: 'uppercase',
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0,
      },
    label: {
      fontWeight: 'bold',
      marginBottom:10,
      fontSize:11,
      width: ''
    },
    value: {
      fontSize: 11,
    },

    valueRed: {
        fontSize: 11,
        color: 'red',  // Aplicar color rojo
      },
    sectionTitle: {
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
      marginBottom: 10,
      fontSize:11,
    },
    signature: {
      marginTop: 0,
      textAlign: 'center',
      fontSize: 11,
      borderBottom: '1pt solid black',
      width: '60%',
      alignSelf: 'center',
    },
    autorizacionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      flexWrap: 'wrap',
    },
    autorizacion: {
      fontSize: 11,
      fontWeight: 'bold',
      width: '50%',
      boxSizing: 'border-box',
    },
    sectioninfo: {
        flexDirection: 'row',
        marginBottom: 0,
        padding: 0,
        fontSize: 11,
        width: '100%', 
      },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 0,
    },
    infoItem: {
      width: '50%', 
      border: '1pt solid black', 
      margin: 0, 
      padding: 5, 
      boxSizing: 'border-box',
    },
    infoLabel: {
      fontSize: 11,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    infoValue: {
      fontSize: 11,
      textAlign: 'center',
    },
    alignmentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
      padding: 0,
      margin: 0,
      width: '100%',
    },
    alignmentSection: {
      flexDirection: 'column',
      width: '34%', 
      border: '1pt solid black',
      margin: 0, 
      padding: 0,
      boxSizing: 'border-box',
       alignItems: 'center'
      
    },

    derechoSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
      width: '100%',
    },
    derechoItem: {
      flexDirection: 'column',
      width: '34%', 
      border: '1pt solid black',
      margin: 0, 
      padding: 15, 
      boxSizing: 'border-box',
      fontSize:11,

    },
    partirContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
      width: '100%',
    },
    partirItem: {
      flexDirection: 'column',
      width: '34%',
      border: '1pt solid black',
      margin: 0,
      padding: 15, 
      boxSizing: 'border-box',
      
    },
    regresoItem: {
      flexDirection: 'column',
      width: '34%',
      border: '1pt solid black',
      margin: 0,
      padding: 15, 
      boxSizing: 'border-box',
      
    },
    controlItem: {
      flexDirection: 'column',
      width: '34%',
      border: '1pt solid black',
      margin: 0,
      padding: 15, 
      boxSizing: 'border-box',
      alignItems: 'center'
    },
    fieldRowIsolated: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
    },
    labelIsolated: {
      fontSize: 11,
      fontWeight: 'bold',
    },
    valueIsolated: {
      fontSize: 11,
    },
    signatureAuthorizationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 0,
      width: '100%',
    },
    signatureItem: {
      flexDirection: 'column',
      width: '50%',
      margin: 0,
      padding: 5, 
      boxSizing: 'border-box',
    },
    authorizationItem: {
      flexDirection: 'column',
      width: '50%',
      border: '1pt solid black',
      margin: 0,
      padding: 5, 
      boxSizing: 'border-box',
    },
    periodos: {
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 0,
        fontSize: 11,
      },
      fieldRowperiodo: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Cambiado a 'space-between' para alinear los lados
        alignItems: 'center',
        marginBottom: 5,
      },
      labelperiodo: {
        fontWeight: 'bold',
        fontSize: 12,
        width: '50%', 
        textAlign: 'left', // Alineado a la izquierda
        marginRight: -5,
      },
      valueperiodo: {
        fontSize: 12,
        width: '50%',
        textAlign: 'right', // Alineado a la derecha
      },
      divider: {
        borderBottom: '1pt solid black',
        marginVertical: 5,
        width: '100%',
      },
      
  

});

  

const BoletaVacaciones: React.FC = () => {
  const [data, setData] = useState<BoletaVacacionesProps | null>(null);

  useEffect(() => {
    axios.get('https://66d90c3e4ad2f6b8ed5352b1.mockapi.io/api/constancia/ConstanciaSalarial')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        }
      })
      .catch(error => {
        console.error('Error al obtener la boleta de vacaciones:', error);
      });
  }, []);

  return (
    <div>
      {data ? (
        <PDFViewer width="100%" height="1000">
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.container}>
                {/* Encabezado */}
                <View style={styles.header}>
                <Image style={styles.logo} src={logo} />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>MUNICIPALIDAD DE NANDAYURE</Text>
                  <Text style={styles.subtitle}>DIRECCIÓN DE RECURSOS HUMANOS</Text>
                </View>
                </View>
  
                {/* Solicitud de Vacaciones */}
                <View style={styles.sectionFullWidth}>
                  <Text style={styles.subtitle}> BOLETA SOLICITUD DE VACACIONES LEGALES</Text>
                </View>
  
                {/* Información del solicitante */}
                <View style={styles.sectioninfo}>
                  <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Nombre del solicitante:</Text>
                      <Text style={styles.infoValue}>{data.nombreSolicitante}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Número de Cédula:</Text>
                      <Text style={styles.infoValue}>{data.cedula}</Text>
                    </View>
                  </View>
                </View>
  
                
                <View style={styles.alignmentContainer}>
                  {/* Departamento */}
                  <View style={styles.alignmentSection}>
                    <Text style={styles.sectionTitle}>Departamento:</Text>
                    <Text style={styles.value}>{data.departamento}</Text>
                  </View>
  
                  {/* Fecha de Ingreso */}
                  <View style={styles.alignmentSection}>
                    <Text style={styles.sectionTitle}>Fecha de Ingreso:</Text>
                    <Text style={styles.value}>{data.fechaIngreso}</Text>
                  </View>
  
                  {/* Periodos Vencidos */}
                  <View style={styles.alignmentSection}>
                    <Text style={styles.periodos}>Periodos Vencidos</Text>
                    <View style={styles.divider} />
                    <View style={styles.fieldRowperiodo}>
                      <Text style={styles.labelperiodo}>Año:</Text>
                      <Text style={styles.valueperiodo}>{data.anios}</Text>
                    </View>
                    <View style={styles.fieldRowperiodo}>
                      <Text style={styles.labelperiodo}>Días:</Text>
                      <Text style={styles.valueperiodo}>{data.dias}</Text>
                    </View>
                    <View style={styles.fieldRowperiodo}>
                      <Text style={styles.labelperiodo}>Total:</Text>
                      <Text style={styles.valueperiodo}>{data.total}</Text>
                    </View>
                  </View>
                </View>
  
{/* Sección de Derecho a Disfrutar */}
<View style={styles.derechoSection}>
    <View style={styles.derechoItem}>
        <Text style={styles.sectionTitle}>Derecho a Disfrutar</Text>
        <View style={styles.fieldRow}>
            <Text style={styles.label}>Días:</Text>
            <Text style={styles.value}>{data.dias}</Text> 
        </View>
    </View>
    <View style={styles.derechoItem}>
        <Text style={styles.sectionTitle}>Solicitados</Text>
        <View style={styles.fieldRow}>
            <Text style={styles.label}>Días:</Text>
            <Text style={styles.value}>{data.diasSolicitados}</Text>
        </View>
    </View>
    <View style={styles.derechoItem}>
        <Text style={styles.sectionTitle}>Saldo de vaciones</Text>
        <View style={styles.fieldRow}>
            <Text style={styles.label}>Días:</Text>
            <Text style={styles.value}>{data.saldoVacaciones}</Text>
        </View>
    </View>
</View>


<View style={styles.partirContainer}>
  {/* A partir del */}
  <View style={styles.partirItem}>
    <Text style={styles.sectionTitle}>A partir del</Text>
    <View style={styles.fieldRow}>
      <Text style={styles.value}>_______{data.fechaSalida}</Text>
    </View>
  </View>

  {/* Hasta y Regresando lab */}
  <View style={styles.regresoItem}>
    <View style={styles.fieldRow}>
      <Text style={styles.sectionTitle}>Hasta el:_______</Text>
      <Text style={styles.value}>{data.fechaHasta}</Text>
    </View>
    <View style={styles.fieldRow}>
      <Text style={styles.sectionTitle}>Regresando lab:_______</Text>
      <Text style={styles.value}>{data.fechaRegreso}</Text>
    </View>
  </View>

  {/* Control */}
  <View style={styles.controlItem}>
    <Text style={styles.sectionTitle}>Control #:</Text>
    <Text style={styles.valueRed}>{data.control}</Text>
  </View>
</View>
  
                {/* Observaciones */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Observaciones</Text>
                  <Text>{data.observaciones || 'N/A'}</Text>
                </View>
  
  
<View style={styles.signatureAuthorizationContainer}>
  {/* Firma del Solicitante */}
  <View style={styles.signatureItem}>
    <Text style={styles.sectionTitle}>Firma del Solicitante</Text>
    <Text style={styles.signature}>____________________________</Text>
  </View>

  {/* Autorizaciones */}
  <View style={styles.authorizationItem}>
    <Text style={styles.sectionTitle}>Autorizaciones</Text>
    <View style={styles.autorizacionRow}>
      <Text style={styles.autorizacion}>2. Autorizado por Jefe Inmediato: _______________________</Text>
    </View>
    <View style={styles.autorizacionRow}>
      <Text style={styles.autorizacion}>3. Revisado por Encargado de Recursos Humanos: _______________________</Text>
    </View>
    <View style={styles.autorizacionRow}>
      <Text style={styles.autorizacion}>Denegada ( ) Aprobada ( )</Text>
    </View>
    <View style={styles.autorizacionRow}>
      <Text style={styles.autorizacion}>4. Aprobado por Alcalde Municipal:  _______________________</Text>
    </View>
    <View style={styles.autorizacionRow}>
      <Text style={styles.autorizacion}>Denegada ( ) Aprobada ( )</Text>
    </View>
  </View>
</View>


                {/* Disposiciones */}
                <View style={styles.section}>
  <Text style={styles.sectionTitle}>Disposiciones</Text>
  <Text>1.Todo aquel funcionario que requiera tramitar las vacaciones legales debe realizar la solicitud con mínimo
una semana de anticipación, ya que deben ser revisadas y posteriormente aprobadas. Por consiguiente las
solicitudes con menos de 3 días tramitadas serán analizadas para su aprobación según el grado de urgencia</Text>
  <Text>2.Antes de presentar la solicitud a recursos humanos, esta debe de venir autorizada por el jefe y gestor del
área. Las aprobaciones las debe de coordinar el encargado de recursos humano. Incluyendo la del alcalde</Text>
  <Text>3. Si falta alguna de las firmas, la solicitud no tendrá validez.</Text>
</View>

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

export default BoletaVacaciones;
