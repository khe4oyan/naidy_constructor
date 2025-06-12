import ConstructorInitializer from "./ConstructorInitializer.js";

class Constructor {
  canvasDOM = null;
  engine = null;
  scene = null;

  constructor(groundW, groundH) {
    const [canvasDOM, engine, scene] = new ConstructorInitializer(groundW, groundH);
    this.canvasDOM = canvasDOM;
    this.engine = engine;
    this.scene = scene;
  }
};

export default Constructor;
