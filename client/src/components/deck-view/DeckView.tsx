import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import { DeckViewListGroupItem } from './partials/DeckViewListGroupItem';
import { DeckViewTabPane } from './partials/DeckViewTabPane';
import { DeckViewFavouriteDecks } from './partials/DeckViewFavouriteDecks';
import DeckDto from '../../types/dto/deck-dto';
import { useNavigate } from 'react-router';
import { Settings } from '../../types/settings';
import { useDecks } from '../../hooks/use-decks';
import CardDto from '../../types/dto/card-dto';
import { useCurrentDeck } from '../../hooks/use-current-deck';

export function DeckView({ settings } : { settings: Settings }) {
    const { decks } = useDecks(settings);
    const { setCurrentDeck } = useCurrentDeck();
    var navigate = useNavigate();

    const TAB_ID_PREFIX = "Decks-tab-#deck"

    const getTabs = () => document.querySelectorAll(`a[id^="${TAB_ID_PREFIX}"]`);

    const handleEdit = () => {
        getTabs().forEach((t: Element) => {
            if (t.classList.contains('active')) {
                const deckIndex = parseInt(t.id.substring(TAB_ID_PREFIX.length));
                setCurrentDeck(decks[deckIndex]);
                navigate(`/decks/${deckIndex}`);
            }
        });
    }

    const handleAdd = () => {
        const newDeckIndex = getTabs().length;
        setCurrentDeck(new DeckDto());
        navigate(`/decks/${newDeckIndex}`);
    }

    if (!decks) {
        return null;
    }

    return (
        <Container className="Deckview">            
            <h1>My Decks</h1>
            <DeckViewFavouriteDecks />
            <h2>All Decks</h2>
            <Tab.Container id="Decks" defaultActiveKey="#deck0">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {decks.map((d,i) => (
                                <DeckViewListGroupItem 
                                    key={i} 
                                    name={d.name}
                                    //count={d.count()}
                                    index={i}/>
                            ))}
                        </ListGroup>
                        <br />
                        <Row>
                            <Col sm={6}>
                                <Button size="sm" variant="primary" onClick={handleAdd}>
                                    Add Deck
                                </Button>
                            </Col>
                            <Col sm={6}>
                                <Button size="sm" variant="primary" onClick={handleEdit}>
                                    Edit Deck
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            {decks.map((d,i) => (
                                renderDeckViewTabPane(d, i)
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

function renderDeckViewTabPane(deck: DeckDto, index: number) {
    const commanderZone = deck.commandZone;
    const mainZone = deck.mainZone;
    var coverCard = (commanderZone && commanderZone.cards.length > 0) ?
        commanderZone.cards[0] : (mainZone && mainZone.cards[0]);

    if (!coverCard) {
        coverCard = new CardDto(); 
    }
    
    return (
        <DeckViewTabPane 
            key={index}
            index={index}
            name={deck.name}
            image={coverCard.image}
            lastUpdated="April 26, 2025"
            coverCard={coverCard}
        />
    )
}
