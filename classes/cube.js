import Notifications from './notifications.js'

class Cube {
  static cubeIndex = 0;

  constructorRef = null;
  mesh = null; // babylon object
  cubeName = null;

  static applyTextureWithFixedPixelSize(mesh, textureURL, pixelSize) {
    const scene = mesh.getScene();

    // Загружаем текстуру
    const texture = new BABYLON.Texture(textureURL, scene);

    // Получаем размеры меша в мировых единицах по X и Z
    const bounds = mesh.getBoundingInfo().boundingBox.extendSize;
    const sizeX = bounds.x * 2;
    const sizeZ = bounds.z * 2;

    // Как получить размеры текстуры в пикселях?
    // Babylon.js не даёт напрямую, но можно получить через texture.getSize()
    texture.onLoadObservable.add(() => {
      const texSize = texture.getSize();
      
      if (!texSize) {
        return Notifications.warn("Failed to get texture size.");
      }

      const texWidthPx = texSize.width;
      const texHeightPx = texSize.height;

      // Считаем, сколько плиток должно быть по ширине и высоте
      const tilesX = sizeX / (pixelSize / texWidthPx);
      const tilesZ = sizeZ / (pixelSize / texHeightPx);

      texture.uScale = tilesX;
      texture.vScale = tilesZ;
    });

    // Создаём материал и применяем
    const mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseTexture = texture;
    mesh.material = mat;
  }

  constructor(x, y, z, constructorRef) {
    this.constructorRef = constructorRef;
    this.cubeName = `cube_${Cube.cubeIndex++}`;
    const box = BABYLON.MeshBuilder.CreateBox(this.cubeName, { size: 1 }, this.scene);
    box.position.x = x;
    box.position.y = y;
    box.position.z = z;

    Cube.applyTextureWithFixedPixelSize(box, "../assets/textures/greenprint.png", 10000);

    this.mesh = box;
  }
}

export default Cube;