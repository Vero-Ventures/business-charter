'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { fetchLatestCharterEntries, fetchSummaryForAdmin } from './charter';
import { CharterData, SummaryData } from '@/app/chat/types/types';
import { fetchUserProfile } from '@/lib/utils';
import Badge from 'react-bootstrap/Badge';
import './styles.css'

const supabase = createClient();

const FamilyCharter = () => {
    const [charterData, setCharterData] = useState<CharterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [summaryData, setSummaryData] = useState<SummaryData | null>(null);

    useEffect(() => {
        const getSessionAndRole = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (data?.session?.user) {
                    setUserId(data.session.user.id);  // Set the user ID from session data
    
                    // Fetch user profile only if there's a user logged in
                    const profile = await fetchUserProfile();
                    if (profile && profile.role === 'admin') {
                        setIsAdmin(true);  // Set isAdmin true only if the user is an admin
                    } else {
                        setIsAdmin(false);  // Ensure isAdmin is false if not admin
                    }
                } else {
                    setError(error ? error.message : "Failed to retrieve user session");
                }
            } catch {
                setError('Failed to load data.'); // Use a user-friendly error message
            } finally {
                setLoading(false);
            }
        };

        getSessionAndRole();
    }, []);

    useEffect(() => {
        if (userId && !isAdmin) {
            fetchLatestCharterEntries(userId).then(({ data, error }) => {
                if (error) {
                    setError(error);
                } else {
                    setCharterData(data);
                }
            });
        }
    }, [userId, isAdmin]); 

    useEffect(() => {
        if (isAdmin) {
            fetchSummaryForAdmin(userId).then(data => {
                setSummaryData(data);
            }).catch(err => {
                console.error('Fetch error:', err);
                setError('Failed to load data.'); 
            });
        }
    }, [userId, isAdmin]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="charter-container">
            <Badge bg="secondary" className="title-badge">Family Charter</Badge>
            {isAdmin && summaryData ? (
                <div>
                    <h2>Summary</h2>
                </div>
            ) : charterData && Object.keys(charterData).length ? (
                Object.entries(charterData).map(([key, item], index) => (
                    // Wrap each entry with a div or React.Fragment and add a unique key prop to it
                    <div key={key + index} className="space-between-attributes">
                        <Badge pill className="attribute-badges">
                            {key.replace(/_/g, ' ').toUpperCase()}
                        </Badge>
                        <p className="space-between-text">
                            {item.question || item.description || item.statement}
                        </p>
                    </div>
                ))
            ) : (
                <p>No charter information found.</p>
            )}
        </div>
    );
};

export default FamilyCharter;
