# FieldCoffee ☕

FieldCoffee adalah aplikasi mobile modern yang dikembangkan dengan **React Native** dan **Expo**, menghadirkan pengalaman pemesanan kopi yang interaktif dan mulus. Proyek ini telah ditingkatkan dengan fitur-fitur teknis utama sebagai bagian dari penilaian pengembangan aplikasi.

# 📁 Struktur Folder Project

```text
FieldCoffee
├── .expo
├── .vscode
├── __tests__
├── app
│   ├── (tabs)
│   ├── _layout.tsx
│   └── ...
├── assets
├── components
├── config
│   └── firebase.ts
├── constants
├── context
├── hooks
├── screens
│   ├── AkunScreen.tsx
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   └── ...
├── .gitignore
├── app.json
├── babel.config.js
├── eslint.config.js
├── expo-env.d.ts
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🌟 Fitur Utama (Highlight Penilaian)

Berikut adalah implementasi teknis utama yang telah ditambahkan:

### 1. 🧪 Testing (Unit & Integration)
Implementasi pengujian otomatis untuk memastikan stabilitas aplikasi.
- **Framework**: Menggunakan `Jest` dan `React Test Renderer`.
- **Unit Test**: Pengujian komponen individual (contoh: `__tests__/TermsModal-test.tsx`).
- **Snapshot Test**: Memastikan UI tidak berubah secara tidak sengaja (`__tests__/App-test.tsx`).

### 2. ✨ Animasi (Advanced UX)
Penggunaan animasi canggih untuk pengalaman pengguna yang lebih hidup.
- **Library**: `react-native-reanimated` untuk performa tinggi (60fps).
- **Implementasi**:
  - **Menu Screen**: Efek *Fade In Up* saat memuat daftar menu.
  - **Detail Screen**: Transisi elemen UI yang halus.
  - **Onboarding**: Animasi parallax dan transisi halaman.

### 3. 🔐 Autentikasi & Navigasi
Alur pengguna yang aman dan intuitif menggunakan **Expo Router**.
- **Stack Navigation**: Perpindahan antar layar yang terkelola dengan baik.
- **Logout Logic**: Logika logout yang aman, memastikan user diarahkan kembali ke layar utama.
- **Guest Mode**: Dukungan untuk pengguna tamu tanpa login.

### 4. 📱 Responsif & Modern UI
- **Desain**: Tampilan bersih dengan palet warna kopi yang elegan.
- **Komponen**: Penggunaan `FlatList` dan `ScrollView` yang optimal.

---

## 🛠️ Teknologi yang Digunakan

- ⚛️ React Native & Expo SDK
- 🔥 Firebase Authentication & Firestore
- 🗄️ Expo SQLite (Local Database)
- ☁️ Firebase Storage
- 🌐 TypeScript
- 🔌 Expo Router (Navigation)
- 🎨 React Native Reanimated

## ▶️ Cara Menjalankan Aplikasi

1. Clone repository

```bash
git clone https://github.com/salwaaprsn/ProjekUASPPM.git
cd ProjectUASPPM
```
2. Install dependency

```bash
npm install
```

3. Jalankan project

```bash
npx expo start
```

---

## 🔗 Link Terkait

- **Video Demonstrasi:** [Tonton Demo](https://drive.google.com/drive/folders/1R_EMiC1kD78xMR1YTJfaoamC6dxoMDzx)

---

## 👩💻 Author

Nama : Salwa Aprilia Santi

NIM: 20230040141

Kelas: TI23F
