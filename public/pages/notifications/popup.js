/* =========================
MOYO APP - NOTIFICATION POPUP
SIMPLE UX PROMPT
========================= */

export function showPushPopup(onAllow, onDeny) {

  const box = document.createElement("div");

  box.style = `
    position:fixed;
    bottom:20px;
    left:50%;
    transform:translateX(-50%);
    background:#fff;
    padding:15px;
    border-radius:12px;
    box-shadow:0 5px 20px rgba(0,0,0,0.2);
    width:90%;
    max-width:320px;
    z-index:9999;
    font-family:Arial;
  `;

  box.innerHTML = `
    <b>🔔 Enable Notifications</b>
    <p style="font-size:13px;color:#555;">
      Get alerts when posts are published
    </p>

    <div style="display:flex;gap:10px;">
      <button id="allowBtn" style="flex:1;background:#2e7d32;color:#fff;padding:8px;border:none;border-radius:8px;">
        Allow
      </button>

      <button id="denyBtn" style="flex:1;background:#c62828;color:#fff;padding:8px;border:none;border-radius:8px;">
        No
      </button>
    </div>
  `;

  document.body.appendChild(box);

  document.getElementById("allowBtn").onclick = () => {
    box.remove();
    onAllow?.();
  };

  document.getElementById("denyBtn").onclick = () => {
    box.remove();
    onDeny?.();
  };
}