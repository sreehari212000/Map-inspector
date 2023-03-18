import React from "react";
import { ArcRotateCamera,StandardMaterial,  FreeCamera, Vector3, HemisphericLight, MeshBuilder, Texture, Color3,} from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

function Screen({screenshot}){
    let box;

    const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
    const camera = new ArcRotateCamera("camera",
    -Math.PI / 2,
    0, 
    4, 
    Vector3.Zero(),scene
    );

  // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    camera.wheelPrecision = 100

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light", new Vector3(1, 1, -1.2), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1.4;

    // Our built-in 'box' shape.
    box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

    // Move the box upward 1/2 its height
    box.position.y = -0.2;
    const material = new StandardMaterial('material1', scene)
    material.diffuseTexture = new Texture(`${screenshot}`, scene)
    box.material = material

    };

    

    return  (
    <div className="screen">
        <SceneComponent antialias onSceneReady={onSceneReady}  id="my-canvas" />
    </div>
    );

    }

export default Screen
