import styled from '@emotion/styled';

export const ChatContent = styled.div`
  h1 {
    font-size: 24px;
    line-height: 2.25rem;
    font-weight: 600;
    margin-bottom: 16px;
  }
  h2 {
    color: #1f2937;
    font-size: 20px;
    line-height: 2rem;
    font-weight: 600;
    margin: 4rem 0 2rem;
    padding: 0.75rem 1rem;
    border-left: 4px solid #4a82b6;
    position: relative;
  }
  @media (min-width: 768px) {
    h2 {
      font-size: 22px;
      padding: 1rem 2rem;
      margin: 4rem 0 2rem;
    }
  }
  h3 {
    color: #1e293b;
    font-size: 18px;
    line-height: 1.75rem;
    font-weight: 600;
    margin: 2.5rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #b2cae0;
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
    background-color: #4a82b6;
  }
  h4 {
    color: #1e293b;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    margin: 3.5rem 0 1rem;
  }
  p {
    color: #334155;
    line-height: 1.75rem;
    margin-bottom: 2rem;
  }
  em {
    text-decoration-line: underline;
    text-underline-offset: 4px;
    text-decoration-color: #94a3b8;
    text-decoration-thickness: 2px;
    font-style: normal;
  }
  details {
    margin-bottom: 3rem;
  }
  ul,
  ol {
    background-color: #bfdbfe11;
    border: 1px solid #bfdbfe;
    padding: 0.5rem 1rem 0.5rem 3rem;
    margin-bottom: 2rem;
  }
  ol {
    list-style-type: decimal;
  }
  ul li,
  ol li {
    line-height: 1.5;
    padding: 0.5em 0;
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
  th {
    white-space: nowrap;
  }
  table th,
  table td {
    padding: 0.5rem 1rem;
    border-bottom: 1px #0002;
  }
  table th {
    background-color: #334155;
    color: #fff;
    font-weight: 400;
  }
  table td:nth-of-type(2n) {
    background-color: #f1f5f9;
  }
  pre {
    background-color: #24292e;
    color: #e1e4e8;
    margin-bottom: 2rem;
    padding: 1rem;
  }
  code {
    font-size: 15px;
    font-family: Consolas, Monaco, Andale Mono, ui-monospace, SFMono-Regular, 'Noto Sans JP',
      'Yu Gothic Medium', YuGothic, Ubuntu Mono, monospace;
  }
`;
