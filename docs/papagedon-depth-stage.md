# PAPAGEDON depth stage and FastDepth integration

## Current browser implementation

`components/papagedon/DepthStudio.tsx` is a client-only WebGL2 stage layered over the normal PAPAGEDON shader canvas. It uploads an image and a grayscale depth texture, fits the image without cropping for the current viewport aspect ratio, and displaces samples according to pointer position. The existing audio analysis drives the depth pulse and edge light. UI sliders update uniforms through refs, so dragging a slider does not rebuild the WebGL context.

The current depth texture is a deliberately simple local luminance relief preview. It does not identify objects or infer semantic/metric depth. Images are read locally, limited to 18 MB, and object URLs are released when replaced or when the stage closes.

## FastDepth repository findings

The MIT repository at <https://github.com/dwofk/fast-depth> is research code rather than a packaged browser inference library. Its README documents an older PyTorch 0.4.1 + CUDA development setup, a trained MobileNet encoder with a pruned depthwise-separable decoder and additive skip connections, and a TX2 deployment path using precompiled TVM artifacts/runtime. The checked-in deployment example prepares a 224×224 RGB float32 tensor in NCHW layout and reads a 1×1×224×224 prediction. The source requires the copyright/license notice to accompany redistributed source or substantial portions.

This repo does not include trained weights, ONNX/WebGPU exports, the TVM runtime, or a browser inference service. Therefore the stage must not claim it is currently running FastDepth. A real model provider can implement `DepthModelProvider` in `lib/papagedon/depthModel.ts`, return a normalized grayscale map (`nearIsWhite`), and upload that map to the existing depth texture. The WebGL shader and controls do not need to change.

## FastDepth adapter contract

1. Decode the selected local image to an `ImageBitmap`.
2. Preserve aspect ratio while preparing the model's documented 224×224 RGB input (padding/cropping policy must match training preprocessing and be checked against model examples).
3. Normalize RGB values exactly as expected by the chosen exported checkpoint; the original repo's training transform/checkpoint must be verified before finalizing this step.
4. Run inference in a Worker or supported browser GPU backend. Exporting the old PyTorch checkpoint to ONNX/WebGPU is a separate model-conversion task and requires an actual compatible checkpoint.
5. Normalize the one-channel prediction to a grayscale `DepthMap`, upload it as an `R8` texture, and retain the local relief preview if model load/inference fails.

FastDepth predicts monocular depth from one view. It does not generate hidden surfaces or a complete 3D asset. The interactive parallax effect is a depth-image illusion and should be described that way in product UI.
