/* Kleine, wiederverwendbare UI-Helfer: Toast-Meldungen und ein Bestätigungs-/Info-Modal. */

let _toastTimer = null;
function toast(message, type) {
    const el = document.getElementById('toast');
    if (!el) { alert(message); return; }
    el.textContent = message;
    el.className = 'show' + (type ? ' ' + type : '');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => { el.className = ''; }, 3200);
}

function ensureModal() {
    if (document.getElementById('modal')) return;
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="modal-overlay" id="modal">
            <div class="modal-box">
                <h3 id="modal-title">Titel</h3>
                <p id="modal-text"></p>
                <div id="modal-body"></div>
                <div class="link-box" id="modal-link-box" style="display:none"></div>
                <div class="modal-actions">
                    <button class="cancel" id="modal-cancel">Abbrechen</button>
                    <button class="confirm" id="modal-confirm">OK</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(div.firstElementChild);
    document.getElementById('modal-cancel').addEventListener('click', closeModal);
}

function closeModal() {
    const m = document.getElementById('modal');
    if (m) m.classList.remove('active');
}

/**
 * options: { title, text, linkHtml, bodyHtml, confirmLabel, danger, hideCancel, onConfirm }
 */
function openModal(options) {
    ensureModal();
    document.getElementById('modal-title').textContent = options.title || '';
    document.getElementById('modal-text').textContent = options.text || '';

    const body = document.getElementById('modal-body');
    body.innerHTML = options.bodyHtml || '';

    const linkBox = document.getElementById('modal-link-box');
    if (options.linkHtml) { linkBox.style.display = 'block'; linkBox.innerHTML = options.linkHtml; }
    else { linkBox.style.display = 'none'; linkBox.innerHTML = ''; }

    const confirmBtn = document.getElementById('modal-confirm');
    confirmBtn.textContent = options.confirmLabel || 'OK';
    confirmBtn.className = 'confirm' + (options.danger ? ' danger' : '');
    confirmBtn.onclick = () => {
        const result = options.onConfirm ? options.onConfirm() : undefined;
        if (result !== false) closeModal();
    };

    document.getElementById('modal-cancel').style.display = options.hideCancel ? 'none' : 'inline-block';
    document.getElementById('modal').classList.add('active');
}

// Zeigt eine "simulierte" E-Mail mit klickbarem Link an (statt echtem Mailversand)
function showSimulatedMail(toEmail, link) {
    const fullUrl = window.location.href.split(/[?#]/)[0].replace(/[^/]*$/, '') + link;
    openModal({
        title: '📧 Simulierte E-Mail an ' + toEmail,
        text: 'In einer echten Umgebung würde jetzt eine E-Mail verschickt. Hier im Demo-Modus klickst du einfach direkt auf den Link:',
        linkHtml: '<a href="' + link + '">' + fullUrl + '</a>',
        confirmLabel: 'Schließen',
        hideCancel: true,
    });
}

function toggleFieldType(inputId, btn) {
    const input = document.getElementById(inputId);
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    btn.textContent = isPw ? '🙈' : '👁️';
}
