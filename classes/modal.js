class Modal {
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
        return alert("Invalid input: width");
      }
      if (height === "") {
        return alert("Invalid input: height");
      }
      if (depth === "") {
        return alert("Invalid input: depth");
      }

      this.constructorRef.resizeSelectedMesh(width, height, depth);
      this.inputWidthDOM.value = "";
      this.inputHeightDOM.value = "";
      this.inputDepthDOM.value = "";
      this.hide();
    })
  }

  #cancelButtonHandlerInit() {
    this.cancelButtonDOM.addEventListener("click", () => {
      this.hide();
    });
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

export default Modal;