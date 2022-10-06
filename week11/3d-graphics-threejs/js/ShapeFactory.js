
import * as THREE from 'three';

// You don't HAVE to do this style to create shapes
// in three.js; just demoing JS classes and static methods

class ShapeFactory {

  // Define some 'class methods', i.e. methods we can call
  // directly on the class, without creating an instance first:
  //     ShapeFactory.createPlane()
  // or in Rails ActiveRecord syntax:
  //     User.all

  static createPlane(){

    // 3D objects are buit from two elements:
    //   1. a geometry, a.k.a. a shape
    //   2. a material, a.k.a. a surface or texture/covering
    //
    // These are combined into a final "mesh"

    const planeGeometry = new THREE.PlaneGeometry( 120, 20 );
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x990022 // dark red
    });

    // Cobmine into a mesh:
    const planeMesh = new THREE.Mesh( 
      planeGeometry, 
      planeMaterial 
    );

    planeMesh.position.set( 15, 0, 0 );
    planeMesh.rotation.x = -0.5 * Math.PI;  // because of maths
    planeMesh.receiveShadow = true; // opt-in to shadow cast onto this

    return planeMesh;

  }

  
  static createCube( xSize, ySize, zSize, xPos, yPos, zPos ){

    const cubeGeometry = new THREE.BoxGeometry( xSize, ySize, zSize );

    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xFF8F00 // orangey
    });

    const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );

    cubeMesh.position.set( xPos, yPos, zPos );
    cubeMesh.castShadow = true;  // opt in to this mesh casting shadows

    return cubeMesh;

  }


  static createSphere( radius, xPos, yPos, zPos ){

    const sphereGeometry = new THREE.SphereGeometry(  
      radius, // size 
      40, // number of triangle segments on the X axis
      40, // number of triangle segments on the Y axis
    );

    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x0000FF, // blue-ish water planet
      // wireframe: true
    });

    const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphereMesh.position.set( xPos, yPos, zPos );
    sphereMesh.castShadow = true; // opt in

    return sphereMesh;

  }



} // class ShapeFactory


export default ShapeFactory;