export const APP_ID = "99999999-9999-9999-9999-999999999999";  // Application ID.
export const ENABLE_MEASURE_ENV = true;  // Whether analyze measurement environment or not.
export const ENABLE_FACE = true;  // Whether detect face or not.
export const ENABLE_FACIAL_LANDMARK = true;  // Whether detect facial landmark or not. If enableFace is false, it is also automatically set to false.
export const ENABLE_FACIAL_ACTION_UNIT = true;  // Whether analyze facial action unit or not. If enableFace or enableFacialLandmark is false, it is also automatically set to false.
export const ENABLE_BASIC_FACIAL_EXPRESSION = true;  // Whether recognize basic facial expression or not. If enableFace is false, it is also automatically set to false.
export const ENABLE_VALENCE_FACIAL_EXPRESSION = true;  // Whether recognize valence facial expression or not. If enableFace is false, it is also automatically set to false.
export const FPS = 30;  // Frame per second.

export const body = document.querySelector("body");