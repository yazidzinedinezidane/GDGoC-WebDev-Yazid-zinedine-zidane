
// State: array untuk menyimpan sekumpulan data peserta di dalam variabel (memori sementara)
// Menggunakan `const` karena kita tidak akan re-assignment (mengganti ulang array secara utuh)
const participants = [];

// DOM Elements: Mengambil elemen yang ada di HTML ke dalam variabel JavaScript
// Kita "menangkap" tiap elemen berdasarkan "id"-nya agar bisa kita ubah/baca datanya melalui JavaScript
const form = document.getElementById("registration-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const levelSelect = document.getElementById("level");
const waCheckbox = document.getElementById("join-wa");
const participantsList = document.getElementById("participants-list");
const errorEl = document.getElementById("error-message");
const successEl = document.getElementById("success-message");

// Fungsi pembantu (helper func) untuk me-refresh dan menampilkan data peserta ke layar website
function renderParticipants() {
    // 1. Bersihkan (kosongkan) list ul HTML sebelum me-render, supaya datanya tidak terduplikasi.
    participantsList.innerHTML = "";

    // 2. Gunakan For...Of Loop untuk perulangan melewati semua data di array participants
    // `p` merepresentasikan tipe masing-masing 1 object di setiap perulangannya.
    for (const p of participants) {
        // Membuat elemen <li> baru menggunakan JavaScript murni (DOM)
        const li = document.createElement("li");

        // Memodifikasi isi teks <li> tersebut. Menggunakan template literal backticks `` untuk menggabungkan string.
        // `p.joinWA ? "..." : ""`  Ini adalah Ternary Operator (mirip if-else singkat)
        li.textContent = `${p.name} – ${p.level} ${p.joinWA ? "(Join WA group)" : ""}`;

        // Memasukkan <li> yang telah dibuat dan dimodifikasi ke dalam tag <ul> (participantsList) yang ada di HTML
        participantsList.appendChild(li);
    }
}

// Fungsi bantu untuk membungkus kode menambahkan peserta baru ke array dan update ke DOM.
function addParticipant(participant) {
    // Memasukkan data baru ke urutan paling akhir (.push) ke dalam array
    participants.push(participant);
    // Segera panggil renderParticipants supaya item list di HTML ikut ter-update
    renderParticipants();
}

// Event Listener digunakan untuk "mendengarkan/memantau" ketika kejadian (event) terjadi 
// Di sini kita mendengarkan event 'submit' pada formulir (saat tombol Register ditekan)
form.addEventListener("submit", (event) => {
    // PENTING: Mencegah perilaku default browser pada Form submit. Tujuannya supaya halaman TIDAK ter-reload.
    event.preventDefault();

    // Membaca nilai aktual teks (.value) yang diketik user. Serta kita gunakan .trim() untuk menghapus spasi kiri/kanan.
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const level = levelSelect.value;
    const joinWA = waCheckbox.checked; // .checked akan mereturn nilai true/false pada checkbox

    // Validasi input data (Control Flow if-statement): jika nama ATAU email kosong, beri peringatan
    if (!name || !email) {
        // Tampilkan pesan error pada paragraf dengan mengubah textContent-nya
        errorEl.textContent = "Name and email are required.";
        successEl.textContent = "";
        return; // Early return: hentikan pemrosesan fungsi langsung di baris ini
    }

    // Validasi format email sederhana: Cek apakah di dalam teks ada karakter "@"
    if (!email.includes("@")) {
        errorEl.textContent = "Please enter a valid email address.";
        successEl.textContent = "";
        return;
    }

    // Menghapus pesan error dari layar kalau semua validasi lolos dan aman
    errorEl.textContent = "";

    // Membuat object tipe data baru
    // Penulisan { name, email, level, joinWA } menggunakan Object Literal Shorthand versi ES6 singkat dari { name: name, ...  }
    addParticipant({ name, email, level, joinWA });

    // Mereset form atau mengosongkan semua field input yang sudah dimasukkan ke kondisi semula
    form.reset();

    // Tampilkan tulisan notifikasi berhasil mendaftar
    successEl.textContent = "Registration submitted!";

    // setTimeout merupakan fungsi Asynchronous bawaan JS untuk menjeda aksi.
    // Menjalankan fungsi anonim (() => {}) untuk menghapus Success message setelah dijeda selama 3000 ms (3 detik).
    setTimeout(() => {
        successEl.textContent = "";
    }, 3000);
});

// Render inisial (Saat pertama kali halaman dibuka, data array masih kosong = 0 item)
renderParticipants();
