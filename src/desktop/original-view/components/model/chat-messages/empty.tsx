import React, { FCX } from 'react';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

const Component: FCX = () => (
  <div className='py-8 px-4 w-full max-w-[900px] mx-auto text-gray-400 flex flex-col justify-center items-center gap-2 h-[440px]'>
    <ChatOutlinedIcon sx={{ fontSize: '10em' }} />
    <div>送信メッセージを入力し、「送信」ボタンを押してください。</div>
    <div>送信メッセージに対する返答がここに表示されます。</div>
  </div>
);

export default Component;
