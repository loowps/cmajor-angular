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

const mockPatchConnection: PatchConnection = {
  requestStatusUpdate: jest.fn(),
  addStatusListener: jest.fn(),
  removeStatusListener: jest.fn(),
  resetToInitialState: jest.fn(),
  sendEventOrValue: jest.fn(),
  sendMIDIInputEvent: jest.fn(),
  sendParameterGestureStart: jest.fn(),
  sendParameterGestureEnd: jest.fn(),
  requestStoredStateValue: jest.fn(),
  sendStoredStateValue: jest.fn(),
  addStoredStateValueListener: jest.fn(),
  removeStoredStateValueListener: jest.fn(),
  sendFullStoredState: jest.fn(),
  requestFullStoredState: jest.fn(),
  addEndpointEventListener: jest.fn(),
  removeEndpointEventListener: jest.fn(),
  requestParameterValue: jest.fn(),
  addParameterListener: jest.fn(),
  removeParameterListener: jest.fn(),
  addAllParameterListener: jest.fn(),
  removeAllParameterListener: jest.fn(),
  getResourceAddress: jest.fn(),
};

Object.defineProperty(window, 'parent', {
  value: {
    patchConnection: mockPatchConnection,
  },
});

/* output shorter and more meaningful Zone error stack traces */
// Error.stackTraceLimit = 2;
