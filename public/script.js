async function load() {
  const res = await fetch("/api/posts");
  const posts = await res.json();

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(p => {
    const div = document.createElement("div");
    div.textContent = p.text;
    feed.appendChild(div);
  });
}

document.getElementById("share").onclick = async () => {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  input.value = "";
  load();
};

load();
