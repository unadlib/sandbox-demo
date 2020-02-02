import ModuleB from 'moduleB';

ModuleB();

export default (name: string) => {
  console.log(name, Object.keys((global as any).window).length);
}