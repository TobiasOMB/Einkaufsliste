/*
 * Gemeinsame "Datenbank"-Schicht für die komplette Seite.
 * Da diese Version rein statisch ist (GitHub Pages hat keinen Server),
 * liegen alle Daten im localStorage des Browsers - pro Gerät/Browser getrennt.
 * E-Mails werden nicht wirklich verschickt; stattdessen zeigt die Seite den
 * Link, den eine echte Mail enthalten würde, direkt in einem Fenster an.
 */

const LS_USERS = 'ekl_users';
const LS_LISTS = 'ekl_lists';
const LS_SESSION = 'ekl_session';
const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 Stunde

function uid() {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
}

function getUsers() {
    try { return JSON.parse(localStorage.getItem(LS_USERS)) || []; }
    catch { return []; }
}
function saveUsers(users) { localStorage.setItem(LS_USERS, JSON.stringify(users)); }

function getLists() {
    try { return JSON.parse(localStorage.getItem(LS_LISTS)) || []; }
    catch { return []; }
}
function saveLists(lists) { localStorage.setItem(LS_LISTS, JSON.stringify(lists)); }

function findUserByUsername(users, name) {
    if (!name) return null;
    const n = name.trim().toLowerCase();
    return users.find(u => u.username.toLowerCase() === n) || null;
}
function findUserByEmail(users, email) {
    if (!email) return null;
    const n = email.trim().toLowerCase();
    return users.find(u => u.email.toLowerCase() === n) || null;
}
function findUserById(users, id) { return users.find(u => u.id === id) || null; }
function findListById(lists, id) { return lists.find(l => l.id === id) || null; }

function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || ''); }

// Legt beim allerersten Aufruf einen Demo-Admin mit Beispiel-Liste an
function seedIfEmpty() {
    const users = getUsers();
    if (users.length) return;

    const lists = getLists();
    const adminId = uid();
    const list = {
        id: uid(),
        name: 'Meine Liste',
        ownerId: adminId,
        members: [adminId],
        items: [
            { id: uid(), item: 'Schlagsahne', quantity: 1, checked: false },
            { id: uid(), item: 'Waffeln', quantity: 2, checked: false },
        ],
    };
    lists.push(list);

    users.push({
        id: adminId,
        username: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        listIds: [list.id],
        resetToken: null, resetTokenExpiry: null,
        deleteToken: null, deleteTokenExpiry: null,
        createdAt: new Date().toISOString(),
    });

    saveUsers(users);
    saveLists(lists);
}
seedIfEmpty();

// ---------------------------------------------------------------------------
// Session
// ---------------------------------------------------------------------------
function getSession() {
    try { return JSON.parse(localStorage.getItem(LS_SESSION)); }
    catch { return null; }
}
function setSession(userId) { localStorage.setItem(LS_SESSION, JSON.stringify({ userId })); }
function clearSession() { localStorage.removeItem(LS_SESSION); }
function currentUser() {
    const s = getSession();
    if (!s) return null;
    return findUserById(getUsers(), s.userId);
}
// Schützt eine Seite: ohne gültige Session -> zurück zum Login
function requireLogin() {
    const u = currentUser();
    if (!u) { window.location.href = 'index.html'; return null; }
    return u;
}
function requireAdmin() {
    const u = currentUser();
    if (!u || u.role !== 'admin') { window.location.href = 'liste.html'; return null; }
    return u;
}

// ---------------------------------------------------------------------------
// Listen-Hilfsfunktionen (ein User kann Mitglied in mehreren Listen sein)
// ---------------------------------------------------------------------------
function listsForUser(userId) {
    const lists = getLists();
    return lists.filter(l => l.members.includes(userId));
}

function createListForUser(userId, name) {
    const lists = getLists();
    const users = getUsers();
    const user = findUserById(users, userId);
    const list = { id: uid(), name: name || 'Neue Liste', ownerId: userId, members: [userId], items: [] };
    lists.push(list);
    user.listIds = user.listIds || [];
    user.listIds.push(list.id);
    saveLists(lists);
    saveUsers(users);
    return list;
}

// Entfernt einen User aus einer Liste; löscht die Liste, wenn dadurch niemand mehr Mitglied ist
function removeUserFromList(listId, userId) {
    const lists = getLists();
    const users = getUsers();
    const list = findListById(lists, listId);
    if (!list) return;
    list.members = list.members.filter(id => id !== userId);
    const user = findUserById(users, userId);
    if (user) user.listIds = (user.listIds || []).filter(id => id !== listId);

    const remaining = list.members.length === 0 ? lists.filter(l => l.id !== listId) : lists;
    saveLists(remaining);
    saveUsers(users);
}

// Löscht einen User komplett (aus allen Listen entfernen, leere Listen aufräumen)
function deleteUserEverywhere(userId) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return null;
    const [removed] = users.splice(idx, 1);
    saveUsers(users);

    let lists = getLists();
    (removed.listIds || []).forEach(listId => {
        const list = findListById(lists, listId);
        if (list) list.members = list.members.filter(id => id !== userId);
    });
    lists = lists.filter(l => l.members.length > 0);
    saveLists(lists);

    return removed;
}
