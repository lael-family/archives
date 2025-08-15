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
