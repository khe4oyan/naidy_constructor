import Constructor from "../classes/constructor.js";

// constructors
const constructor = new Constructor(100, 100);
constructor.newCube(0, 0, 0);

// controll buttons
document.querySelector('.controll_select').addEventListener("click", () => {
  if (constructor.state === Constructor.STATES.select) {
    return;
  }
  
  constructor.stateUpdate(Constructor.STATES.select);
});

const moveButtonDOM = document.querySelector('.controll_move');
moveButtonDOM.addEventListener("click", () => {
  constructor.toggleMoveGizmo();
  moveButtonDOM.classList.toggle("activeTool");
});

const scaleButtonDOM = document.querySelector('.controll_scale');
scaleButtonDOM.addEventListener("click", () => {
  if (constructor.selectedCube) {
    // show modal
    // set new sizes
  } else {
    alert("Select any cube before change it scale");
  }
});
