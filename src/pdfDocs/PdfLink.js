import { PDFDownloadLink, Font } from "@react-pdf/renderer";
import Spinner from "react-bootstrap/Spinner";
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", // Example URL
});

export const PdfLink = ({ document, filename, linkName = "Download PDF" }) => (
  <PDFDownloadLink document={document} fileName={filename}>
    {({ loading }) =>
      loading ? (
        <Spinner variant="primary" animation="grow" size="sm" />
      ) : (
        linkName
      )
    }
  </PDFDownloadLink>
);
export default PdfLink;
