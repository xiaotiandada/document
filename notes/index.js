// https://www.zhangxinxu.com/wordpress/2021/07/html-rel-import-include/
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/customElements
// https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements

class HtmlImport extends HTMLLinkElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["href"];
  }

  load() {
    fetch(this.href)
      .then((res) => {
        if (res.ok) {
          return res.text();
        }
        this.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              error: "加载失败",
              response: res,
            },
          })
        );
      })
      .catch((error) => {
        // 触发error事件
        this.dispatchEvent(
          new CustomEvent("error", {
            detail: {
              error: "网络异常",
              response: {
                ok: false,
                status: -1,
                statusText: error,
              },
            },
          })
        );
      })
      .then((html) => {
        if (typeof html == "string") {
          this.style.display = "block";
          this.innerHTML = html;

          // 触发load事件
          this.dispatchEvent(new CustomEvent("load"));
        }
      });
  }

  attributeChangedCallback(name) {
    if (name == "href") {
      this.load();
    }
  }
}
if (!customElements.get("ui-import")) {
  customElements.define("ui-import", HtmlImport, {
    extends: "link",
  });
}
