import { getTextFromMessageContent } from '@/lib/chatgpt';
import { ChatMessage } from '@/lib/static';

const LINE_BREAK_PATTERN = /\r\n/g;
export const COLLAPSE_VISIBLE_LINES = 3;

const normalizeLineEndings = (text: string): string => text.replace(LINE_BREAK_PATTERN, '\n');

export const splitLines = (text: string): string[] => {
  if (!text) {
    return [];
  }
  return normalizeLineEndings(text).split('\n');
};

export const shouldCollapseUserMessage = (message: ChatMessage): boolean => {
  if (message.role !== 'user') {
    return false;
  }
  const lines = splitLines(getTextFromMessageContent(message.content));
  return lines.length > COLLAPSE_VISIBLE_LINES;
};

export const buildCollapsedPreview = (text: string): string => {
  const lines = splitLines(text);
  if (lines.length <= COLLAPSE_VISIBLE_LINES) {
    return text;
  }
  const previewLines = lines.slice(0, COLLAPSE_VISIBLE_LINES);
  previewLines[COLLAPSE_VISIBLE_LINES - 1] = `${previewLines[COLLAPSE_VISIBLE_LINES - 1]}…`;
  return previewLines.join('\n');
};
