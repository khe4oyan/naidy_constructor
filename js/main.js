import Constructor from "../classes/constructor.js";
import Modal from "../classes/modal.js";

// constructors
const constructor = new Constructor(100, 100);
constructor.newCube(0, 0, 0);

// modal
const modal = new Modal(constructor);

// controll buttons
const scaleButtonDOM = document.querySelector('.controll_scale');
scaleButtonDOM.addEventListener("click", () => {
  if (constructor.selectedCube) {
    modal.show();
  } else {
    alert("Select any cube before change it scale");
  }
});
