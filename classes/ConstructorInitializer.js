import Cube from "./Cube.js";

class ConstructorInitializer {
  canvasDOM = null;
  engine = null;
  scene = null;
  camera = null;
  light = null;

  constructor(groundW, groundH) {
    this.#initCanvas();
    this.#initEngine();
    this.#initScene(groundW, groundH);
    this.#run();

    return [this.canvasDOM, this.engine, this.scene, this.camera, this.light];
  }

  #initCanvas() {
    this.canvasDOM = document.getElementById("renderCanvas");
  }

  #initEngine() {
    this.engine = new BABYLON.Engine(this.canvasDOM, true);
  }

  #initScene(groundW, groundH) {
    this.scene = new BABYLON.Scene(this.engine);

    // Камера
    this.camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 3, Math.PI / 3, 20, BABYLON.Vector3.Zero(), this.scene);
    this.camera.attachControl(this.canvasDOM, true);

    // Свет
    this.light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
    this.light.intensity = 0.9;

    // Плоскость (земля)
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: groundW, height: groundH }, this.scene);
    ground.position.y = -0.5
    Cube.applyTextureWithFixedPixelSize(ground, "../assets/textures/blueprint.png", 10000);
  }

  #run() {
    this.#runRender();
    this.#runOnResizeHandler();
  }

  #runRender() {
    // Запускаем рендер
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  #runOnResizeHandler() {
    // Обработка ресайза окна
    window.addEventListener("resize", function () {
      this.engine.resize();
    });
  }
};

export default ConstructorInitializer;
