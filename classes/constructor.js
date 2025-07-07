import ConstructorInitializer from "./constructorInitializer.js";
import Cube from "./Cube.js";

class Constructor {
  canvasDOM = null;
  engine = null;
  scene = null;
  camera = null;
  light = null;
  ground = null;
  cubes = null;
  selectedMesh = null;
  gizmoManager = null;

  constructor(groundSize) {
    const [canvasDOM, engine, scene, camera, light, ground] = new ConstructorInitializer(groundSize);
    this.canvasDOM = canvasDOM;
    this.engine = engine;
    this.scene = scene;
    this.camera = camera;
    this.light = light;
    this.ground = ground;
    this.cubes = [];

    this.gizmoManager = new BABYLON.GizmoManager(scene);
    this.#cubeClickInit();
    this.#showGrid(groundSize);
  }

  #cubeClickInit() {
    this.scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERTAP) {
        const meshData = pointerInfo?._pickInfo?.pickedMesh;
        this.gizmoManager.positionGizmoEnabled = false;

        if (meshData?.name !== "ground" && this.#isMovableMesh(meshData)) {
          this.newSelectedMesh(meshData);
          this.gizmoManager.attachToMesh(this.selectedMesh);
          this.gizmoManager.positionGizmoEnabled = true;
        } else {
          this.newSelectedMesh(null);
        }
      }
    });
  }

  #isMovableMesh(meshData) {
    for (let i = 0; i < this.cubes.length; ++i) {
      if (this.cubes[i].mesh === meshData) {
        return true;
      }
    }

    return false;
  }

  #showGrid(groundSize) {
    const { _y } = this.ground.position;

    const iMin = groundSize / -2;
    const iMax = groundSize / 2;

    for (let i = iMin; i < iMax; ++i) {
      new Cube(0, _y, i + .5, this).setSize(groundSize, .02, .02).setColor(.7, .7, .7);
      new Cube(i + .5, _y, 0, this).setSize(.02, .02, groundSize).setColor(.7, .7, .7);
    }
  }

  newSelectedMesh(mesh) {
    this.selectedMesh = mesh;
    if (this.selectedMesh) {
      const { _x, _y, _z } = this.selectedMesh.position;
      this.camera.setTarget(new BABYLON.Vector3(_x, _y, _z));
    }
  }

  newCube(x, y, z, size = null, color = null) {
    const cube = new Cube(x, y, z, this);

    if (size) {
      cube.setSize(...size);
    }

    if (color) {
      cube.setColor(...color);
    }

    this.cubes.push(cube);

    this.gizmoManager.attachableMeshes = this.cubes;

    return cube.cubeName;
  }

  stateUpdate(newState) {
    this.state = newState;
  }

  resizeSelectedMesh(width, height, depth) {
    this.selectedMesh.scaling = new BABYLON.Vector3(width, height, depth);
  }
};

export default Constructor;
