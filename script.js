/* =========================================
   gofiles.uk - 共通スクリプト
   ========================================= */

/* ---- サイドメニュー ---- */
const menuOpenBtn = document.getElementById('menuOpenBtn');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const sideMenu = document.getElementById('sideMenu');
const menuBackdrop = document.getElementById('menuBackdrop');

function openMenu() {
    sideMenu && sideMenu.classList.add('open');
    menuBackdrop && menuBackdrop.classList.add('open');
}
function closeMenu() {
    sideMenu && sideMenu.classList.remove('open');
    menuBackdrop && menuBackdrop.classList.remove('open');
}

if (menuOpenBtn) menuOpenBtn.addEventListener('click', openMenu);
if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

/* ---- ドラッグ&ドロップ (トップページ) ---- */
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const dragOverlay = document.getElementById('dragOverlay');

if (dragOverlay) {
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragOverlay.classList.remove('hidden');
    });
    dragOverlay.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dragOverlay.classList.add('hidden');
    });
    dragOverlay.addEventListener('drop', (e) => {
        e.preventDefault();
        dragOverlay.classList.add('hidden');
        handleFiles(e.dataTransfer.files);
    });
}
if (fileInput) {
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
}
function handleFiles(files) {
    if (files && files.length > 0) {
        window.location.href = 'download.html';
    }
}

/* ---- チェックボックス (全選択 / 個別) ---- */
const allChecks = document.querySelectorAll('[data-role="select"]');
const selectAllBox = document.querySelector('[data-role="select-all"]');

document.addEventListener('click', (e) => {
    const target = e.target.closest('.check');
    if (!target) return;

    if (target.dataset.role === 'select-all') {
        const next = !target.classList.contains('checked');
        target.classList.toggle('checked', next);
        allChecks.forEach(b => b.classList.toggle('checked', next));
    } else if (target.dataset.role === 'select') {
        target.classList.toggle('checked');
        if (selectAllBox) {
            const allChecked = [...allChecks].every(b => b.classList.contains('checked'));
            selectAllBox.classList.toggle('checked', allChecked);
        }
    }
});

/* ---- トースト ---- */
const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
function showToast(msg = 'Done') {
    if (!toast) return;
    if (toastText) toastText.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
}
