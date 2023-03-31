import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

export interface PatchConnection {
  // region Status-handling methods

  /**
   * Calling this will trigger an asynchronous callback to any status listeners with the patch's current state.
   * Use addStatusListener() to attach a listener to receive it.
   */
  requestStatusUpdate(): void;

  /**
   * Attaches a listener function that will be called whenever the patch's status changes. The function will be
   * called with a parameter object containing many properties describing the status, including whether the patch
   * is loaded, any errors, endpoint descriptions, its manifest, etc.
   *
   * @param listener
   */
  addStatusListener(listener: (status: any) => void): void;

  /**
   * Removes a listener that was previously added with addStatusListener()
   *
   * @param listener
   */
  removeStatusListener(listener: (status: any) => void): void;

  /**
   * Causes the patch to be reset to its "just loaded" state.
   */
  resetToInitialState(): void;

  // endregion

  // region Methods for sending data to input endpoints

  /**
   * Sends a value to one of the patch's input endpoints. This can be used to send a value to either an 'event'
   * or 'value' type input endpoint. If the endpoint is a 'value' type, then the rampFrames parameter can optionally
   * be used to specify the number of frames over which the current value should ramp to the new target one.
   * The value parameter will be coerced to the type that is expected by the endpoint. So for examples,
   * numbers will be converted to float or integer types, javascript objects and arrays will be converted into
   * more complex types in as good a fashion is possible.
   *
   * @param endpointID
   * @param value
   * @param optionalNumFrames
   */
  sendEventOrValue(endpointID: PatchConnectionEndpoint, value: any, optionalNumFrames?: any): void;

  /**
   * Sends a short MIDI message value to a MIDI endpoint.
   * The value must be a number encoded with (byte0 << 16) | (byte1 << 8) | byte2
   *
   * @param endpointID
   * @param shortMIDICode
   */
  sendMIDIInputEvent(endpointID: PatchConnectionEndpoint, shortMIDICode: number): any;

  /*
   * These are used by host applications when recording automation, indicating that the user is holding a given parameter.
   * The gesture calls must always be matched (a GestureEnd action must eventually follow a GestureStart action).
   */
  sendParameterGestureStart(endpointID: PatchConnectionEndpoint): void;

  /*
   * These are used by host applications when recording automation, indicating that the user is holding a given parameter.
   * The gesture calls must always be matched (a GestureEnd action must eventually follow a GestureStart action).
   */
  sendParameterGestureEnd(endpointID: PatchConnectionEndpoint): void;

  // endregion

  // region Stored state control methods

  /**
   * Requests a callback to any stored-state value listeners with the current value of a given key-value pair.
   * To attach a listener to receive these events, use addStoredStateValueListener().
   *
   * @param key
   */
  requestStoredStateValue(key: string): any;

  /**
   * Modifies a key-value pair in the patch's stored state.
   *
   * @param key
   * @param newValue
   */
  sendStoredStateValue(key: string, newValue: any): void;

  /**
   * Attaches a listener function that will be called when any key-value pair in the stored state is changed.
   * The listener function will receive a message parameter with properties key and value.
   *
   * @param listener
   */
  addStoredStateValueListener(listener: (storedState: any) => void): void;

  /**
   * Removes a listener that was previously added with addStoredStateValueListener().
   *
   * @param listener
   */
  removeStoredStateValueListener(listener: (storedState: any) => void): void;

  /**
   *  Applies a complete stored state to the patch. To get the current complete state, use requestFullStoredState().
   *
   * @param fullState
   */
  sendFullStoredState(fullState: any): void;

  /**
   * Asynchronously requests the full stored state of the patch. The listener function that is supplied will
   * be called asynchronously with the state as its argument.
   *
   * @param callback
   */
  requestFullStoredState(callback: (fullStoredState: any) => void): void;

  // endregion

  // region Listener methods

  /**
   * Attaches a listener function which will be called whenever an event passes through a specific endpoint.
   * This can be used to monitor both input and output endpoints.
   * The listener function will be called with an argument which is the value of the event.
   *
   * @param endpointID
   * @param listener
   */
  addEndpointEventListener(
    endpointID: PatchConnectionEndpoint,
    listener: (value: any) => void,
  ): void;

  /**
   * Removes a listener that was previously added with addEndpointEventListener()
   *
   * @param endpointID
   * @param listener
   */
  removeEndpointEventListener(
    endpointID: PatchConnectionEndpoint,
    listener: (value: any) => void,
  ): void;

  /**
   * Request the current value for a given input endpoint
   * The runtime will asynchronously call back to onParameterEndpointChanged
   *
   * @param endpointID
   */
  requestParameterValue(endpointID: PatchConnectionEndpoint): any;

  /**
   * Attaches a listener function which will be called whenever the value of a specific parameter changes. The listener
   * function will be called with an argument which is the new value.
   *
   * @param endpointID
   * @param listener
   */
  addParameterListener(endpointID: PatchConnectionEndpoint, listener: (value: any) => void): any;

  /**
   * Removes a listener that was previously added with addParameterListener()
   *
   * @param endpointID
   * @param listener
   */
  removeParameterListener(endpointID: PatchConnectionEndpoint, listener: (value: any) => void): any;

  /**
   * Attaches a listener function which will be called whenever the value of any parameter changes in the patch.
   * The listener function will be called with an argument object with the fields endpointID and value.
   *
   * @param listener
   */
  addAllParameterListener(
    listener: (args: { endpointID: PatchConnectionEndpoint; value: any }) => void,
  ): any;

  /**
   * Removes a listener that was previously added with addAllParameterListener()
   *
   * @param listener
   */
  removeAllParameterListener(
    listener: (args: { endpointID: PatchConnectionEndpoint; value: any }) => void,
  ): void;

  // region Asset handling methods

  /**
   * This takes a relative path to an asset within the patch bundle, and converts it to a path relative
   * to the root of the browser that is showing the view. You need you use this in your view code
   * to translate your asset URLs to a form that can be safely used in your view's HTML DOM (e.g. in its CSS).
   * This is needed because the host's HTTP server (which is delivering your view pages) may have a different '/'
   * root than the root of your patch (e.g. if a single server is serving multiple patch GUIs).
   *
   * @param path
   */
  getResourceAddress(path: string): string;

  // endregion
}
