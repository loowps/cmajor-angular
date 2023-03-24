/* global mocks for jsdom */
import { PatchConnection } from 'src/app/services/patch-connection.model';

const mock = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

const mockPatchConnection: PatchConnection = {
  onEndpointEvent: jest.fn(),
  onPatchStatusChanged: jest.fn(),
  onSampleRateChanged: jest.fn(),
  requestStatusUpdate: jest.fn(),
  sendEventOrValue: jest.fn(),
  sendParameterGestureEnd: jest.fn(),
  sendParameterGestureStart: jest.fn(),
  requestEndpointValue: jest.fn(),
  onParameterEndpointChanged: jest.fn(),
};

Object.defineProperty(window, 'parent', {
  value: {
    patchConnection: mockPatchConnection,
  },
});

/* output shorter and more meaningful Zone error stack traces */
// Error.stackTraceLimit = 2;
