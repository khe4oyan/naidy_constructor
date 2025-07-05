import ConstructorInitializer from "./constructorInitializer.js";
import Cube from "./Cube.js";

class Constructor {
  canvasDOM = null;
  engine = null;
  state = null;
  camera = null;
  light = null;
  cubes = null;
  selectedMesh = null;
  gizmoManager = null;

  constructor(groundW, groundH) {
    const [canvasDOM, engine, scene, camera, light] = new ConstructorInitializer(groundW, groundH);
    this.canvasDOM = canvasDOM;
    this.engine = engine;
    this.scene = scene;
    this.camera = camera;
    this.light = light;
    this.cubes = [];

    this.gizmoManager = new BABYLON.GizmoManager(scene);
    this.#cubeClickInit();
  }

  #cubeClickInit() {
    this.scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERTAP) {
        const meshData = pointerInfo?._pickInfo?.pickedMesh;

        this.gizmoManager.positionGizmoEnabled = false;

        if (meshData?.name !== "ground") {
          this.newSelectedMesh(meshData);
          this.gizmoManager.attachToMesh(this.selectedMesh);
          this.gizmoManager.positionGizmoEnabled = true;
        } else {
          this.newSelectedMesh(null);
        }
      }
    });
  }

  newSelectedMesh(mesh) {
    this.selectedMesh = mesh;
    if (this.selectedMesh) {
      const {_x, _y, _z} = this.selectedMesh.position;
      this.camera.setTarget(new BABYLON.Vector3(_x, _y, _z));
    }
  }

  newCube(x, y, z, neighborSide = null) {
    const cube = new Cube(x, y, z, neighborSide, this);
    this.cubes.push(cube);

    this.gizmoManager.attachableMeshes = this.cubes;

    return cube.cubeName;
  }

  stateUpdate(newState) {
    this.state = newState;
  }

  toggleMoveGizmo() {
    this.gizmoManager.positionGizmoEnabled = !this.gizmoManager.positionGizmoEnabled;
  }

  resizeSelectedMesh(width, height, depth) {
    this.selectedMesh.scaling = new BABYLON.Vector3(width, height, depth);
  }
};

export default Constructor;
