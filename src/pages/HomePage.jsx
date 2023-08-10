import * as CardsApi from "../utilities/cards_api";
import { useEffect, useState } from "react";
import { Button, TextField, FormControlLabel } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import "./HomePage.css"

// -1 means that the field has not been updated
const initialState = {
    filteredData: [],
    cardName: "",
    selectedAbilities: [],
    selectedTypes: [],
    selectedRarities: [],
    cardSet: [],
    selectedSymbols: [],
    selectedKeywords: [],
    selectedBlockZones: [],
    selectedAttackZones: [],
    cardControl: -1,
    cardDifficulty: -1,
    cardBlockModifier: -1,
    cardAttackSpeed: -1,
    cardDamage: -1,
    cardHandSize: -1,
}

export default function HomePage() {

    const navigate = useNavigate();
    
    const [cards, setCards] = useState([]);
    const [filteredData, setFilteredData] = useState(initialState.filteredData);
    const [cardName, setCardName] = useState(initialState.cardName);
    const [selectedAbilities, setSelectedAbilities] = useState(initialState.selectedAbilities);
    const [selectedTypes, setSelectedTypes] = useState(initialState.selectedTypes);
    const [selectedRarities, setSelectedRarities] = useState(initialState.selectedRarities);
    const [cardSet, setCardSet] = useState(initialState.cardSet);
    const [selectedSymbols, setSelectedSymbols] = useState(initialState.selectedSymbols);
    const [selectedKeywords, setSelectedKeywords] = useState(initialState.selectedKeywords);
    const [selectedBlockZones, setSelectedBlockZones] = useState(initialState.selectedBlockZones);
    const [selectedAttackZones, setSelectedAttackZones] = useState(initialState.selectedAttackZones);
    const [cardControl, setCardControl] = useState(initialState.cardControl);
    const [cardDifficulty, setCardDifficulty] = useState(initialState.cardDifficulty);
    const [cardBlockModifier, setCardBlockModifier] = useState(initialState.cardBlockModifier);
    const [cardAttackSpeed, setCardAttackSpeed] = useState(initialState.cardAttackSpeed);
    const [cardDamage, setCardDamage] = useState(initialState.cardDamage);
    const [cardHandSize, setCardHandSize] = useState(initialState.cardHandSize);

    const resetState = () => {
        setCardName('')
        setSelectedAbilities([])
        setSelectedTypes([])
        setSelectedRarities([])
        setCardSet([])
        setSelectedSymbols([])
        setSelectedKeywords([])
        setSelectedBlockZones([])
        setSelectedAttackZones([])
        setCardControl(-1)
        setCardDifficulty(-1)
        setCardBlockModifier(-1)
        setCardAttackSpeed(-1)
        setCardDamage(-1)
        setCardHandSize(-1)
    };

    useEffect(() => {
        CardsApi.fetchCards()
            .then(res => setCards(res.data))
    }, []);

    function handleFilterSubmit(e) {
        e.preventDefault();

        const filteredResults = filterData(cards)
        setFilteredData(filteredResults);
        navigate("/results", { state: { filteredResults } })
    };

    // functions to filter data based on user selections
    // ============================================================
    const wasNotSearched = (value) => value === -1;
    const doesNotHaveItemsSelected = (array) => array.length === 0;
    
    function filterData(data) {
        return data.filter((item) => {

            const nameMatch = item.name.toLowerCase().includes(cardName.toLowerCase());
            const abilityMatch = selectedAbilities.every(ability => item.card_text.includes(ability)) || doesNotHaveItemsSelected(selectedAbilities);
            const typeMatch = selectedTypes.includes(item.type) || doesNotHaveItemsSelected(selectedTypes);
            const rarityMatch = selectedRarities.includes(item.rarity) || doesNotHaveItemsSelected(selectedRarities);
            const setMatch = cardSet.length === 0 || cardSet.includes(item.set);
            const symbolMatch = selectedSymbols.every(symbol => item.resource_symbol.includes(symbol)) || doesNotHaveItemsSelected(selectedSymbols);
            const controlMatch = item.control === cardControl || wasNotSearched(cardControl);
            const difficultyMatch = item.difficulty === cardDifficulty || wasNotSearched(cardDifficulty);
            const keywordMatch = selectedKeywords.every(keyword => item.keywords.includes(keyword)) || doesNotHaveItemsSelected(selectedKeywords);
            const blockModifierMatch = item.block.modifier === cardBlockModifier || wasNotSearched(cardBlockModifier);
            const blockZoneMatch = selectedBlockZones.every(zone => item.block.zone.includes(zone)) || doesNotHaveItemsSelected(selectedBlockZones);
            const attackSpeedMatch = item.attack.speed === cardAttackSpeed || wasNotSearched(cardAttackSpeed);
            const attackZoneMatch = selectedAttackZones.every(zone => item.attack.zone?.includes(zone)) || doesNotHaveItemsSelected(selectedAttackZones);
            const damageMatch = item.attack.damage === cardDamage || wasNotSearched(cardDamage);
            const handSizeMatch = item.hand_size === cardHandSize || wasNotSearched(cardHandSize);
            
            return (
                nameMatch &&
                abilityMatch &&
                typeMatch && 
                rarityMatch &&
                setMatch &&
                symbolMatch &&
                controlMatch &&
                difficultyMatch &&
                keywordMatch &&
                blockModifierMatch &&
                blockZoneMatch &&
                attackSpeedMatch &&
                attackZoneMatch &&
                damageMatch &&
                handSizeMatch
            );
        });
    };
    // ============================================================

    // functions that get all unique values from the database for each search category
    // ============================================================
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
    // ============================================================

    // generic function to handle all checkboxes
    function handleArrayState(value, currentState, setCurrentState) {
        return function(event) {
            if (event.target.checked) {
                setCurrentState([...currentState, value]);
            } else {
                setCurrentState(currentState.filter((item) => item !== value));
            }
        }
    };

    function handleStringState(value, currentState, setCurrentState) {
        return function(event) {
            if (event.target.value) {
                setCurrentState([...currentState, value]);
            } else {
                setCurrentState(currentState.filter((item) => item !== value));
            }
        }
    };

    // function to handle all input boxes
    function handleChange(propertyName, selectedValue) {
        const value = selectedValue === '' ? -1 : selectedValue;
        switch (propertyName) {
            case 'cardControl':
                setCardControl(value);
                break;
            case 'cardDifficulty':
                setCardDifficulty(value);
                break;
            case 'cardBlockModifier':
                setCardBlockModifier(Number(value));
                break;
            case 'cardAttackSpeed':
                setCardAttackSpeed(Number(value));
                break;
            case 'cardDamage':
                setCardDamage(Number(value));
                break;
            case 'cardHandSize':
                setCardHandSize(Number(value));
                break;
            default:
                break;
        };
    };

    // custom sort function for ['Low', 'Mid', 'High]
    function customSort(a, b) {
        const order = ["Low", "Mid", "High"];
        return order.indexOf(a) - order.indexOf(b);
    };

    // variables to hold unique values which dynamically render all search options
    // ============================================================
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
    // ============================================================

    return(
        <div>
            <form className="search-box" onSubmit={handleFilterSubmit}>
                <div className="div-grid-wrapper">
                    <div id="card-name-wrapper">
                        <InputLabel style={{
                                alignSelf: "center", 
                                margin: "20px 0"}} 
                            id="card-name">Card Name</InputLabel>
                        <TextField 
                            style={{ 
                                width: '200px', 
                                margin: 'auto', 
                                color: 'black'
                            }}
                            onChange={(e) => setCardName(e.target.value)}
                            label="enter card name" 
                            margin="dense"
                            variant="outlined" 
                            name="card-name" 
                            type="text" 
                        />
                    </div>
                    <div id="hand-size-wrapper">
                        <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"}} 
                        id="hand-size">Hand Size</InputLabel>
                        <TextField 
                            style={{ width: '200px', margin: 'auto' }}
                            onChange={(e) => handleChange('cardHandSize', e.target.value)}
                            label="hand size" 
                            variant="outlined" 
                            name="hand-size" 
                            type="number"
                            InputProps={{inputProps: { min: 5, max: 7 }}}
                        />
                    </div>
                    <div id="card-sets-wrapper">
                        <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"}} 
                        id="card-sets">Set</InputLabel>
                        <Select
                            labelId="card-sets"
                            id="card-sets"
                            multiple
                            value={cardSet}
                            onChange={(e) => setCardSet(e.target.value)}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            style={{width: '200px'}}>
                            {uniqueSets.map((set) => (
                                <MenuItem key={set} value={set}>
                                    <Checkbox checked={cardSet.indexOf(set) > -1} />
                                    <ListItemText primary={set} />
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                
                <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="card-abilities">Card Text Abilities</InputLabel>
                <span className="unique-values" id="ability-wrapper">
                    {uniqueAbilities.sort().map((ability) => (
                        <div key={ability}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedAbilities.includes(ability)}
                                        onChange={handleArrayState(ability, selectedAbilities, setSelectedAbilities)}
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
                <span className="unique-values" id="types-wrapper">
                    {uniqueTypes.sort().map((type) => (
                        <div key={type}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedTypes.includes(type)}
                                        onChange={handleArrayState(type, selectedTypes, setSelectedTypes)}
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
                <span className="unique-values" id="rarity-wrapper">
                    {uniqueRarities.sort().map((rarity) => (
                        <div key={rarity}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedRarities.includes(rarity)}
                                        onChange={handleArrayState(rarity, selectedRarities, setSelectedRarities)}
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
                <span className="unique-values" id="symbol-wrapper">
                    {uniqueResourceSymbols.sort().map((symbol) => (
                        <div key={symbol}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedSymbols.includes(symbol)}
                                        onChange={handleArrayState(symbol, selectedSymbols, setSelectedSymbols)}
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
                
                <div className="control-difficulty-wrapper">
                    <div id="control-wrapper">
                        <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="control">Control</InputLabel>
                        <TextField 
                            style={{ width: '200px', margin: 'auto' }}
                            onChange={(e) => handleChange('cardControl', e.target.value)}
                            label="enter control value" 
                            variant="outlined" 
                            name="control" 
                            type="number"
                            InputProps={{inputProps: { min: 1, max: 6 }}}
                        />
                    </div>
                    <div id="difficulty-wrapper">
                        <InputLabel style={{
                                alignSelf: "center", 
                                margin: "20px 0"
                        }} 
                        id="difficulty">Difficulty</InputLabel>
                        <TextField 
                            style={{ width: '200px', margin: 'auto' }}
                            onChange={(e) => handleChange('cardDifficulty', e.target.value)}
                            label="enter difficulty value" 
                            variant="outlined" 
                            name="difficulty" 
                            type="number"
                            InputProps={{inputProps: { min: 0, max: 7 }}}
                        />
                    </div>
                </div>

                <InputLabel style={{
                            alignSelf: "center", 
                            margin: "20px 0"
                        }} 
                        id="keywords">Keywords</InputLabel>
                <span className="unique-values" id="keywords-wrapper">
                    {uniqueKeywords.sort().map((keyword) => (
                        <div key={keyword}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedKeywords.includes(keyword)}
                                        onChange={handleArrayState(keyword, selectedKeywords, setSelectedKeywords)}
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
                <span id="block-mod-wrapper">
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
                <span className="unique-values-zones" id="block-zone-wrapper">
                    {uniqueZones.sort(customSort).map((zone) => (
                        <div key={zone}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedBlockZones.includes(zone)}
                                        onChange={handleArrayState(zone, selectedBlockZones, setSelectedBlockZones)}
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

                <div className="attack-speed-damage-wrapper">
                    <div id="attack-speed-wrapper">
                        <InputLabel style={{
                                alignSelf: "center", 
                                margin: "20px 0"
                        }} 
                        id="attack-speed">Attack Speed</InputLabel>
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
                    </div>
                    <div id="attack-damage-wrapper">
                        <InputLabel style={{
                                alignSelf: "center", 
                                margin: "20px 0"
                        }} 
                        id="attack-damage">Attack Damage</InputLabel>
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
                    </div>
                </div>
                            
                <InputLabel style={{
                    alignSelf: "center", 
                    margin: "20px 0"
                }} 
                id="attack-zones">Attack Zones</InputLabel>
                <span className="unique-values-zones" id="attack-zones-wrapper">
                    {uniqueZones.sort(customSort).map((zone) => (
                        <div key={zone}>
                            <FormControlLabel
                                style={{ paddingTop: '0', paddingBottom: '10px' }}
                                control={
                                    <Checkbox
                                        checked={selectedAttackZones.includes(zone)}
                                        onChange={handleArrayState(zone, selectedAttackZones, setSelectedAttackZones)}
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
                        id="search-btn"
                        style={{ margin: '20px auto', width: '200px', backgroundColor: 'green' }}
                        variant="contained"
                        type="submit">
                        Search
                    </Button>

                    <Button
                        id="reset-btn"
                        style={{ margin: '0 0 0 20px', width: '200px', backgroundColor: 'red' }}
                        onClick={resetState}
                        variant="contained">
                        Reset
                    </Button>
                </span>
            </form>

        </div>
    );
};
