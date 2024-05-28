import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '../src/components/ui/collapsible';
import { AspectRatio } from '../src/components/ui/aspect-ratio';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

describe('Collapsible component', () => {
  it('should assign CollapsiblePrimitive.Root to Collapsible', () => {
    expect(Collapsible).toEqual(CollapsiblePrimitive.Root);
  });
});

describe('Collapsible trigger', () => {
  it('should assign CollapsiblePrimitive.CollapsibleTrigger to CollapsibleTrigger', () => {
    expect(CollapsibleTrigger).toEqual(CollapsiblePrimitive.CollapsibleTrigger);
  });
});

describe('Collapsible content', () => {
  it('should assign CollapsiblePrimitive.CollapsibleContent to CollapsibleContent', () => {
    expect(CollapsibleContent).toEqual(CollapsiblePrimitive.CollapsibleContent);
  });
});

describe('AspectRatio component', () => {
  it('should assign AspectRatioPrimitive.Root to AspectRatio', () => {
    expect(AspectRatio).toEqual(AspectRatioPrimitive.Root);
  });
});
