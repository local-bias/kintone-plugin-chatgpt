import {
  displayingChatMessagesAtom,
  inputTextAtom,
  selectedPluginConditionAtom,
} from '@/desktop/original-view/states/states';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';

const ExampleMessage = styled.div`
  padding: calc(var(--🐸spacing) * 3);
  border: 1px solid color-mix(in oklab, var(--🐸primary) 20%, transparent);
  background-color: color-mix(in oklab, var(--🐸primary) 5%, transparent);
  cursor: pointer;
  border-radius: var(--🐸radius);

  &:hover {
    background-color: color-mix(in oklab, var(--🐸primary) 10%, transparent);
  }
`;

function Examples() {
  const condition = useAtomValue(selectedPluginConditionAtom);
  const setInput = useSetAtom(inputTextAtom);

  const examples = condition.examples.filter((ex) => ex);

  const onClick = (example: string) => {
    setInput(example);
  };

  if (!examples.length) {
    return null;
  }

  return (
    <div className='rad:hidden rad:md:flex rad:gap-6'>
      <div className='rad:flex-1 rad:grid rad:grid-cols-1 rad:md:grid-cols-2 rad:gap-3 rad:text-sm'>
        {examples.map((example, index) => (
          <ExampleMessage key={index} onClick={() => onClick(example)}>
            {example}
          </ExampleMessage>
        ))}
      </div>
    </div>
  );
}

export default function InputExamples() {
  const messages = useAtomValue(displayingChatMessagesAtom);

  if (messages.length) {
    return null;
  }

  return <Examples />;
}
