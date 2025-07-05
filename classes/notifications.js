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
    }, 3000);
  }

  static info (text) { this.#createNotificationDOM(text, "notification_info"); }
  static warn(text) { this.#createNotificationDOM(text, "notification_warn"); }
  static err(text) { this.#createNotificationDOM(text, "notification_error"); }
  static succ(text) { this.#createNotificationDOM(text, "notification_success"); }
}

// <div class="notification notification_info">Info</div>
// <div class="notification notification_warn">Warn</div>
// <div class="notification notification_error">Error</div>
// <div class="notification notification_success">Success</div>
export default Notifications;