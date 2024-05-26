'use client';

import React, { useState, useEffect } from 'react';
import { CharterItem } from './types';

const FamilyCharter = () => {
    const [charterData, setCharterData] = useState<CharterItem[]>([]);

    useEffect(() => {
        fetch('/family_charter.json')  // Assuming the JSON file is in the public directory
            .then(response => response.json())
            .then(data => {
                setCharterData(data.items); // Adjust according to your JSON structure
            })
            .catch(error => console.error('Failed to load data', error));
    }, []);

    return (
        <div>
            <h1>Family Charter</h1>
            {charterData.length > 0 ? (
                charterData.map((item, index) => (
                    <div key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                ))
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
};

export default FamilyCharter;
