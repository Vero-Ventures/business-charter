import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { AiFillMessage } from "react-icons/ai";

const IconButton = () => {
    return (
        <Link href="/family-tree" passHref legacyBehavior>
            <a aria-label="Navigate to page" style={{ all: 'unset', cursor: 'pointer' }}>
                <Button>
                    <AiFillMessage /> {/* The icon */}
                </Button>
            </a>
        </Link>
    );
};

export default IconButton;
