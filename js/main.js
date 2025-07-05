import Constructor from "../classes/constructor.js";
import ModalMeshScale from "../classes/modalMeshScale.js";
import Notifications from "../classes/notifications.js";

// constructor
const constructor = new Constructor(100, 100);
constructor.newCube(0, 0, 0);

// modal
const modalMeshScale = new ModalMeshScale(constructor);

// controll buttons
const scaleButtonDOM = document.querySelector('.controll_scale');
scaleButtonDOM.addEventListener("click", () => {
  if (constructor.selectedMesh) {
    modalMeshScale.show();
  } else {
    Notifications.err("Select any cube before change it scale");
  }
});
