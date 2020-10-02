import React from "react";
import * as THREE from "three";
import mars from "../textures/mars.jpg";
import bg from "../textures/bg.jpg";
const Landing = () => {
  React.useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var loader = new THREE.TextureLoader().load(mars);

    var loaderBg = new THREE.TextureLoader().load(bg);

    scene.background = loaderBg;
    console.log(loader);

    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshBasicMaterial({ map: loader });

    var earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    camera.position.z = 5;

    let x = 0;
    let y = 0;
    var animate = function () {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  });
  return <div></div>;
};

export default Landing;
