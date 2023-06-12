import React, { FCX } from 'react';
import styled from '@emotion/styled';
import APITokenForm from './form-api-key';
import ViewIdState from './form-view-id';
import OutputAppIdForm from './form-output-app-id';
import OutputContentForm from './form-output-content';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
      <div>
        <h3>ChatGPTのAPIキー</h3>
        <APITokenForm />
      </div>
      <div>
        <h3>チャット画面を表示するビューID</h3>
        <ViewIdState />
      </div>
      <div>
        <h3>ログを記録するアプリID</h3>
        <OutputAppIdForm />
      </div>
      <div>
        <h3>チャット内容を記録するフィールドコード</h3>
        <OutputContentForm />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 0 16px;
  > div {
    padding: 8px 8px 8px 16px;
    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
`;

export default StyledComponent;
