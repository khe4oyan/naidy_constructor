import ConstructorInitializer from "./ConstructorInitializer.js";
import Cube from "./Cube.js";

class Constructor {
  static STATES = {
    select: "STATES_select",
    addCube: "STATES_addCube",
  };

  canvasDOM = null;
  engine = null;
  scene = null;
  state = null;
  cubes = null;

  constructor(groundW, groundH) {
    const [canvasDOM, engine, scene] = new ConstructorInitializer(groundW, groundH);
    this.canvasDOM = canvasDOM;
    this.engine = engine;
    this.scene = scene;
    this.state = Constructor.STATES.select;
    this.cubes = new Map();
    this.#cubeClickInit();
  }

  #cubeClickInit() {
    this.scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
        const pickInfo = pointerInfo.pickInfo;

        // state - select
        // state - 
      }
    });
  }

  newCube(x, y, z, neighborSide = null, neighborCubeRef = null) {
    const cube = new Cube(x, y, z, neighborSide, neighborCubeRef, this);
    this.cubes.set(cube.cubeName, cube);
    return cube.cubeName;
  }
};

export default Constructor;
