import ConstructorInitializer from "./constructorInitializer.js";
import Cube from "./Cube.js";

class Constructor {
  static STATES = {
    neitral: "STATES_neitral",
    select: "STATES_select",
    addCube: "STATES_addCube",
  };

  canvasDOM = null;
  engine = null;
  scene = null;
  state = null;
  camera = null;
  light = null;

  constructor(groundW, groundH) {
    const [canvasDOM, engine, scene, camera, light] = new ConstructorInitializer(groundW, groundH);
    this.canvasDOM = canvasDOM;
    this.engine = engine;
    this.scene = scene;
    this.state = Constructor.STATES.neitral;
    this.camera = camera;
    this.light = light;
    this.#cubeClickInit();
  }

  #cubeClickInit() {
    this.scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
        const pickInfo = pointerInfo.pickInfo;
        console.log(pickInfo);
        // state - select
      }
    });
  }

  newCube(x, y, z, neighborSide = null) {
    const cube = new Cube(x, y, z, neighborSide, this);
    return cube.cubeName;
  }
};

export default Constructor;
