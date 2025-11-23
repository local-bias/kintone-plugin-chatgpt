import { ComponentProps } from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export function IconAIDefault(props: ComponentProps<typeof Bot>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'rad:bg-muted rad:text-muted-foreground rad:p-[10%] rad:box-border rad:grid rad:place-items-center',
        className
      )}
    >
      <Bot {...rest} />
    </div>
  );
}
