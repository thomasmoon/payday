// Import from 'react-native-pdf-lib'
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

// For pdf delivery
//import RNFetchBlob from 'rn-fetch-blob'

const generatePdf = async () => {

    // Create a PDF page with text and rectangles
    const page1 = PDFPage
      .create()
      .setMediaBox(200, 200)
      .drawText('You can add text and rectangles to the PDF!', {
        x: 5,
        y: 235,
        color: '#007386',
      })
      .drawRectangle({
        x: 25,
        y: 25,
        width: 150,
        height: 150,
        color: '#FF99CC',
      })
      .drawRectangle({
        x: 75,
        y: 75,
        width: 50,
        height: 50,
        color: '#99FFCC',
      });
    
    // Create a PDF page with text and images
    const jpgPath: string = './img/payday_logo.jpg'; // Path to a JPG image on the file system...
    const pngPath: string = './img/payday_logo.png';// Path to a PNG image on the file system...
    const page2: PDFPage = PDFPage
      .create()
      .setMediaBox(250, 250)
      .drawText('You can add JPG images too!');
  
      /*
      .drawImage(jpgPath, 'jpg', {
        x: 5,
        y: 125,
        width: 200,
        height: 100 
      })
      .drawImage(pngPath, 'png', {
        x: 5,
        y: 25,
        width: 200,
        height: 100
      });*/
    
    // Create a new PDF in your app's private Documents directory
    const docsDir = await PDFLib.getDocumentsDirectory();
    const pdfPath = `${docsDir}/export.pdf`;
  
    PDFDocument
      .create(pdfPath)
      .addPages([page1, page2])
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        console.log('PDF created at: ' + path);
        // Do stuff with your shiny new PDF!
      });
  }
  
  
  const sharePDFWithAndroid = (pdfPath:string) => {
    //const { fs } = RNFetchBlob;
  
  /*
    return fs.readFile(pdfPath, 'base64').then(
      base64Data => {
        base64Data = `data:application/pdf;base64` + base64Data;
        return Share.share({ url: base64Data });
      });*/
  }

  const GeneratePDF = () => {
  }