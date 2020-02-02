import path from 'path';
import bar from './bar';

export default (name: string): any => {
  bar(name);
  console.log(name, path.sep, (global as any).bar);
  return window;
}
