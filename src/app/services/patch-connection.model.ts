import { PatchConnectionEndpoint } from 'src/app/services/patch-connection-endpoints.enum';

export interface PatchConnection {
  /*
   * Notify the runtime that a given input endpoint (either an event or value) should change to the given value.
   * The value will typically be a primitive number, or boolean, but it can also be a javascript object.
   * e.g. to update an endpoint of type std::timeline::Tempo, send a value like { bpm: 120.0 } and the runtime will
   * take care of converting it to a std::timeline::Tempo.
   * In the case of a value endpoint, an optional frame count can be specified, which the runtime will use to smoothly
   * interpolate between the current value and the target value.
   * If the runtime accepts the change, it will asynchronously notify the client
   * by invoking the onParameterEndpointChanged callback.
   * Typically this will be invoked multiple times when changing a UI control like a slider,
   * bookended by calls to the gesture actions described below.
   */
  sendEventOrValue: (
    endpointID: PatchConnectionEndpoint,
    value: any,
    optionalNumFrames?: any,
  ) => void;

  /*
   * These are used by host applications when recording automation, indicating that the user is holding a given parameter.
   * The gesture calls must always be matched (a GestureEnd action must eventually follow a GestureStart action).
   */
  sendParameterGestureStart: (endpointID: PatchConnectionEndpoint) => void;

  /*
   * These are used by host applications when recording automation, indicating that the user is holding a given parameter.
   * The gesture calls must always be matched (a GestureEnd action must eventually follow a GestureStart action).
   */
  sendParameterGestureEnd: (endpointID: PatchConnectionEndpoint) => void;

  /**
   * Request the current manifest and endpoint details
   * The runtime will asynchronously call back to onPatchStatusChanged
   */
  requestStatusUpdate: () => void;

  /**
   * Request the current value for a given input endpoint
   * The runtime will asynchronously call back to onParameterEndpointChanged
   *
   * @param endpointID
   */
  requestEndpointValue: (endpointID: PatchConnectionEndpoint) => any;

  /**
   * This will be called in response to a requestStatusUpdate() request, or following each recompile errorMessage
   * will contain any output from an unsuccessful compile run, or otherwise be empty patchManifest is the same
   * information specified in the cmajorpatch file inputsList and outputsList are arrays of javascript object
   * representations of the cmaj::EndpointDetails structures described in the C++ API docs. See EndpointDetails::toJSON()
   * for the specific implementation details
   *
   * @param errorMessage
   * @param patchManifest
   * @param inputList
   * @param outputList
   */
  onPatchStatusChanged: (
    errorMessage: string,
    patchManifest: any,
    inputList: any,
    outputList: any,
  ) => void;

  /**
   * This will be called following changes to the sample rate within the host, or following each recompile
   *
   * update any UI state that needs the sample rate information
   *
   * @param newSampleRate
   */
  onSampleRateChanged: (newSampleRate: number) => void;

  /**
   * This will be called following a change to an input endpoint parameter
   * (i.e. after processing a sendEventOrValue call, or from an external change via the host),
   * or following a requestEndpointValue request
   *
   * update UI state for endpoint, typically some kind of knob, slider, etc
   *
   * @param endpointID
   * @param newValue
   */
  onParameterEndpointChanged: (endpointID: PatchConnectionEndpoint, newValue: any) => void;

  /**
   * The value here can be a scalar value (a primitive number or boolean), an array, or a javascript object.
   * If the endpoint type is an aggregate / struct, the runtime will convert it to a javascript object,
   * i.e there will be a key for each field name in the struct
   *
   * update UI state for endpoint, typically some kind of visualisation
   *
   * @param endpointID
   * @param newValue
   */
  onEndpointEvent: (endpointID: string, newValue: any) => void;
}
