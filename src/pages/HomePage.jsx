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
        <div className="search-box">
            <label htmlFor="card-name"><strong>card name</strong></label>
            <input name="card-name" type="text" />

            <label htmlFor="card-abilities"><strong>card text abilities</strong></label>
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

            <label htmlFor="card-type"><strong>type</strong></label>
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

            <label htmlFor="card-rarity"><strong>rarity</strong></label>
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

            <label htmlFor="card-sets"><strong>set</strong></label>
            <select className="card-sets" name="card-sets" multiple>
                {uniqueSets.map(set => (
                    <option 
                        key={set}    
                        value={set}
                        id={set}
                        name={set}
                    >{set}
                    </option>
                ))}
            </select>

            <label htmlFor="card-symbols"><strong>resource symbol</strong></label>
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
            <label htmlFor="control"><strong>control</strong></label>
            <input name="control" type="number" min={0} max={6} />

            <label htmlFor="difficulty"><strong>difficulty</strong></label>
            <input name="difficulty" type="number" min={0} max={7} />

            <label htmlFor="keywords"><strong>keyword</strong></label>
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

            <label htmlFor="block-modifier"><strong>block modifier</strong></label>
            <span>
                <select className="comparison-icons" name="block-modifier" id="block-modifier">
                    <option value="=">=</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                </select>
                <input className="number-input-field" type="number" min={0} max={5} />
            </span>

            <label htmlFor="block-zones"><strong>block zone</strong></label>
            <span className="unique-values-zones">
                {uniqueZones.sort(customSort).map(zone => (
                    <div key={zone}>
                        <input 
                            type="checkbox"
                            id={zone}
                            name={zone}
                            value={zone}
                        />
                    <label htmlFor={zone}>{zone}</label>
                    </div>
                ))}
            </span>

            <label htmlFor="attack-speed"><strong>attack speed</strong></label>
            <span>
                <select className="comparison-icons" name="attack-speed" id="attack-speed">
                    <option value="=">=</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                </select>
                <input className="number-input-field" type="number" min={0} max={6} />
            </span>
            
            <label htmlFor="attack-zones"><strong>attack zone</strong></label>
            <span className="unique-values-zones">
                {uniqueZones.sort(customSort).map(zone => (
                    <div key={zone}>
                        <input 
                            type="checkbox"
                            id={zone}
                            name={zone}
                            value={zone}
                        />
                        <label htmlFor={zone}>{zone}</label>
                    </div>
                ))}
            </span>

            <label htmlFor="attack-damage"><strong>attack damage</strong></label>
            <div>
                <select className="comparison-icons" name="attack-damage" id="attack-damage">
                    <option value="=">=</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                </select>
                <input className="number-input-field" type="number" min={0} max={10} />
            </div>
            
            <label htmlFor="hand-size"><strong>character hand-size</strong></label>
            <input className="hand-size" name="hand-size" type="number" min={5} max={7} />
        </div>
    );
};
