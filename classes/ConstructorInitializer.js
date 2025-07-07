class ConstructorInitializer {
  canvasDOM = null;
  engine = null;
  scene = null;
  camera = null;
  light = null;
  ground = null;

  constructor(groundSize) {
    this.#initCanvas();
    this.#initEngine();
    this.#initScene(groundSize);
    this.#run();

    return [this.canvasDOM, this.engine, this.scene, this.camera, this.light, this.ground];
  }

  #initCanvas() {
    this.canvasDOM = document.getElementById("renderCanvas");
  }

  #initEngine() {
    this.engine = new BABYLON.Engine(this.canvasDOM, true);
  }

  #initScene(groundSize) {
    this.scene = new BABYLON.Scene(this.engine);

    // Камера
    this.camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 3, Math.PI / 3, 20, BABYLON.Vector3.Zero(), this.scene);
    this.camera.attachControl(this.canvasDOM, true);

    // Свет
    this.light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
    this.light.intensity = 0.9;

    // Плоскость (земля)
    this.#showGround(groundSize);
  }

  #showGround(groundSize) {
    this.ground = BABYLON.MeshBuilder.CreateGround("ground", { width: groundSize, height: groundSize }, this.scene);
    this.ground.position.y = -0.5;
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
