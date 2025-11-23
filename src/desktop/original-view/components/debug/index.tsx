import { isProd } from '@/lib/global';
import { DebugStates } from './states';

export function Debug() {
  if (isProd) {
    return null;
  }
  return <DebugStates />;
}
