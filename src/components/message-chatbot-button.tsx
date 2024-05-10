"use client"

import { Button, ButtonProps } from "@/components/ui/button";
import { AiFillMessage } from "react-icons/ai";
import { useRouter } from 'next/router';

const IconButton = () => {
    const router = useRouter(); // Hook for navigation

    const handleIconClick = () => {
        console.log("Navigating to another page");
        router.push('/family-tree'); // Adjust the path to your target page
    };

    return (
        <Button onClick={handleIconClick} aria-label="Navigate to page">
            <AiFillMessage /> {/* The icon */}
        </Button>
    );
};

export default IconButton;
