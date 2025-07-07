import Constructor from "../classes/constructor.js";
import ModalMeshScale from "../classes/modalMeshScale.js";
import Notifications from "../classes/notifications.js";

// constructor
const constructor = new Constructor(100);
constructor.newCube(0, 0, 0, null, [0, 1, 1]);
constructor.newCube(0, 0, 2, null, [1, 1, 0]);
constructor.newCube(5, 0, 2, null, [1, 0, 1]);

// modal
const modalMeshScale = new ModalMeshScale(constructor);

// controll buttons
const scaleButtonDOM = document.querySelector('.controll_scale');
scaleButtonDOM.addEventListener("click", () => {
  if (constructor.selectedMesh) {
    const boundingInfo = constructor.selectedMesh.getBoundingInfo();
    const boundingBox = boundingInfo.boundingBox;
    
    const min = boundingBox.minimumWorld;
    const max = boundingBox.maximumWorld;

    const size = max.subtract(min);
    modalMeshScale.initInputValues(size);
    modalMeshScale.show();
  } else {
    Notifications.err("Select any cube before change it scale");
  }
});
