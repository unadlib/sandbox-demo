import { NodeVM } from 'vm2';
import { transform } from '@babel/core';
import * as app from '../src';
import config from '../babel.config';

global.bar = {};

test('test sandbox', () => {
  const mockWindow = {};
  const vm = new NodeVM({
    console: 'inherit',
    sandbox: {
      // ...global,
      window: mockWindow,
    },
    compiler: (code) => transform(code, config).code,
    sourceExtensions: ['ts', 'tsx', 'js', 'jsx'],
    require: {
      // builtin: ["path"],
      builtin: ["*"],
      context: 'sandbox',
      external: true,
      mock: {
        './bar': require('../src/bar'), // mock without sandbox context
      }
    }
  });
  const { foo } = vm.run("module.exports = require('../src')", __filename);
  expect(app.foo() === mockWindow).toBeFalsy(); // app.foo() is JSDOM's window.
  expect(foo() === mockWindow).toBeTruthy();
});
