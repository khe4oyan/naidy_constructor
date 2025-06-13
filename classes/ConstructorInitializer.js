import Cube from "./Cube.js";

class ConstructorInitializer {
  canvasDOM = null;
  engine = null;
  scene = null;

  constructor(groundW, groundH) {
    this.#initCanvas();
    this.#initEngine();
    this.#initScene(groundW, groundH);
    this.#run();

    return [this.canvasDOM, this.engine, this.scene];
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
    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 3, Math.PI / 3, 20, BABYLON.Vector3.Zero(), this.scene);
    camera.attachControl(this.canvasDOM, true);

    // Свет
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);
    light.intensity = 0.9;

    // Плоскость (земля)
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: groundW, height: groundH }, this.scene);
    ground.position.y = -.5;
    Cube.applyTextureWithFixedPixelSize(ground, "../assets/textures/blueprint.png", 10000);
  }

  #run() {
    // this.#runObjectOnClickHandler();
    this.#runRender();
    this.#runOnResizeHandler();
  }

  // #runObjectOnClickHandler() {
  //   this.scene.onPointerObservable.add((pointerInfo) => {
  //     if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
  //       const pickedMesh = pointerInfo.pickInfo.pickedMesh;
  //       if (pickedMesh?.name === "box") {
  //         // Здесь можно добавить любое действие при клике по кубу
  //       }
  //     }
  //   });
  // }

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
