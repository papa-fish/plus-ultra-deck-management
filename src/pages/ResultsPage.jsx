import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./ResultsPage.css";

export default function Results() {

    const { state } = useLocation();

    let results = state.filteredResults

    console.log(results)


    return(
        <div className="results-wrapper">
            {results.map((result, idx) => (
                <div className="card-wrapper" key={idx}>
                    <div className="results-img-wrapper">
                        <img src={result.url} alt="" />
                    </div>
                    <footer className="results-btn-wrapper">
                        <div>
                            <Button
                                className="add-btn"
                                style={{ margin: '20px auto', width: '200px', backgroundColor: 'green' }}
                                variant="contained"
                                >
                                Add
                            </Button>
                            <TextField 
                                style={{ width: '100px', margin: ' 18px 0 0 10px' }}
                                // onChange={(e) => handleChange('cardControl', e.target.value)}
                                size="small"
                                label="add items" 
                                variant="outlined" 
                                name="card-amt" 
                                type="number"
                                InputProps={{inputProps: { min: 1, max: 8 }}}
                            />
                        </div>
                        <div>
                            <Button
                                className="remove-btn"
                                style={{ margin: '20px auto', width: '200px', backgroundColor: 'red' }}
                                variant="contained"
                                >
                                Remove
                            </Button>
                            <TextField 
                                style={{ width: '100px', margin: ' 18px 0 0 10px' }}
                                // onChange={(e) => handleChange('cardControl', e.target.value)}
                                size="small"
                                label="remove items" 
                                variant="outlined" 
                                name="remove-amt" 
                                type="number"
                                InputProps={{inputProps: { min: 1, max: 8 }}}
                            />
                        </div>
                    </footer>
                </div>
            ))}
        </div>
    );
};