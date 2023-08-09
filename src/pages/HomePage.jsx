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
    const [selectedSymbols, setSelectedSymbols] = useState([]);
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

    function getUniqueZones(cards) {
        const uniqueZones = new Set();

        for (const card of cards) {
            uniqueZones.add(card.block.zone)
        };

        return Array.from(uniqueZones);
    };

    function handleAbilityCheckbox(ability) {
        return function(evt) {
            if (evt.target.checked) {
                setSelectedAbilities([...selectedAbilities, ability]);
            } else {
                setSelectedAbilities(selectedAbilities.filter((item) => item !== ability));
            };
        };
    };

    function handleTypeCheckbox(type) {
        return function(evt) {
            if (evt.target.checked) {
                setSelectedTypes([...selectedTypes, type]);
            } else {
                setSelectedTypes(selectedTypes.filter((item) => item !== type));
            };
        };
    };

    function handleRarityCheckbox(rarity) {
        return function(evt) {
            if (evt.target.checked) {
                setSelectedRarities([...selectedRarities, rarity]);
            } else {
                setSelectedRarities(selectedRarities.filter((item) => item !== rarity));
            };
        };
    };

    function handleSymbolCheckbox(symbol) {
        return function(evt) {
            if (evt.target.checked) {
                setSelectedSymbols([...selectedSymbols, symbol]);
            } else {
                setSelectedSymbols(selectedSymbols.filter((item) => item !== symbol));
            };
        };
    };

    function handleKeywordCheckbox(keyword) {
        return function(evt) {
            if (evt.target.checked) {
                setSelectedKeywords([...selectedKeywords, keyword]);
            } else {
                setSelectedKeywords(selectedKeywords.filter((item) => item !== keyword));
            };
        };
    };

    function handleBlockZoneCheckbox(zone) {
        return function(evt) {
            if (evt.target.checked) {
                setSelectedBlockZones([...selectedBlockZones, zone]);
            } else {
                setSelectedBlockZones(selectedBlockZones.filter((item) => item !== zone));
            };
        };
    };

    function handleAttackZoneCheckbox(zone) {
        return function(evt) {
            if (evt.target.checked) {
                setSelectedAttackZones([...selectedAttackZones, zone]);
            } else {
                setSelectedAttackZones(selectedAttackZones.filter((item) => item !== zone));
            };
        };
    };

    function handleChange(propertyName, selectedValue) {
        switch (propertyName) {
            case 'cardSet':
                setCardSet(selectedValue);
                break;
            case 'cardName':
                setCardName(selectedValue);
                break;
            case 'cardControl':
                setCardControl(selectedValue);
                break;
            case 'cardDifficulty':
                setCardDifficulty(selectedValue);
                break;
            case 'cardBlockModifier':
                setCardBlockModifier(selectedValue);
                break;
            case 'cardAttackSpeed':
                setCardAttackSpeed(selectedValue);
                break;
            case 'cardDamage':
                setCardDamage(selectedValue);
                break;
            case 'cardHandSize':
                setCardHandSize(selectedValue);
                break;
            default:
                break;
        };
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

                <span className="span-grid-wrapper">
                    <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"}} 
                        id="card-name">Card Name</InputLabel>
                        <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"}} 
                        id="hand-size">Hand Size</InputLabel>
                        <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"}} 
                        id="card-sets">Set</InputLabel>
                </span>
                <span className="span-grid-wrapper">
                    <TextField 
                        style={{ width: '200px', margin: 'auto' }}
                        onChange={(e) => handleChange('cardName', e.target.value)}
                        label="enter card name" 
                        variant="outlined" 
                        name="card-name" 
                        type="text" 
                    />
                    <TextField 
                        style={{ width: '200px', margin: 'auto' }}
                        onChange={(e) => handleChange('cardHandSize', e.target.value)}
                        label="hand size" 
                        variant="outlined" 
                        name="hand-size" 
                        type="number"
                        InputProps={{inputProps: { min: 5, max: 7 }}}
                    />
                    <div>
                        <Select
                            labelId="card-sets"
                            id="card-sets"
                            multiple
                            value={cardSet}
                            onChange={(e) => handleChange('cardSet', e.target.value)}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps} >
                            {uniqueSets.map((set) => (
                                <MenuItem key={set} value={set}>
                                    <Checkbox checked={cardSet.indexOf(set) > -1} />
                                    <ListItemText primary={set} />
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </span>
                
                <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="card-abilities">Card Text Abilities</InputLabel>
                <span className="unique-values">
                    {uniqueAbilities.sort().map((ability) => (
                        <div key={ability}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedAbilities.includes(ability)}
                                        onChange={handleAbilityCheckbox(ability)}
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

                <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="card-type">Card Type</InputLabel>
                <span className="unique-values">
                    {uniqueTypes.sort().map((type) => (
                        <div key={type}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedTypes.includes(type)}
                                        onChange={handleTypeCheckbox(type)}
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

                <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="card-rarity">Card Rarity</InputLabel>
                <span className="unique-values">
                    {uniqueRarities.sort().map((rarity) => (
                        <div key={rarity}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedRarities.includes(rarity)}
                                        onChange={handleRarityCheckbox(rarity)}
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

                <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="card-symbols">Resource Symbols</InputLabel>
                <span className="unique-values">
                    {uniqueResourceSymbols.sort().map((symbol) => (
                        <div key={symbol}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedSymbols.includes(symbol)}
                                        onChange={handleSymbolCheckbox(symbol)}
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

                <span className="control-difficulty-wrapper">
                    <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="control">Control</InputLabel>
                    <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="difficulty">Difficulty</InputLabel>
                </span> 
                <span className="control-difficulty-wrapper">
                    <TextField 
                        style={{ width: '200px', margin: 'auto' }}
                        onChange={(e) => handleChange('cardControl', e.target.value)}
                        label="enter control value" 
                        variant="outlined" 
                        name="control" 
                        type="number"
                        InputProps={{inputProps: { min: 1, max: 6 }}}
                    />
                    <TextField 
                        style={{ width: '200px', margin: 'auto' }}
                        onChange={(e) => handleChange('cardDifficulty', e.target.value)}
                        label="enter difficulty value" 
                        variant="outlined" 
                        name="difficulty" 
                        type="number"
                        InputProps={{inputProps: { min: 0, max: 7 }}}
                    />
                </span>

                <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="keywords">Keywords</InputLabel>
                <span className="unique-values">
                    {uniqueKeywords.sort().map((keyword) => (
                        <div key={keyword}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedKeywords.includes(keyword)}
                                        onChange={handleKeywordCheckbox(keyword)}
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

                <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="block-modifier">Block Modifer</InputLabel>
                <span>
                    <TextField 
                        className="number-input-field"
                        style={{ width: '200px', margin: 'auto' }}
                        onChange={(e) => handleChange('cardBlockModifier', e.target.value)}
                        label="block modifier" 
                        variant="outlined" 
                        name="block-modifier" 
                        type="number"
                        InputProps={{inputProps: { min: 0, max: 5 }}}
                />
                </span>

                <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="block-zones">Block Zone</InputLabel>
                <span className="unique-values-zones">
                    {uniqueZones.sort(customSort).map((zone) => (
                        <div key={zone}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedBlockZones.includes(zone)}
                                        onChange={handleBlockZoneCheckbox(zone)}
                                        id={zone}
                                        name={zone}
                                        value={zone}
                                    />
                                }
                                label={zone}
                            />
                        </div>
                    ))}
                </span>

                <span className="attack-speed-damage-wrapper">
                    <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="attack-speed">Attack Speed</InputLabel>
                    <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="attack-damage">Attack Damage</InputLabel>
                </span>
                <span className="attack-speed-damage-wrapper">
                    <TextField 
                        className="attack-speed"
                        style={{ width: '200px', margin: 'auto' }}
                        onChange={(e) => handleChange('cardAttackSpeed', e.target.value)}
                        label="speed" 
                        variant="outlined" 
                        name="attack-speed" 
                        type="number"
                        InputProps={{inputProps: { min: 0, max: 6 }}}
                    />
                    <TextField 
                        className="attack-damage"
                        style={{ width: '200px', margin: 'auto' }}
                        onChange={(e) => handleChange('cardDamage', e.target.value)}
                        label="damage" 
                        variant="outlined" 
                        name="attack-damage" 
                        type="number"
                        InputProps={{inputProps: { min: 0, max: 10 }}}
                    />
                </span>
                            
                <InputLabel style={{
                    alignSelf: "center", 
                    margin: "20px 0"
                }} 
                id="attack-zones">Attack Zones</InputLabel>
                <span className="unique-values-zones">
                    {uniqueZones.sort(customSort).map((zone) => (
                        <div key={zone}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedAttackZones.includes(zone)}
                                        onChange={handleAttackZoneCheckbox(zone)}
                                        id={zone}
                                        name={zone}
                                        value={zone}
                                    />
                                }
                                label={zone}
                            />
                        </div>
                    ))}
                </span>
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
