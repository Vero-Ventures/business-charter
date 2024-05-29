import { createClient } from '@/lib/supabase/client';
import { SupabaseError } from '@/app/chat/types/types';


const supabase = createClient();

export async function fetchLatestCharterEntries(userId: string) {
    const tables = [
        'decision_tree',
        'family_values',
        'family_code',
        'family_vision',
        'philanthropy_impact_statements'
    ];
    const results: { [key: string]: any } = {};

    try {
        for (const table of tables) {
            const { data, error } = await supabase
                .from(table)
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(1);  // Fetch only the most recent entry

            if (error) throw new Error((error as SupabaseError).message);  // Type assertion here
            if (data && data.length > 0) {
                results[table] = data[0];  // Store the latest entry from each table
            }
        }
        return { data: results, error: null };
    } catch (error: any) {  
        return { data: null, error: error.message || "An unknown error occurred" };
    }
}

export async function fetchSummaryForAdmin(userId: string | null) {
    try {
        const response = await fetch('/api/admin/charter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId }),
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch summary');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch summary:', error);
        throw error;
    }
}
