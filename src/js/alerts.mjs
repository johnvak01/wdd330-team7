export default class Alert {
  constructor(path) {
    this.path = path; // Path of alerts.json
    this.alerts = [];
  }

  async init() {
    this.alerts = await this.getAlerts();
    if (this.alerts.length > 0) {
      this.renderAlerts();
    }
  }

  async getAlerts() {
    const response = await fetch(this.path);
    return await response.json();
  }

  renderAlerts() {
    const main = document.querySelector("main");
    const section = document.createElement("section");
    section.classList.add("alert-list");

    this.alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    main.prepend(section);
  }
}