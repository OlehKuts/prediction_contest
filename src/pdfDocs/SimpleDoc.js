import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", // Example URL
});

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 8, fontFamily: "Roboto" },
});

export const SimpleDoc = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text>{content}</Text>
      </View>
    </Page>
  </Document>
);
