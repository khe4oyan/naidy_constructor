import ConstructorInitializer from "./ConstructorInitializer.js";
import Cube from "./Cube.js";

class Constructor {
  canvasDOM = null;
  engine = null;
  scene = null;
  cubes = null;

  constructor(groundW, groundH) {
    const [canvasDOM, engine, scene] = new ConstructorInitializer(groundW, groundH);
    this.canvasDOM = canvasDOM;
    this.engine = engine;
    this.scene = scene;
    this.cubes = new Map();
  }

  newCube(x, y, z, neighborSide = null, neighborCubeRef = null) {
    const cube = new Cube(x, y, z, neighborSide, neighborCubeRef);
    this.cubes.set(cube.cubeName, cube);
  }
};

export default Constructor;
