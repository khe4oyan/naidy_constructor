class Notifications {
  static notificationsDOM = document.querySelector(".notificationsContainer .notifications");

  static #createNotificationDOM(text, className) {
    const div = document.createElement("div");
    div.classList.add("notification");
    div.classList.add(className);
    div.innerText = text;
    this.notificationsDOM.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 4000);
  }

  static info(text) { this.#createNotificationDOM(text, "notification_info"); }
  static warn(text) { this.#createNotificationDOM(text, "notification_warn"); }
  static err(text = "Something went wrong!") { this.#createNotificationDOM(text, "notification_error"); }
  static succ(text = "Done!") { this.#createNotificationDOM(text, "notification_success"); }
}

export default Notifications;