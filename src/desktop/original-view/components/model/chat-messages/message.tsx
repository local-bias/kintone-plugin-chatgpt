import { getHTMLfromMarkdown } from '@/desktop/original-view/action';
import { ChatMessage } from '@/lib/static';
import React, { FC } from 'react';

type Props = {
  message: ChatMessage['content'];
  cursor?: boolean;
  className?: string;
};

const Component: FC<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  if (typeof message === 'string') {
    const html = getHTMLfromMarkdown(message);
    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className='[&>_*:first-of-type]:mt-0 [&>_*:last-of-type]:mb-0'
      />
    );
  }

  const text = message.find((m) => m.type === 'text')?.text || '';
  const images = message.filter((m) => m.type === 'image_url');

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: getHTMLfromMarkdown(text) }}
        className='[&>_*:first-of-type]:mt-0 [&>_*:last-of-type]:mb-0'
      />
      {!!images.length && (
        <div className='flex flex-wrap gap-2 mt-4'>
          {images.map((image, i) => (
            <div key={i} className='w-16 h-12 overflow-hidden'>
              <img src={image.image_url?.url ?? ''} className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Component;
