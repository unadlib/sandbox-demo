import path from 'path';

export default (): any => {
  console.log(path.sep, (global as any).bar);
  return window;
}
