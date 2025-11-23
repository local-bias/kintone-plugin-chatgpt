import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'rad:border-input rad:placeholder:text-muted-foreground rad:focus-visible:border-ring rad:focus-visible:ring-ring/50 rad:aria-invalid:ring-destructive/20 rad:dark:aria-invalid:ring-destructive/40 rad:aria-invalid:border-destructive rad:dark:bg-input/30 rad:flex rad:field-sizing-content rad:min-h-16 rad:w-full rad:rounded-md rad:border rad:bg-transparent rad:px-3 rad:py-2 rad:text-base rad:shadow-xs rad:transition-[color,box-shadow] rad:outline-none rad:focus-visible:ring-[3px] rad:disabled:cursor-not-allowed rad:disabled:opacity-50 rad:md:text-sm',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
