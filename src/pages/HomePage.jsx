import * as CardsApi from "../utilities/cards_api";
import { useEffect, useState } from "react";
import { Button, TextField, FormControlLabel } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import "./HomePage.css"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function HomePage() {

    const [cards, setCards] = useState([]);
    const [cardName, setCardName] = useState("");
    const [selectedAbilities, setSelectedAbilities] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedRarities, setSelectedRarities] = useState([]);
    const [cardSet, setCardSet] = useState([]);
    const [selectedSymbols, setSelectedSymbol] = useState([]);
    const [cardControl, setCardControl] = useState(1);
    const [cardDifficulty, setCardDifficulty] = useState(0);
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [cardBlockModifier, setCardBlockModifier] = useState(0);
    const [selectedBlockZones, setSelectedBlockZones] = useState([]);
    const [cardAttackSpeed, setCardAttackSpeed] = useState(0);
    const [selectedAttackZones, setSelectedAttackZones] = useState([]);
    const [cardDamage, setCardDamage] = useState(0);
    const [cardHandSize, setCardHandSize] = useState(5);

    useEffect(() => {
        CardsApi.fetchCards()
            .then(res => setCards(res.data))
    }, []);

    function handleSubmit(e) {

    };

    function getUniqueAbilityCombinations(cards) {
        const uniqueAbilities = new Set();

        for (const card of cards) {
            uniqueAbilities.add(card.card_text)
        };

        return Array.from(uniqueAbilities);
    };

    function getUniqueResourceCombinations(cards) {
        const uniqueResources = new Set();
        
        for (const card of cards) {
            uniqueResources.add(card.resource_symbol)
        };

        return Array.from(uniqueResources);
    };

    function getUniqueKeywordCombinations(cards) {
        const uniqueKeywords = new Set();

        for (const card of cards) {
            uniqueKeywords.add(card.keywords)
        };

        return Array.from(uniqueKeywords);
    };

    function getUniqueItemsFromArrays(uniqueCombinationArray) {
        const combinedArray = uniqueCombinationArray.reduce((result, array) => [...result, ...array], []);
        const uniqueSet = new Set(combinedArray);
        const uniqueAbilities = Array.from(uniqueSet);
        return uniqueAbilities;
    };

    function getUniqueTypes(cards) {
        const uniqueTypes = new Set();
    
        for (const card of cards) {
            uniqueTypes.add(card.type);
        };
    
        return Array.from(uniqueTypes);
    };

    function getUniqueRarities(cards) {
        const uniqueRarities = new Set();

        for (const card of cards) {
            uniqueRarities.add(card.rarity)
        };

        return Array.from(uniqueRarities);
    };

    function getUniqueSets(cards) {
        const uniqueSets = new Set();

        for (const card of cards) {
            uniqueSets.add(card.set)
        };

        return Array.from(uniqueSets);
    };

    function handleChange(e) {
        const {
            target: { value },
        } = e;
        setCardSet(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCheckboxChange = (ability) => (event) => {
        if (event.target.checked) {
          setSelectedAbilities([...selectedAbilities, ability]);
        } else {
          setSelectedAbilities(selectedAbilities.filter((item) => item !== ability));
        }
    };

    function getUniqueZones(cards) {
        const uniqueZones = new Set();

        for (const card of cards) {
            uniqueZones.add(card.block.zone)
        };

        return Array.from(uniqueZones);
    };

    function customSort(a, b) {
        const order = ["Low", "Mid", "High"];
        return order.indexOf(a) - order.indexOf(b);
    };

    const uniqueAbilityCombinations = getUniqueAbilityCombinations(cards);
    const uniqueResourceCombinations = getUniqueResourceCombinations(cards);
    const uniqueKeywordCombinations = getUniqueKeywordCombinations(cards);

    const uniqueAbilities = getUniqueItemsFromArrays(uniqueAbilityCombinations);
    const uniqueResourceSymbols = getUniqueItemsFromArrays(uniqueResourceCombinations);
    const uniqueKeywords = getUniqueItemsFromArrays(uniqueKeywordCombinations);

    const uniqueTypes = getUniqueTypes(cards);
    const uniqueRarities = getUniqueRarities(cards);
    const uniqueSets = getUniqueSets(cards);
    const uniqueZones = getUniqueZones(cards);

    return(
        <div>
            <form className="search-box" onSubmit={handleSubmit}>
                <label htmlFor="card-name"><strong>card name</strong></label>
                <TextField 
                    style={{ width: '200px', margin: 'auto' }}
                    label="enter card name" 
                    variant="outlined" 
                    name="card-name" 
                    type="text" 
                />

                <label htmlFor="card-abilities"><strong>card text abilities</strong></label>
                <span className="unique-values">
                    {uniqueAbilities.sort().map((ability) => (
                        <div key={ability}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedAbilities.includes(ability)}
                                        onChange={handleCheckboxChange(ability)}
                                        id={ability}
                                        name={ability}
                                        value={ability}
                                    />
                                }
                                label={ability}
                            />
                        </div>
                    ))}
                </span>

                <label htmlFor="card-type"><strong>type</strong></label>
                <span className="unique-values">
                    {uniqueTypes.sort().map((type) => (
                        <div key={type}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedAbilities.includes(type)}
                                        onChange={handleCheckboxChange(type)}
                                        id={type}
                                        name={type}
                                        value={type}
                                    />
                                }
                                label={type}
                            />
                        </div>
                    ))}
                </span>

                <label htmlFor="card-rarity"><strong>rarity</strong></label>
                <span className="unique-values">
                    {uniqueRarities.sort().map((rarity) => (
                        <div key={rarity}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedAbilities.includes(rarity)}
                                        onChange={handleCheckboxChange(rarity)}
                                        id={rarity}
                                        name={rarity}
                                        value={rarity}
                                    />
                                }
                                label={rarity}
                            />
                        </div>
                    ))}
                </span>

                <div>
                    <InputLabel id="card-sets"><strong>set</strong></InputLabel>
                    <Select
                        labelId="card-sets"
                        id="card-sets"
                        multiple
                        value={cardSet}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {uniqueSets.map((set) => (
                            <MenuItem key={set} value={set}>
                                <Checkbox checked={cardSet.indexOf(set) > -1} />
                                <ListItemText primary={set} />
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <label htmlFor="card-symbols"><strong>resource symbol</strong></label>
                <span className="unique-values">
                    {uniqueResourceSymbols.sort().map((symbol) => (
                        <div key={symbol}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedAbilities.includes(symbol)}
                                        onChange={handleCheckboxChange(symbol)}
                                        id={symbol}
                                        name={symbol}
                                        value={symbol}
                                    />
                                }
                                label={symbol}
                            />
                        </div>
                    ))}
                </span>

                <label htmlFor="control"><strong>control</strong></label>
                <TextField 
                    style={{ width: '200px', margin: 'auto' }}
                    label="enter control value" 
                    variant="outlined" 
                    name="control" 
                    type="number"
                    InputProps={{inputProps: { min: 1, max: 6 }}}
                />

                <label htmlFor="difficulty"><strong>difficulty</strong></label>
                <TextField 
                    style={{ width: '200px', margin: 'auto' }}
                    label="enter difficulty value" 
                    variant="outlined" 
                    name="difficulty" 
                    type="number"
                    InputProps={{inputProps: { min: 0, max: 7 }}}
                />

                <label htmlFor="keywords"><strong>keyword</strong></label>
                <span className="unique-values">
                    {uniqueKeywords.sort().map((keyword) => (
                        <div key={keyword}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedAbilities.includes(keyword)}
                                        onChange={handleCheckboxChange(keyword)}
                                        id={keyword}
                                        name={keyword}
                                        value={keyword}
                                    />
                                }
                                label={keyword}
                            />
                        </div>
                    ))}
                </span>

                <label htmlFor="block-modifier"><strong>block modifier</strong></label>
                <span>
                    <TextField 
                        className="number-input-field"
                        style={{ width: '200px', margin: 'auto' }}
                        label="block modifier" 
                        variant="outlined" 
                        name="block-modifier" 
                        type="number"
                        InputProps={{inputProps: { min: 0, max: 5 }}}
                />
                </span>

                <label htmlFor="block-zones"><strong>block zone</strong></label>
                <span className="unique-values-zones">
                    {uniqueZones.sort(customSort).map((zones) => (
                        <div key={zones}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedAbilities.includes(zones)}
                                        onChange={handleCheckboxChange(zones)}
                                        id={zones}
                                        name={zones}
                                        value={zones}
                                    />
                                }
                                label={zones}
                            />
                        </div>
                    ))}
                </span>

                <label htmlFor="attack-speed"><strong>attack speed</strong></label>
                <span>
                    {/* <select className="comparison-icons" name="attack-speed" id="attack-speed">
                        <option value="=">=</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                    </select> */}
                    <TextField 
                        className="attack-speed"
                        style={{ width: '200px', margin: 'auto' }}
                        label="attack speed" 
                        variant="outlined" 
                        name="attack-speed" 
                        type="number"
                        InputProps={{inputProps: { min: 0, max: 6 }}}
                    />
                </span>
                
                <label htmlFor="attack-zones"><strong>attack zone</strong></label>
                <span className="unique-values-zones">
                    {uniqueZones.sort(customSort).map((zones) => (
                        <div key={zones}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedAbilities.includes(zones)}
                                        onChange={handleCheckboxChange(zones)}
                                        id={zones}
                                        name={zones}
                                        value={zones}
                                    />
                                }
                                label={zones}
                            />
                        </div>
                    ))}
                </span>

                <label htmlFor="attack-damage"><strong>attack damage</strong></label>
                <div>
                    <TextField 
                        className="attack-damage"
                        style={{ width: '200px', margin: 'auto' }}
                        label="attack damage" 
                        variant="outlined" 
                        name="attack-damage" 
                        type="number"
                        InputProps={{inputProps: { min: 0, max: 10 }}}
                    />
                </div>

                <label htmlFor="hand-size"><strong>character hand-size</strong></label>

                <TextField 
                        className="hand-size"
                        style={{ width: '200px', margin: 'auto' }}
                        label="hand size" 
                        variant="outlined" 
                        name="hand-size" 
                        type="number"
                        InputProps={{inputProps: { min: 5, max: 7 }}}
                />
                <span>
                    <Button
                        className="search-btn"
                        style={{ margin: '20px auto', width: '200px', backgroundColor: 'green' }}
                        variant="contained"
                        type="submit">
                        Search
                    </Button>
                    <Button
                        className="search-btn"
                        style={{ margin: '0 0 0 20px', width: '200px', backgroundColor: 'red' }}
                        variant="contained">
                        Reset
                    </Button>
                </span>
            </form>
        </div>
    );
};
