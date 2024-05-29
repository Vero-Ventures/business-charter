'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { fetchLatestCharterEntries } from './charter';
import { CharterData } from '@/app/chat/types/types';
import Badge from 'react-bootstrap/Badge';
import './styles.css'

const supabase = createClient();

const FamilyCharter = () => {
    const [charterData, setCharterData] = useState<CharterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (data?.session?.user) {
                setUserId(data.session.user.id);
            } else {
                setError(error ? error.message : "Failed to retrieve user session");
                setLoading(false);
            }
        };

        getSession();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchLatestCharterEntries(userId).then(({ data, error }) => {
                if (error) {
                    setError(error);
                } else {
                    setCharterData(data);
                }
                setLoading(false);
            });
        }
    }, [userId]); // Fetch charter entries when userId is set

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        // <div>
        //     <h1>Family Charter</h1>
        //     {charterData && Object.keys(charterData).length ? (
        //         Object.entries(charterData).map(([key, item]) => (
        //             <div key={key}>
        //                 <h2>{key.replace(/_/g, ' ').toUpperCase()}</h2>
        //                 <p>{item.question || item.description || item.statement}</p>
        //             </div>
        //         ))
        //     ) : (
        //         <p>No charter information found.</p>
        //     )}
        // </div>

        <div className="charter-container">
            <Badge bg="secondary" className="title-badge">Family Charter</Badge>
            {charterData && Object.keys(charterData).length? (
                Object.entries(charterData).map(([key, item]) => (
                    <p className="space-between-attributes">
                        <Badge pill className="attribute-badges">
                            {key.replace(/_/g, ' ').toUpperCase()}
                        </Badge>
                        <p className="space-between-text">
                            {item.question || item.description || item.statement}
                        </p>
                    </p>
                ))
            ) : (
                <p>No charter information found.</p>
            )}
{/* 

                <p className="space-between-attributes">
                    <Badge pill className="attribute-badges">
                        Decision Tree
                    </Badge>
                    <p className="space-between-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </p>
                <p className="space-between-attributes">
                <Badge pill className="attribute-badges">
                    Family Values
                </Badge>
                </p>
                <p className="space-between-attributes">
                <Badge pill className="attribute-badges">
                    Family Values
                </Badge>
                </p>
                <p className="space-between-attributes">
                <Badge pill className="attribute-badges">
                    Family Values
                </Badge>
                </p>
                <p className="space-between-attributes">
                <Badge pill className="attribute-badges">
                    Family Values
                </Badge>
                </p> */}
        </div>
    );
};

export default FamilyCharter;