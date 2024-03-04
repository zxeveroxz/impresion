import  { useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const generateRandomName = () => {
  const nameLength = Math.floor(Math.random() * (50 - 5 + 1)) + 5; // Longitud aleatoria entre 5 y 50 caracteres
  const letters = 'ABCD EFGH IJK.LMNOPQ RST-UVWXYZ';
  let randomName = '';

  for (let i = 0; i < nameLength; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomName += letters.charAt(randomIndex);
  }

  return randomName + randomName.length;
};

const App = () => {
  useEffect(() => {
    const generatePDF = () => {
      const content = [];

      const defaultFont = { fontSize: 8 ,margin: [0, 0, 0, 5]};

      content.push({ text: 'CONFECCIONES SILVA SPORT E.I.R.L', fontSize:11, alignment: 'center',bold: true, margin: [0, 10, 0, 5] });
      content.push({ text: 'RUC: 20556437174', fontSize:9,alignment: 'center',bold: true, ...defaultFont  });
      content.push({ text: 'JR. HUMBOLDT NRO. 1642 GAMARRA (INTERIOR 25-26 SEGUNDO PISO) , LA VICTORIA , LIMA - LIMA', ...defaultFont, alignment: 'center' });
      content.push({ text: 'silva.esport.2@hotmail.com', ...defaultFont, alignment: 'center' });
      content.push({ text: '955370963 / 970699262', ...defaultFont, alignment: 'center' });

       // Añade una línea horizontal después de los teléfonos
       content.push({
        canvas: [
          {
            type: 'line',
            x1: 10, y1: 0, // Coordenadas iniciales
            x2: 200, y2: 0, // Coordenadas finales
            lineWidth: 0.5, // Grosor de la línea
          },
        ],
      });

      content.push({ text: 'GUIA DE REMISIÓN REMITENTE', fontSize:10, alignment: 'center',bold: true, margin: [0, 10, 0, 5] });

      content.push({ text: 'T001-00000890', fontSize:12, alignment: 'center',bold: true, margin: [0, 0, 0, 5] });

      content.push({
        canvas: [
          {
            type: 'line',
            x1: 10, y1: 0, // Coordenadas iniciales
            x2: 200, y2: 0, // Coordenadas finales
            lineWidth: 0.5, // Grosor de la línea
          },
        ],
      });

      const tableDestinatarioContenido = {
        table: {         
          widths: ['100%'], // Ancho fijo para la primera columna
          body: [
            [{ text: 'Razon Social: COMERCIAL HERNAN E.I.R.L.',...defaultFont, margin: [0, 0, 0, 0] ,border:[0,0,0,0] }],
            [{ text: 'RUC: 20600853563',...defaultFont,margin: [0, 0, 0, 0]  ,border:[0,0,0,0]}], 
            [{ text: 'Direccion: PLAT. JAUN VELASCO ALV. NRO. SN, PIURA-PIURA-PIURA , Piura , Piura - PIURA',...defaultFont,margin: [0, 0, 0, 0]  ,border:[0,0,0,0]}],
          ],
        }
      };

      const tableDestinatario = {
        table: {
          headerRows: 1,
          widths: ['100%'], // Ancho fijo para la primera columna
          body: [
            [{ text: 'DESTINATARIO',  alignment: 'center',bold: true , fontSize:9,  margin: [0,0,0,0] }],
            [tableDestinatarioContenido]
          ],
        },
        margin: [0, 10, 0, 10],
      };

      content.push(tableDestinatario);


      const tableEnvioContenido = {
        table: {         
          widths: ['50%','50%'], // Ancho fijo para la primera columna
          body: [
            [{ text: 'MOTIVO TRASLADO: VENTA', colSpan: 2, alignment: 'center', ...defaultFont, margin: [0, 0, 0, 0] ,border:[0,0,0,0] },{}],
            [{ text: 'Fecha Inicio Traslado: 01/03/2024', colSpan: 2, alignment: 'center', ...defaultFont, margin: [0, 0, 0, 0] ,border:[0,0,0,0] },{}],
            [{ text: 'Fecha Entrega al Transportista: 01/03/2024', colSpan: 2, alignment: 'center', ...defaultFont, margin: [0, 0, 0, 0] ,border:[0,0,0,0] },{}],
            [{ text: 'Modalidad de Transporte: 01', colSpan: 2, alignment: 'center', ...defaultFont, margin: [0, 0, 0, 0] ,border:[0,0,0,0] },{}],
            [{ text: 'Peso Bruto Total: 8.00 KILOGRAMO', colSpan: 2, alignment: 'center', ...defaultFont, margin: [0, 0, 0, 10] ,border:[0,0,0,0] },{}],

            [
              { text: 'PUNTO DE PARTIDA: JR. HUMBOLDT 1642 INTERIOR 25-26 SEGUNDO PISO', ...defaultFont, alignment:"left", margin: 3},
              { text: 'PUNTO DE LLEGADA: AGUAS VERDES', ...defaultFont, alignment:"left", margin: 3 }
            ],

          ],          
        },
        margin: [-5, 0, -5, -3]  
      };

      const tableEnvio = {
        table: {
          headerRows: 1,
          widths: ['100%'], // Ancho fijo para la primera columna
          body: [
            [{ text: 'ENVIO',  alignment: 'center',bold: true , fontSize:9,  margin: [0,0,0,0] }],            
            [tableEnvioContenido]
          ],
          lineWidth: 20, // Ajusta el grosor de las líneas
        },
        margin: [0, 0, 0, 10], 
      };

      content.push(tableEnvio);





      const items = [];

      for (let i = 0; i < 80; i++) {
        items.push([
          { text: generateRandomName(), ...defaultFont, noWrap: false },
          { text: 2, ...defaultFont },
          { text: '$10.00', ...defaultFont },
          { text: '$20.00', ...defaultFont }
        ]);
      }

      const table = {
        table: {
          headerRows: 1,
          widths: [80, 'auto', 'auto', 'auto'], // Ancho fijo para la primera columna
          body: [
            [{ text: 'Descripción', ...defaultFont }, { text: 'Cantidad', ...defaultFont }, { text: 'Precio unitario', ...defaultFont }, { text: 'Total', ...defaultFont }],
            ...items,
            [{ text: 'Total:', colSpan: 3, alignment: 'right', ...defaultFont }, {}, {}, { text: '$XXX.XX', ...defaultFont }]
          ],
         
        },
        margin: [0, 0, 0, 10],
      };

      content.push(table);

      const pdfDoc = {
        content: content,
        pageSize: {
          width: 220, // Ancho de la hoja en mm
          height: 'auto', // Altura automática
        },
        pageMargins: [2, 5], // Márgenes horizontales mínimos        
      };

     // pdfMake.createPdf(pdfDoc).download('factura.pdf');
     pdfMake.createPdf(pdfDoc).open(); // Abre el PDF en el navegador en lugar de descargarlo

    };

    generatePDF();
  }, []);

  return null; // No se renderiza ningún componente visible en la pantalla
};

export default App;
