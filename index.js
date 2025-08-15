// ===== THEME TOGGLE =====
(function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  // load saved or system preference
  const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  } else {
    // no saved choice: let system pref apply (via prefers-color-scheme)
    root.removeAttribute('data-theme');
  }

  // set button icon text
  function refreshIcon() {
    const isDark =
      root.getAttribute('data-theme') === 'dark' ||
      (!root.hasAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    btn.textContent = isDark ? '☀️' : '🌙';
  }
  refreshIcon();

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next =
      current ? (current === 'dark' ? 'light' : 'dark')
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark');
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    refreshIcon();
  });

  // update icon if system theme changes and no manual override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('theme')) {
      root.removeAttribute('data-theme');
      refreshIcon();
    }
  });
})();
let fileData = {};

async function loadConfig() {
  try {
    const res = await fetch("assets.config.json");
    fileData = await res.json();
    console.log("Assets loaded:", fileData);
  } catch (err) {
    console.error("Error loading config:", err);
  }
}

// Get icon based on file extension
function getFileIcon(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  switch (ext) {
    case "pdf":
      return "./icons/pdf.png";
    case "png":
      return "./icons/png.png";
    default:
      return "./icons/paper.png";
  }
}

function openFolder(folderName) {
  const fileArea = document.getElementById("file-area");
  fileArea.innerHTML = "";

  if (!fileData[folderName] || fileData[folderName].length === 0) {
    fileArea.innerHTML = `<p>No files in this folder.</p>`;
    return;
  }

  const listContainer = document.createElement("div");
  listContainer.classList.add("file-list");

  fileData[folderName].forEach(file => {
    const icon = getFileIcon(file.url);
    const item = document.createElement("div");
    item.classList.add("file-item");
    item.innerHTML = `
            <img src="${icon}" alt="File">
            <span class="file-name">${file.name}</span>
        `;
    item.onclick = () => window.open(file.url, "_blank");
    listContainer.appendChild(item);
  });

  fileArea.appendChild(listContainer);
}

// Load config on page start
loadConfig();
