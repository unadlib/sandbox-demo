import path from 'path';
import bar from './bar';

bar();

export default (): any => {
  console.log(path.sep, (global as any).bar);
  return window;
}
