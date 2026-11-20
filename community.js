(() => {
  const postDialog = document.getElementById("post-dialog");
  const placeDialog = document.getElementById("place-dialog");
  const postForm = document.getElementById("post-form");
  const placeForm = document.getElementById("place-form");
  const postList = document.getElementById("post-list");
  const toast = document.getElementById("toast");
  const mediaInput = document.getElementById("post-media");
  const mediaPreview = document.getElementById("media-preview");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3500);
  }

  function openDialog(dialog) {
    if (!dialog) return;
    dialog.showModal();
  }

  document.querySelectorAll("[data-open-post]").forEach(button => button.addEventListener("click", () => openDialog(postDialog)));
  document.querySelectorAll("[data-open-place]").forEach(button => button.addEventListener("click", () => openDialog(placeDialog)));
  document.querySelectorAll("[data-close-dialog]").forEach(button => button.addEventListener("click", () => {
    const dialog = button.closest("dialog");
    if (dialog) dialog.close();
  }));

  document.getElementById("menuToggle").addEventListener("click", event => {
    const button = event.currentTarget;
    const nav = document.getElementById("mobileNav");
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  document.querySelectorAll("#mobileNav a").forEach(link => link.addEventListener("click", () => {
    document.getElementById("mobileNav").classList.remove("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  }));

  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const selected = button.dataset.filter;
    document.querySelectorAll(".community-post").forEach(post => {
      post.hidden = selected !== "all" && post.dataset.category !== selected;
    });
  }));

  document.querySelectorAll("[data-like]").forEach(button => button.addEventListener("click", () => {
    const liked = button.classList.toggle("is-liked");
    const count = button.querySelector("b");
    count.textContent = String(Math.max(0, Number(count.textContent) + (liked ? 1 : -1)));
    button.setAttribute("aria-pressed", String(liked));
  }));

  document.querySelectorAll("[data-comments]").forEach(button => button.addEventListener("click", () => {
    const panel = button.closest(".community-post").querySelector(".comment-panel");
    panel.hidden = !panel.hidden;
    if (!panel.hidden) panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }));

  document.querySelectorAll("[data-report]").forEach(button => button.addEventListener("click", () => {
    showToast("Reporting will be available when the community is connected.");
  }));

  mediaInput.addEventListener("change", () => {
    mediaPreview.replaceChildren();
    const file = mediaInput.files && mediaInput.files[0];
    if (!file) {
      mediaPreview.hidden = true;
      return;
    }
    const url = URL.createObjectURL(file);
    const preview = file.type.startsWith("video/") ? document.createElement("video") : document.createElement("img");
    preview.src = url;
    if (preview.tagName === "VIDEO") {
      preview.controls = true;
      preview.muted = true;
    } else {
      preview.alt = "Selected media preview";
    }
    mediaPreview.append(preview);
    mediaPreview.hidden = false;
  });

  function makePost(text, category, file, placeTag) {
    const article = document.createElement("article");
    article.className = "community-post";
    article.dataset.category = category;
    const top = document.createElement("div");
    top.className = "post-topline";
    const avatar = document.createElement("div");
    avatar.className = "member-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = "K";
    const author = document.createElement("div");
    author.className = "post-author";
    const name = document.createElement("strong");
    name.textContent = "Koupati member";
    const label = document.createElement("span");
    label.textContent = "Your preview · Not published";
    author.append(name, label);
    const badge = document.createElement("span");
    badge.className = "post-badge";
    badge.textContent = "Preview";
    top.append(avatar, author, badge);
    const copy = document.createElement("p");
    copy.className = "post-copy";
    copy.textContent = text;
    article.append(top, copy);

    if (file) {
      const figure = document.createElement("figure");
      figure.className = "post-photo";
      const url = URL.createObjectURL(file);
      const media = file.type.startsWith("video/") ? document.createElement("video") : document.createElement("img");
      media.src = url;
      if (media.tagName === "VIDEO") {
        media.controls = true;
        media.muted = true;
      } else {
        media.alt = "Your selected media preview";
      }
      const caption = document.createElement("figcaption");
      caption.textContent = "Selected media · preview only";
      figure.append(media, caption);
      article.append(figure);
    }

    if (placeTag) {
      const place = document.createElement("div");
      place.className = "post-place";
      place.textContent = "⌖ General area tag selected";
      article.append(place);
    }

    const actions = document.createElement("div");
    actions.className = "post-actions";
    const like = document.createElement("button");
    like.type = "button";
    like.className = "post-action";
    like.dataset.like = "";
    like.innerHTML = "♡ <span>Like</span> <b>0</b>";
    like.addEventListener("click", () => {
      const liked = like.classList.toggle("is-liked");
      const count = like.querySelector("b");
      count.textContent = String(Math.max(0, Number(count.textContent) + (liked ? 1 : -1)));
      like.setAttribute("aria-pressed", String(liked));
    });
    const comment = document.createElement("button");
    comment.type = "button";
    comment.className = "post-action";
    comment.textContent = "◌ Comment";
    comment.addEventListener("click", () => showToast("Comments will be available in the connected community."));
    const report = document.createElement("button");
    report.type = "button";
    report.className = "post-action";
    report.textContent = "⚑ Report";
    report.addEventListener("click", () => showToast("Reporting will be available when the community is connected."));
    actions.append(like, comment, report);
    article.append(actions);
    return article;
  }

  postForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(postForm);
    const text = String(data.get("text") || "").trim();
    if (!text) return;
    const post = makePost(text, String(data.get("category") || "nature"), mediaInput.files[0] || null, Boolean(data.get("placeTag")));
    postList.prepend(post);
    postDialog.close();
    postForm.reset();
    mediaPreview.replaceChildren();
    mediaPreview.hidden = true;
    post.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Preview added on this page only. It has not been shared.");
  });

  placeForm.addEventListener("submit", event => {
    event.preventDefault();
    placeDialog.close();
    placeForm.reset();
    showToast("Suggestion preview received on this page only. It has not been sent.");
  });

  [postDialog, placeDialog].forEach(dialog => dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  }));
})();