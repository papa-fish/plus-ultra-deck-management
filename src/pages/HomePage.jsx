import * as CardsApi from "../utilities/cards_api";
import { useEffect, useState } from "react";
import "./HomePage.css"

export default function HomePage() {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        CardsApi.fetchCards()
            .then(res => setCards(res.data))
    }, []);

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

    const uniqueAbilityCombinations = getUniqueAbilityCombinations(cards);
    const uniqueResourceCombinations = getUniqueResourceCombinations(cards);
    const uniqueKeywordCombinations = getUniqueKeywordCombinations(cards);

    const uniqueAbilities = getUniqueItemsFromArrays(uniqueAbilityCombinations);
    const uniqueResourceSymbols = getUniqueItemsFromArrays(uniqueResourceCombinations);
    const uniqueKeywords = getUniqueItemsFromArrays(uniqueKeywordCombinations);

    const uniqueTypes = getUniqueTypes(cards);
    const uniqueRarities = getUniqueRarities(cards);
    const uniqueSets = getUniqueSets(cards);

    return(
        <div className="search-box">
            <label htmlFor=""><strong>card name</strong></label>
            <input type="text" />
            <label htmlFor=""><strong>card text abilities</strong></label>
            <span className="unique-values">
                {uniqueAbilities.sort().map(ability => (
                    <div key={ability}>
                        <input 
                            type="checkbox"
                            id={ability}
                            name={ability}
                            value={ability}
                        />
                        <label htmlFor={ability}>{ability}</label>
                    </div>
                ))}
            </span>
            <label htmlFor=""><strong>type</strong></label>
            <span className="unique-values">
                {uniqueTypes.sort().map(type => (
                    <div key={type}>
                        <input 
                            type="checkbox"
                            id={type}
                            name={type}
                            value={type}
                        />
                        <label htmlFor={type}>{type}</label>
                    </div>
                ))}
            </span>
            <label htmlFor=""><strong>rarity</strong></label>
            <span className="unique-values">
                {uniqueRarities.sort().map(rarity => (
                    <div key={rarity}>
                        <input 
                            type="checkbox"
                            id={rarity}
                            name={rarity}
                            value={rarity}
                        />
                        <label htmlFor={rarity}>{rarity}</label>
                    </div>
                ))}
            </span>
            <label htmlFor="sets"><strong>set</strong></label>
            <select name="sets" id="sets" multiple>
                {uniqueSets.map(set => (
                <option 
                    key={set}    
                    value={set}
                    id={set}
                    name={set}
                >{set}</option>
            ))}
            </select>
            <label htmlFor=""><strong>resource symbol</strong></label>
            <span className="unique-values">
                {uniqueResourceSymbols.sort().map(symbol => (
                    <div key={symbol}>
                        <input 
                            type="checkbox" 
                            id={symbol} 
                            name={symbol} 
                            value={symbol} 
                        />
                        <label htmlFor={symbol}>{symbol}</label>
                    </div>
                ))}
            </span>
            <label htmlFor=""><strong>control</strong></label>
            <label htmlFor=""><strong>difficulty</strong></label>
            <label htmlFor=""><strong>keyword</strong></label>
            <span className="unique-values">
                {uniqueKeywords.sort().map(keyword => (
                    <div key={keyword}>
                        <input 
                            type="checkbox"
                            id={keyword}
                            name={keyword}
                            value={keyword}
                        />
                        <label htmlFor={keyword}>{keyword}</label>
                    </div>
                ))}
            </span>
            <label htmlFor=""><strong>block modifier</strong></label>
            <label htmlFor=""><strong>block zone</strong></label>
            <label htmlFor=""><strong>attack speed</strong></label>
            <label htmlFor=""><strong>attack zone</strong></label>
            <label htmlFor=""><strong>attack damage</strong></label>
            <label htmlFor=""><strong>character hand-size</strong></label>
        </div>
    );
};
