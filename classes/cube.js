class Cube {
  static cubeIndex = 0;

  constructorRef = null;
  mesh = null; // babylon object
  cubeName = null;

  constructor(x, y, z, constructorRef) {
    this.constructorRef = constructorRef;
    this.cubeName = `cube_${Cube.cubeIndex++}`;
    this.mesh = BABYLON.MeshBuilder.CreateBox(this.cubeName, { size: 1 }, this.scene);
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }

  setSize(width, height, depth) {
    this.mesh.scaling = new BABYLON.Vector3(width, height, depth);
    return this;
  }

  setColor(r = 1, g = 0, b = 0) {
    const colorMaterial = new BABYLON.StandardMaterial("color", this.constructorRef.scene);
    colorMaterial.diffuseColor = new BABYLON.Color3(r, g, b);

    this.mesh.material = colorMaterial;

    return this;
  }
}

export default Cube;