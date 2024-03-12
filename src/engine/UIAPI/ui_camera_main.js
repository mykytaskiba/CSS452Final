/*
*   File: ui_camera_main.js
*   Same thing as a normal camera, however it does not clear the background, making it usable for UI
*/

import Camera from "../cameras/camera_main.js";
import { eViewport } from "../cameras/camera_main.js";
import * as glSys from "../core/gl.js";

//Same thing as camera except does not do clear buffer bit
class UICamera extends Camera {

    // call before you start drawing with this camera
    setViewAndCameraMatrix() {
        let gl = glSys.get();
        // Step A1: Set up the viewport: area on canvas to be drawn
        gl.viewport(this.mViewport[0],  // x position of bottom-left corner of the area to be drawn
            this.mViewport[1],  // y position of bottom-left corner of the area to be drawn
            this.mViewport[2],  // width of the area to be drawn
            this.mViewport[3]); // height of the area to be drawn
        // Step A2: set up the corresponding scissor area to limit the clear area
        gl.scissor(this.mScissorBound[0], // x position of bottom-left corner of the area to be drawn
            this.mScissorBound[1], // y position of bottom-left corner of the area to be drawn
            this.mScissorBound[2], // width of the area to be drawn
            this.mScissorBound[3]);// height of the area to be drawn

        // Step A3: set the color to be clear

        //SKIP THIS LINE, DO NOT SET A CLEAR COLOR
        //gl.clearColor(this.mBGColor[0], this.mBGColor[1], this.mBGColor[2], this.mBGColor[3]);  // set the color to be cleared
        
        // Step A4: enable the scissor area, clear, and then disable the scissor area
        //gl.enable(gl.SCISSOR_TEST);
        //gl.clear(gl.COLOR_BUFFER_BIT);
        //gl.disable(gl.SCISSOR_TEST);

        // Step B: Compute the Camera Matrix
        let center = [];
        if (this.mCameraShake !== null) {
            center = this.mCameraShake.getCenter();
        } else {
            center = this.getWCCenter();
        }

        // Step B1: following the translation, scale to: (-1, -1) to (1, 1): a 2x2 square at origin
        mat4.scale(this.mCameraMatrix, mat4.create(), vec3.fromValues(2.0 / this.getWCWidth(), 2.0 / this.getWCHeight(), 1.0 / this.kCameraZ));

        // Step B2: first operation to perform is to translate camera center to the origin
        mat4.translate(this.mCameraMatrix, this.mCameraMatrix, vec3.fromValues(-center[0], -center[1], -this.kCameraZ/2.0));
        
        // Step B3: compute and cache per-rendering information
        this.mRenderCache.mWCToPixelRatio = this.mViewport[eViewport.eWidth] / this.getWCWidth();
        this.mRenderCache.mCameraOrgX = center[0] - (this.getWCWidth() / 2);
        this.mRenderCache.mCameraOrgY = center[1] - (this.getWCHeight() / 2);
        let p = this.wcPosToPixel(this.getWCCenter());
        this.mRenderCache.mCameraPosInPixelSpace[0] = p[0];
        this.mRenderCache.mCameraPosInPixelSpace[1] = p[1];
        this.mRenderCache.mCameraPosInPixelSpace[2] = this.fakeZInPixelSpace(this.kCameraZ);
    }

}

export default UICamera;