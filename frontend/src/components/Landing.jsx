import React, { createElement } from "react";
import * as THREE from "three";
import { connect } from "react-redux";

import "./Card.css";
import { showInfo } from "../action/dataApi";

import mars from "../textures/mars.jpg";
import bg from "../textures/bg.jpg";
import sun from "../textures/sun.jpg";
import earth from "../textures/earth.jpg";
import lensflare0 from "../textures/lensflare0.png";
import lensflare3 from "../textures/lensflare3.png";
import disc from "../textures/disc.png";
import mercurio from "../textures/mercurio.jpg";
import venus from "../textures/venus.jpg";

import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Card from "./Card";
import Background from "./Background";
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.props.infor.photos = [];
  }

  componentWillMount() {
    this.props.showInfo();
  }

  renderInfo() {
    return this.props.infor.photos.map((i) => {
      console.log(i);
      var bg = { backgroundImage: "url(" + i.img_src + ")" };
      return (
        <div className="col p-3">
          <Card
            style={i.img_src}
            section={i.full_name}
            title={i.earth_date}
            description={i.camera.full_name}
          />
        </div>
      );
    });
  }

  ligthSun(scene) {
    //luces
    var textureLoader = new THREE.TextureLoader();

    var textureFlare0 = textureLoader.load(lensflare0);
    var textureFlare3 = textureLoader.load(lensflare3);
    addLight(0.08, 0.9, 0.5, 0, 0, 0);
    addLight(0.08, 2, 0.5, 0, 0, 0);
    addLight(0.995, 0.5, 0.9, 0, 0, 0);
    addLight(0.995, 0.5, 0.9, 0, 0, 0);
    addLight(0.995, 0.5, 0.9, 0, 0, 0);
    addLight(0.995, 0.5, 0.9, 0, 0, 0);
    addLight(0.08, 2, 0.5, 0, 0, 0);
    addLight(0.08, 2, 0.5, 0, 0, 0);
    addLight(0.08, 2, 0.5, 0, 0, 0);

    function addLight(h, s, l, x, y, z) {
      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.color.setHSL(h, s, l);
      light.position.set(x, y, z);
      scene.add(light);

      var lensflare = new Lensflare();
      lensflare.addElement(
        new LensflareElement(textureFlare0, 700, 0, light.color)
      );
      lensflare.addElement(new LensflareElement(textureFlare3, 20, 0.6));
      lensflare.addElement(new LensflareElement(textureFlare3, 50, 0.7));
      lensflare.addElement(new LensflareElement(textureFlare3, 20, 0.9));
      lensflare.addElement(new LensflareElement(textureFlare3, 20, 1));
      light.add(lensflare);
    }
  }

  starts(scene) {
    var geometry = new THREE.BufferGeometry();
    var vertices = [];

    var sprite = new THREE.TextureLoader().load(disc);

    for (var i = 0; i < 10000; i++) {
      var x = 2000 * Math.random() - 1000;
      var y = 2000 * Math.random() - 1000;
      var z = 2000 * Math.random() - 1000;

      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    var material = new THREE.PointsMaterial({
      size: 5,
      sizeAttenuation: false,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
    });
    material.color.setHSL(198, 99, 50);
    var particles = new THREE.Points(geometry, material);
    scene.add(particles);
    return particles;
  }

  clickELement(renderer, camera, scene, raycaster, mouse) {
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    });

    var i = 0;
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      var intersects = raycaster.intersectObjects(scene.children);

      for (i = 0; i < intersects.length; i++) {
        var bool = false;

        if (intersects[i].object.name == "MARS") {
          if (!bool) {
            console.log("true");
            intersects[i].object.material.color.set(0xff0000);
            var x = intersects[i].object.position.x;
            var y = intersects[i].object.position.y;
            camera.position.x = x;
            camera.position.z = 10;
            var geometry = new THREE.BoxGeometry(20, 40, 1);
            var material = new THREE.MeshBasicMaterial({ colorWrite: 0xff5f4 });

            bool = true;
          }
        } else {
        }
      }
      intersects = null;
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row p-5">{this.renderInfo()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    infor: state.info.list,
  };
}

export default connect(mapStateToProps, { showInfo })(Landing);
