import * as CardsApi from "../utilities/cards_api";
import { useEffect, useState } from "react";

import "./ChecklistPage.css"

export default function ChecklistPage() {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        CardsApi.fetchCards()
            .then(res => setCards(res.data))
    }, []);

    return(
        <div>
            <h1>Undaunted Raid Card List</h1>
            <div className="checklist-grid-wrapper">
                <div className="category-wrapper">
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number">001</label>
                        <label><strong>Eijiro Kirishima 3</strong></label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>002</strong></label>
                        <label>Hardened Fist</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>003</strong></label>
                        <label>Red Counter</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>004</strong></label>
                        <label>Red Gauntlet</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>005</strong></label>
                        <label>Red Riot Unbreakable</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>006</strong></label>
                        <label>Facing Danger</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>007</strong></label>
                        <label>Learning To Harden</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>008</strong></label>
                        <label>Red Riot's The Coolest</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>009</strong></label>
                        <label>Unbreakable</label>
                    </span>
                </div>
                <div className="category-wrapper">
                <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>046</strong></label>
                        <label><strong>Sir Nighteye</strong></label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>047</strong></label>
                        <label>Counter-Sweep</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>048</strong></label>
                        <label>Precision Seal Strike</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>049</strong></label>
                        <label>Repeated Seal Toss</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>050</strong></label>
                        <label>Stamp Out</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>051</strong></label>
                        <label>All Might & Sir Nighteye</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>052</strong></label>
                        <label>Detailing The Plan</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>053</strong></label>
                        <label>Foresight</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>054</strong></label>
                        <label>Seal Of Approval</label>
                    </span>
                </div>
                <div className="category-wrapper">
                <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>086</strong></label>
                        <label>Eri</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>087</strong></label>
                        <label>Mimicry</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>088</strong></label>
                        <label>Takoyaki</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>089</strong></label>
                        <label>Twisty Surroundings</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>090</strong></label>
                        <label>"Borrowed" Goods</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>091</strong></label>
                        <label>Bubble Restraint</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>092</strong></label>
                        <label>Centicoil</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>093</strong></label>
                        <label>Deadly Fire</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>094</strong></label>
                        <label>Duplicate Deception Stab</label>
                    </span>
                    <span className="card-columns">
                        <input type="checkbox" />
                        <input className="amount-owned" type="number" min={0} />
                        <label className="card-number"><strong>095</strong></label>
                        <label>Foresight Fusilade</label>
                    </span>

                </div>
            </div>
        </div>
    );
};