import styled from '@emotion/styled';

export const ChatContent = styled.div`
  &:nth-of-type(2n) {
    background-color: #f9fafb;
  }
  color: var(--🐸foreground);

  h1 {
    font-size: 24px;
    line-height: 2.25rem;
    font-weight: 600;
    margin-bottom: calc(var(--🐸spacing) * 4);
  }
  h2:not(:first-child) {
    margin-top: calc(var(--🐸spacing) * 8);
  }
  h2:not(:last-child) {
    margin-bottom: calc(var(--🐸spacing) * 4);
  }
  h2 {
    font-size: 20px;
    line-height: 2rem;
    font-weight: 600;
  }
  @media (min-width: 768px) {
    h2 {
      font-size: 22px;
    }
  }
  h3:not(:first-child) {
    margin-top: calc(var(--🐸spacing) * 4);
  }
  h3:not(:last-child) {
    margin-bottom: calc(var(--🐸spacing) * 2);
  }
  h3 {
    font-size: 18px;
    line-height: 1.75rem;
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid color-mix(in oklab, var(--🐸primary) 50%, transparent);
    position: relative;
  }
  @media (min-width: 768px) {
    h3 {
      font-size: 20px;
    }
  }
  h3:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 33%;
    height: 2px;
    background-color: var(--🐸primary);
  }
  h4:not(:first-child) {
    margin-top: calc(var(--🐸spacing) * 4);
  }
  h4:not(:last-child) {
    margin-bottom: calc(var(--🐸spacing) * 2);
  }
  h4 {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
  }
  p:not(:first-child) {
    margin-top: calc(var(--🐸spacing) * 2);
  }
  p:not(:last-child) {
    margin-bottom: calc(var(--🐸spacing) * 2);
  }
  p {
    color: color-mix(in oklab, var(--🐸foreground) 80%, transparent);
    line-height: 1.75rem;
  }
  em {
    text-decoration-line: underline;
    text-underline-offset: 4px;
    text-decoration-color: color-mix(in oklab, var(--🐸foreground) 50%, transparent);
    text-decoration-thickness: 2px;
    font-style: normal;
  }

  hr {
    border-top-width: 1px;
    border-color: var(--🐸border);
    margin-block: calc(var(--🐸spacing) * 8);
  }

  details {
    margin-bottom: 3rem;
  }
  ul,
  ol {
    padding: 0.5rem 1rem 0.5rem 3rem;
    margin-bottom: 14px;
  }
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  ul li,
  ol li {
    line-height: 1.5;
    padding: 4px 0;
  }
  li ul,
  li ol {
    margin-bottom: 0;
  }
  li p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  table {
    width: 100%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-bottom: 2rem;
  }
  thead,
  tbody tr:not(:last-child) {
    border-bottom: 1px solid var(--🐸border);
  }
  th {
    white-space: nowrap;
    text-align: left;
    font-weight: 600;
  }
  table th,
  table td {
    padding: 0.5rem 1rem;
  }
  pre {
    border: 1px solid var(--🐸border);
    border-radius: calc(var(--🐸radius) - 6px);
    background-color: var(--🐸accent);
    color: var(--🐸accent-foreground);
    margin-bottom: calc(var(--🐸spacing) * 8);
    padding: calc(var(--🐸spacing) * 4);
  }
  code {
    font-size: 15px;
    font-family: Consolas, Monaco, Andale Mono, ui-monospace, SFMono-Regular, 'Noto Sans JP',
      'Yu Gothic Medium', YuGothic, Ubuntu Mono, monospace;
  }
`;
