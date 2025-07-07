import Notifications from "./notifications.js";

class ModalMeshScale {
  constructorRef = null;

  modalDOM = null;
  doneButtonDOM = null;
  cancelButtonDOM = null;

  inputWidthDOM = null;
  inputHeightDOM = null;
  inputDepthDOM = null;

  constructor(constructorRef) {
    this.constructorRef = constructorRef;

    this.modalDOM = document.querySelector('.modal_scaleCube');
    this.doneButtonDOM = document.querySelector('.modal_scaleCube .done');
    this.cancelButtonDOM = document.querySelector('.modal_scaleCube .cancel');

    this.inputWidthDOM = document.querySelector('.modal_scaleCube .width');
    this.inputHeightDOM = document.querySelector('.modal_scaleCube .height');
    this.inputDepthDOM = document.querySelector('.modal_scaleCube .depth');

    this.#doneButtonHandlerInit();
    this.#cancelButtonHandlerInit();
  }

  // private methods
  #doneButtonHandlerInit() {
    this.doneButtonDOM.addEventListener("click", () => {
      const width = this.inputWidthDOM.value.trim();
      const height = this.inputHeightDOM.value.trim();
      const depth = this.inputDepthDOM.value.trim();

      if (width === "") {
        return Notifications.err("Invalid input: width");
      }

      if (height === "") {
        return Notifications.err("Invalid input: height");
      }
      
      if (depth === "") {
        return Notifications.err("Invalid input: depth");
      }

      this.constructorRef.resizeSelectedMesh(width, height, depth);
      this.#resetInputsValues();
      this.hide();
      Notifications.succ();
    })
  }

  #cancelButtonHandlerInit() {
    this.cancelButtonDOM.addEventListener("click", () => {
      this.hide();
      Notifications.info("Canceled");
    });
  }

  #resetInputsValues() {
    this.inputWidthDOM.value = "";
    this.inputHeightDOM.value = "";
    this.inputDepthDOM.value = "";
  }

  initInputValues({ _x, _y, _z}) {
    this.inputWidthDOM.value = _x;
    this.inputHeightDOM.value = _y;
    this.inputDepthDOM.value = _z;
  }

  // public methods
  hide() {
    if (!this.modalDOM.classList.contains("hide")) {
      this.modalDOM.classList.add("hide");
    }
  }

  show() {
    if (this.modalDOM.classList.contains("hide")) {
      this.modalDOM.classList.remove("hide");
    }
  }

  toggleVisibility() {
    this.modalDOM.classList.toggle("hide");
  }
}

export default ModalMeshScale;