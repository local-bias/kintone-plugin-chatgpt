import { ComponentProps } from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export function IconAIDefault(props: ComponentProps<typeof Bot>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'bg-gray-100 text-gray-600 p-[10%] box-border grid place-items-center',
        className
      )}
    >
      <Bot {...rest} />
    </div>
  );
}
