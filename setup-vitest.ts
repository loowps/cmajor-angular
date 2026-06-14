import { PatchConnection } from 'src/app/services/patch-connection.model';
import { vi } from 'vitest';

const mock = () => {
  let storage: Record<string, string> = {};
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
  requestStatusUpdate: vi.fn(),
  addStatusListener: vi.fn(),
  removeStatusListener: vi.fn(),
  resetToInitialState: vi.fn(),
  sendEventOrValue: vi.fn(),
  sendMIDIInputEvent: vi.fn(),
  sendParameterGestureStart: vi.fn(),
  sendParameterGestureEnd: vi.fn(),
  requestStoredStateValue: vi.fn(),
  sendStoredStateValue: vi.fn(),
  addStoredStateValueListener: vi.fn(),
  removeStoredStateValueListener: vi.fn(),
  sendFullStoredState: vi.fn(),
  requestFullStoredState: vi.fn(),
  addEndpointListener: vi.fn(),
  removeEndpointListener: vi.fn(),
  requestParameterValue: vi.fn(),
  addParameterListener: vi.fn(),
  removeParameterListener: vi.fn(),
  addAllParameterListener: vi.fn(),
  removeAllParameterListener: vi.fn(),
  getResourceAddress: vi.fn(),
};

Object.defineProperty(window, 'parent', {
  value: {
    patchConnection: mockPatchConnection,
  },
});

/* output shorter and more meaningful Zone error stack traces */
// Error.stackTraceLimit = 2;
