import { ChatMessageRole } from '@/lib/static';
import PersonIcon from '@mui/icons-material/Person';
import { PropsWithChildren } from 'react';
import AiIcon from './ai-icon';

type Props = { role: ChatMessageRole };

export default function MessageContainer({ children, role }: PropsWithChildren<Props>) {
  return (
    <div className='rad:max-w-[900px] rad:mx-auto! rad:py-6! rad:px-4! rad:grid rad:grid-cols-[30px_1fr] rad:gap-6 rad:relative'>
      <div
        data-role={role}
        className="rad:overflow-hidden rad:h-[30px] rad:grid rad:place-items-center rad:rounded rad:text-white rad:data-[role='user']:bg-blue-600 rad:[&_img]:w-full rad:[&_img]:h-full rad:[&_img]:object-cover"
      >
        {role === 'assistant' && <AiIcon />}
        {role === 'user' && <PersonIcon />}
      </div>
      <div className='rad:overflow-x-auto'>{children}</div>
    </div>
  );
}
