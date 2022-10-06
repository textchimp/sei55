
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'; // basically dat.gui

import ShapeFactory from './ShapeFactory';

// function hello(){
// }
// 
// 
// const hello = function(){
// };



class Universe {
  
  // animation controls (for UI interaction)
  controls = {
    rotationSpeed: 0.02,
    counter: 0,
    counterStep: 0.03, // how fast the counter grows
  }

  // constructor(){}
  

  // Needs to be an arrow-function method because we are
  // using it as an event handler (DOM ready handler)
  init = () => {
    console.log('init()', this);
    this.initThree();
    this.addShapes();
    this.animate();   // start animation loop 
  }

  initThree(){
    // We always need to define 5 things at minimum for
    // our 3D universe
    //   *  a scene, i.e. space
    //   *  a camera, i.e. an observer, a perspective
    //   *  a renderer, i.e. time
    //   *  lights
    //   *  some objects to look at

    this.gui = new GUI();
    this.gui.add(this.controls, 'rotationSpeed', 0, 0.2);
    this.gui.add(this.controls, 'counterStep', 0, 0.1).name('Sine wave speed');


    // instance variable for storing the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      60, // field of view angle
      window.innerWidth / window.innerHeight, // screen aspect ratio
      0.1, // near field: how close objects can get before ignoring
      1000 // far field: how far away before ignoring
    );

    // Where is the camera in the scene?
    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    // this.camera.position.set( -30, 40, 30 );
    this.camera.lookAt( this.scene.position ); // look at origin

    // Use the GPU (graphics card/hardware acceleration)
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: document.querySelector('#app')
    });

    this.renderer.setSize( window.innerWidth, window.innerHeight );


    // Shadows are computationally expensive, so they are disabled
    // by default - you have to opt in
    this.renderer.shadowMap.enabled = true;
    // TODO: extra shadow config line?


    // Let there be light!
    this.spotlight = new THREE.SpotLight( 0xFFFFFF );
    this.spotlight.position.set( -10, 60, 10 ); // x, y, z
    this.spotlight.castShadow = true;
    // TODO - shadow size?
    this.scene.add( this.spotlight );


    // Create an "axes helper", for orientation debugging
    this.axesHelper = new THREE.AxesHelper( 50 );
    this.scene.add( this.axesHelper );

    // Mouse controls for camera position and zoom level
    this.mouseControls = new OrbitControls( 
      this.camera,
      this.renderer.domElement 
    );


  }


  addShapes(){

    this.shapes = {}; //container for all our shapes
    
    this.shapes.plane = ShapeFactory.createPlane();
    this.scene.add( this.shapes.plane );

    // TODO: homework - MANY cubes instead of one, 
    // at random positions, with random sizes and colours... random rotations?
    // 
    // this.shapes.cubes = [];
    // THREE.MathUtils.randInt( -100, 100 )
    this.shapes.cube = ShapeFactory.createCube( 
      4, 4, 4,   // x,y,z size
      -4, 15, 0  // x,y,z position
    );
    this.scene.add( this.shapes.cube );


    this.shapes.sphere = ShapeFactory.createSphere(
      6, // radius
      10, 6, 5  // x,y,z pos
    );
    this.scene.add( this.shapes.sphere );


  }

  // Need an arrow function here too, because we are
  // essentially giving this animation method to
  // requestAnimationFrame as an event handler,
  // and it will forget its 'this' context otherwise
  animate = () => {

    // update the counter used for the sin() calculation
    this.controls.counter += this.controls.counterStep;

    // console.log('sin:', Math.sin(this.controls.counter) );
    this.shapes.sphere.position.x = 10 +  ( Math.sin(this.controls.counter) * 20 ); 
    this.shapes.sphere.position.y = 6  +  Math.abs( Math.cos(this.controls.counter) * 20 ); 


    // this.shapes.cube.position.x += 1;
    this.shapes.cube.rotation.x += this.controls.rotationSpeed;
    this.shapes.cube.rotation.y += this.controls.rotationSpeed;

    this.renderer.render( this.scene, this.camera );

    // TODO: animation loop instead of one-off

    // Get the browser to work out when to do the next
    // render, so we get a smooth 60 frames/sec
    requestAnimationFrame( this.animate );

  }


} // class Universe


// Make an object from the class
const app = new Universe();

// app.scene

// For debugging: attach a variable to the 
// browser's global scope object
window.app = app;

// DOM ready handler
window.addEventListener('DOMContentLoaded', app.init );

