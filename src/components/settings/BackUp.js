import { SimpleDoc } from "pdfDocs/SimpleDoc";
import PdfLink from "pdfDocs/PdfLink";
import { selectAllPlayers } from "store/playerSlice";
import { selectAllGames } from "store/gameSlice";
import { store } from "store/store";
import Card from "react-bootstrap/Card";

export const BackUp = () => {
  const allPlayers = selectAllPlayers(store.getState());
  const allGames = selectAllGames(store.getState());
  return (
    <>
      <div className="backUp">
        <Card className="backupCard">
          <Card.Body>
            <Card.Title>Резервне копіювання даних</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Backup</Card.Subtitle>
            <Card.Text>
              Тут можна зберегти поточні дані турніру прогнозистів (про гравців
              або про матчі, включно з прогнозами) в JSON-форматі, зберігши їх у
              PDF-документ <br />
              Завантажте, клікнувши на відповідне посилання:
            </Card.Text>
            <Card.Link href="#">
              <PdfLink
                filename={`Список_прогнозистів.pdf`}
                linkName="Прогнозисти"
                document={
                  <SimpleDoc content={JSON.stringify(allPlayers, null, 2)} />
                }
              />
            </Card.Link>
            <Card.Link href="#">
              {" "}
              <PdfLink
                filename={`Список_матчів.pdf`}
                linkName="Матчі"
                document={
                  <SimpleDoc content={JSON.stringify(allGames, null, 2)} />
                }
              />
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
