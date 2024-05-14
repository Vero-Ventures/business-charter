'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

type FormEditButtonProps = {
    defaultText?: string;
} & ButtonProps;

export default function FormEditButton({
    defaultText = 'Edit',
    ...props
}: FormEditButtonProps) {
    return (
        <Button
            {...props}
            size="lg"
            className="w-full"
            type="submit"
            disabled={props.disabled}>
            {props.disabled ? (
                <>
                    <Loader2Icon className="mr-2 h-6 w-6 animate-spin" />
                    <span>{defaultText}</span>
                </>
            ) : (
                <span>{defaultText}</span>
            )}
        </Button>
    );
}