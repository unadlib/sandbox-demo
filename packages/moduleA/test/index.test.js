import { NodeVM } from 'vm2';
import { transform } from '@babel/core';
import * as app from '../src';
import config from '../../../babel.config';

global.bar = {};

test('test sandbox', () => {
  const mockWindow = {};
  const vmConfig = {
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
  };
  const appSandboxInstance0 = new NodeVM(vmConfig).run("module.exports = require('../src')", __filename);
  const appSandboxInstance1 = new NodeVM(vmConfig).run("module.exports = require('../src')", __filename);
  expect(app.foo('app') === mockWindow).toBeFalsy(); // app.foo() is JSDOM's window.
  expect(appSandboxInstance0.foo('appSandboxInstance0') === mockWindow).toBeTruthy();
  expect(appSandboxInstance1.foo('appSandboxInstance1') === mockWindow).toBeTruthy();
  expect(appSandboxInstance0 === appSandboxInstance1).toBeFalsy();
});
