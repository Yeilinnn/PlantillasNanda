import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { BoletaPagoData } from '../types/BoletaPago';
import logo from '../assets/logoNanda.jpg';


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%', 
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
    fontWeight: 'bold',
    marginBottom: 2,
   
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: 'bold',
  
  },
  container: {
    border: '1px solid #000',
    padding: 10,
    borderRadius: 2,
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    borderRightWidth: 1,
    width: '50%', 
    borderRightColor: '#000',
    paddingRight: 3,
    wordBreak: 'break-word',
  },
  fieldValue: {
    fontSize: 12,
    paddingLeft: 3,
    wordBreak: 'break-word',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5px 0',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
    marginBottom: 3,
  },
  tableColHeader: {
    width: '80%', 
    fontWeight: 'bold',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
  },
  tableCol: {
    width: '15%', 
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
  },
  tableColSalario: {
    width: '50%', 
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', 
  },

  tableColHeaderSalario: {
    width: '50%', 
    fontWeight: 'bold',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', 
  },
  tableColDevengado: {
    width: '50%', 
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', 
  },

  tableColHeaderDevengado: {
    width: '50%', 
    fontWeight: 'bold',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', 
  },
  
  footer: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 5,
  },
  deduccion: {
    width: '73%',
    border: '1px solid #000',
    padding: 5,
  },
  observacion: {
    width: '27%',
    padding: 5,
    border: '1px solid #000',
  },
  deducciontitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  observaciontitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  devengadoSection: {
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
});

const BoletaPago = ({ data }: { data: BoletaPagoData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={logo} />
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>Municipalidad de Nandayure</Text>
          <Text style={styles.subtitulo}>Boleta de Pago</Text>
        </View>
      </View>
      
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Semana de pago:</Text>
          <Text style={styles.fieldValue}>{data.semanaPago}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Funcionario:</Text>
          <Text style={styles.fieldValue}>{data.funcionario}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Puesto:</Text>
          <Text style={styles.fieldValue}>{data.puesto}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Categoría de Puesto:</Text>
          <Text style={styles.fieldValue}>{data.categoriaPuesto}</Text>
        </View>

        <View style={styles.table}>
  <View style={styles.tableRow}>
    <Text style={styles.tableColHeaderSalario}>Salario base</Text>
    <Text style={styles.tableColHeaderSalario}>Anualidades</Text>
    <Text style={styles.tableColHeaderSalario}>Horas Extras</Text>
    <Text style={styles.tableColHeaderSalario}>Dedicación</Text>
    <Text style={styles.tableColHeaderSalario}>Prohibición</Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableColSalario}>{data.salarioBase}</Text>
    <Text style={styles.tableColSalario}>{data.anualidades}</Text>
    <Text style={styles.tableColSalario}>{data.horasExtras}</Text>
    <Text style={styles.tableColSalario}>{data.dedicacion}</Text>
    <Text style={styles.tableColSalario}>{data.prohibicion}</Text>
  </View>
</View>

        <View style={styles.devengadoSection}>
          <Text style={styles.tableColHeaderDevengado}>Total Devengado:</Text>
          <Text style={styles.tableColDevengado}>{data.totalDevengado}</Text>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.deduccion}>
            <Text style={styles.deducciontitulo}>Deducciones:</Text>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Seguro (10,67%):</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.seguro}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Tributación:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.tributacion}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Coopeservidores:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.coopeservidores}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Coopealianza:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.coopealianza}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Servicoop:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.servicoop}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Coope-Ande:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.coopeAnde}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>ASEMUNA (5%):</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.asemuna}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Embargos:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.embargos}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Pensión:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.pension}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Funerales vida:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.funeralesVida}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>SITRAMUNA:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.sitramuna}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>ANEP:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.anep}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>INS:</Text>
                <Text style={styles.tableCol}>{`${data.deducciones.ins}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Total de Deducciones:</Text>
                <Text style={styles.tableCol}>{`${data.totalDeducciones}`}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Neto a Pagar:</Text>
                <Text style={styles.tableCol}>{`${data.netoAPagar}`}</Text>
              </View>
            </View>
          </View>

          <View style={styles.observacion}>
            <Text style={styles.observaciontitulo}>Observaciones:</Text>
            <Text>{data.observaciones}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Depto.Recursos Humanos</Text>
        <Text>Municipalidad de Nandayure</Text>
        <Text>Encargada. Licda. Yeilin Arias Rojas</Text>
      </View>
    </Page>
  </Document>
);

export default BoletaPago;
