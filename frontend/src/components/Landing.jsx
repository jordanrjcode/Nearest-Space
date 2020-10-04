// import React, { createElement } from "react";
// import * as THREE from "three";
// import { connect } from "react-redux";
// import SectionCard from "./sectionCard";
// import Card from "./Card";
// import "./Landing.css";

// import mars from "../textures/mars.jpg";
// import bg from "../textures/bg.jpg";
// import sun from "../textures/sun.jpg";
// import earth from "../textures/earth.jpg";
// import lensflare0 from "../textures/lensflare0.png";
// import lensflare3 from "../textures/lensflare3.png";
// import disc from "../textures/disc.png";
// import mercurio from "../textures/mercurio.jpg";
// import venus from "../textures/venus.jpg";

// import {
//   Lensflare,
//   LensflareElement,
// } from "three/examples/jsm/objects/Lensflare";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import Background from "./Background";
// class Landing extends React.Component {
//   constructor(props) {
//     super(props);
//     /*this.props.infor.photo_manifest = []
//     this.props.infor.photos = []*/
//   }

//   /*  componentWillMount() {
//       this.props.showCamera()

//     }
//   */

//   componentDidMount() {
//     // === THREE.JS CODE START ===
//     var raycaster = new THREE.Raycaster();
//     var mouse = new THREE.Vector2();

//     //escena
//     var scene = new THREE.Scene();

//     //textura
//     var loaderBg = new THREE.TextureLoader().load(bg);
//     scene.background = loaderBg;
//     scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);

//     //camara principal
//     var camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );

//     this.ligthSun(scene);

//     //renderizado
//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);
//     //crear sol
//     //textura del sol
//     var loader = new THREE.TextureLoader();

//     var geometry = new THREE.SphereGeometry(1, 32, 32);
//     var material = new THREE.MeshBasicMaterial({ map: loader.load(sun) });
//     var sunMat = new THREE.Mesh(geometry, material);
//     sunMat.scale.set(65, 65, 65);
//     sunMat.name = "SUN";
//     scene.add(sunMat);

//     var control = new OrbitControls(camera, renderer.domElement);
//     //crear mercurio
//     var moonScale = 0.23;
//     const mercurioX = 90;
//     var materialMercurio = new THREE.MeshBasicMaterial({
//       map: loader.load(mercurio),
//     });
//     var mashMercurio = new THREE.Mesh(geometry, materialMercurio);
//     mashMercurio.position.set(mercurioX, 0, 0);
//     mashMercurio.scale.set(2.4, 2.4, 2.4);
//     mashMercurio.name = "MERCURIO";
//     scene.add(mashMercurio);

//     //crear Venus
//     const venusX = 120;
//     var materialVenus = new THREE.MeshBasicMaterial({
//       map: loader.load(venus),
//     });
//     var meshVenus = new THREE.Mesh(geometry, materialVenus);
//     meshVenus.position.set(venusX, 0, 0);
//     meshVenus.scale.set(6.05, 6.05, 6.05);
//     meshVenus.name = "VENUS";
//     scene.add(meshVenus);
//     //crear tierra
//     const earthX = 200;
//     var materialEarth = new THREE.MeshBasicMaterial({
//       map: loader.load(earth),
//     });
//     var meshEarth = new THREE.Mesh(geometry, materialEarth);
//     meshEarth.position.set(earthX, 0, 0);
//     meshEarth.scale.set(6.3, 6.3, 6.3);
//     meshEarth.name = "EARTH";
//     scene.add(meshEarth);
//     //crear marte
//     //textura de marte
//     const marsX = 250;
//     var materialMars = new THREE.MeshBasicMaterial({
//       map: loader.load(mars),
//     });
//     var meshMars = new THREE.Mesh(geometry, materialMars);
//     meshMars.position.set(marsX, 0, 0);
//     meshMars.scale.set(3.38, 3.38, 3.38);
//     meshMars.name = "MARS";
//     scene.add(meshMars);

//     //posicion de la camara
//     camera.position.z = 100;

//     this.clickELement(renderer, camera, scene, raycaster, mouse);
//     var particulas = this.starts(scene);

//     //animacion
//     var i = 0;
//     var a = 0;
//     var animate = function () {
//       requestAnimationFrame(animate);
//       raycaster.setFromCamera(mouse, camera);
//       sunMat.rotation.y += 0.001;
//       meshEarth.rotation.y += 0.0001;
//       meshMars.rotation.y += 0.01;
//       mashMercurio.rotation.y += 0.01;
//       meshEarth.position.set(Math.cos(a) * earthX, 0, Math.sin(a) * earthX);
//       meshMars.position.set(Math.cos(i) * marsX, 0, Math.sin(i) * marsX);
//       mashMercurio.position.set(
//         Math.cos(i) * mercurioX,
//         0,
//         Math.sin(i) * mercurioX
//       );
//       meshVenus.position.set(Math.cos(i) * venusX, 0, Math.sin(i) * venusX);

//       a += 0.0001;
//       i += 0.0001;
//       renderer.render(scene, camera);
//     };

//     animate();
//   }

//   renderInfo() {
//     console.log(this.props.infor.photo_manifest);

//     const style = {
//       backgroundImage:
//         "url('http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631280503688E0B_DXXX.jpg')",
//     };
//     const style2 = {
//       backgroundImage:
//         "url('https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631200503680E0C_DXXX.jpg')",
//     };
//     return (
//       <ul>
//         <li>
//           <Card
//             title={
//               this.props.infor.photo_manifest.total_photos +
//               " Fotos cauradas por la NASA"
//             }
//             image_url="http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631280503688E0B_DXXX.jpg"
//           />
//         </li>
//         <li>
//           <Card
//             title="terrestre equivale a un año en marte"
//             image_url="http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631280503688E0B_DXXX.jpg"
//           />
//         </li>
//       </ul>
//     );
//   }

//   ligthSun(scene) {
//     //luces
//     var textureLoader = new THREE.TextureLoader();

//     var textureFlare0 = textureLoader.load(lensflare0);
//     var textureFlare3 = textureLoader.load(lensflare3);
//     addLight(0.08, 0.9, 0.5, 0, 0, 0);
//     addLight(0.08, 2, 0.5, 0, 0, 0);
//     addLight(0.995, 0.5, 0.9, 0, 0, 0);
//     addLight(0.995, 0.5, 0.9, 0, 0, 0);
//     addLight(0.995, 0.5, 0.9, 0, 0, 0);
//     addLight(0.995, 0.5, 0.9, 0, 0, 0);
//     addLight(0.08, 2, 0.5, 0, 0, 0);
//     addLight(0.08, 2, 0.5, 0, 0, 0);
//     addLight(0.08, 2, 0.5, 0, 0, 0);

//     function addLight(h, s, l, x, y, z) {
//       var light = new THREE.PointLight(0xffffff, 1, 100);
//       light.color.setHSL(h, s, l);
//       light.position.set(x, y, z);
//       scene.add(light);

//       var lensflare = new Lensflare();
//       lensflare.addElement(
//         new LensflareElement(textureFlare0, 700, 0, light.color)
//       );
//       lensflare.addElement(new LensflareElement(textureFlare3, 20, 0.6));
//       lensflare.addElement(new LensflareElement(textureFlare3, 50, 0.7));
//       lensflare.addElement(new LensflareElement(textureFlare3, 20, 0.9));
//       lensflare.addElement(new LensflareElement(textureFlare3, 20, 1));
//       light.add(lensflare);
//     }
//   }

//   starts(scene) {
//     var geometry = new THREE.BufferGeometry();
//     var vertices = [];

//     var sprite = new THREE.TextureLoader().load(disc);

//     for (var i = 0; i < 10000; i++) {
//       var x = 2000 * Math.random() - 1000;
//       var y = 2000 * Math.random() - 1000;
//       var z = 2000 * Math.random() - 1000;

//       vertices.push(x, y, z);
//     }
//     geometry.setAttribute(
//       "position",
//       new THREE.Float32BufferAttribute(vertices, 3)
//     );

//     var material = new THREE.PointsMaterial({
//       size: 5,
//       sizeAttenuation: false,
//       map: sprite,
//       alphaTest: 0.5,
//       transparent: true,
//     });
//     material.color.setHSL(198, 99, 50);
//     var particles = new THREE.Points(geometry, material);
//     scene.add(particles);
//     return particles;
//   }

//   clickELement(renderer, camera, scene, raycaster, mouse) {
//     window.addEventListener("resize", () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.render(scene, camera);
//     });

//     var i = 0;
//     window.addEventListener("mousemove", (e) => {
//       mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
//       var intersects = raycaster.intersectObjects(scene.children);

//       for (i = 0; i < intersects.length; i++) {
//         var bool = false;

//         if (intersects[i].object.name == "MARS") {
//           if (!bool) {
//             console.log("true");
//             intersects[i].object.material.color.set(0xff0000);
//             var x = intersects[i].object.position.x;
//             var y = intersects[i].object.position.y;
//             camera.position.x = x;
//             camera.position.z = 10;
//             var geometry = new THREE.BoxGeometry(20, 40, 1);
//             var material = new THREE.MeshBasicMaterial({ colorWrite: 0xff5f4 });

//             bool = true;
//           }
//         } else {
//         }
//       }
//       intersects = null;
//     });
//   }

//   render() {
//     return (
//       <div className="container">
//         <br></br>
//         <br></br> <br></br>
//         <br></br>
//         {this.renderInfo()}
//       </div>
//     );
//   }
// }

// export default Landing;

// /*
// function mapStateToProps(state) {
//   return {

//     infor: state.info.list
//   }
// }

// export default connect(mapStateToProps, { showCamera })(Landing)
// */
