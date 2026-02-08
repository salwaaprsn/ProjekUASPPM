# FieldCoffee ☕

FieldCoffee adalah aplikasi mobile modern yang dikembangkan dengan **React Native** dan **Expo**, menghadirkan pengalaman pemesanan kopi yang interaktif dan mulus. Proyek ini telah ditingkatkan dengan fitur-fitur teknis utama sebagai bagian dari penilaian pengembangan aplikasi.

## 🌟 Fitur Utama (Highlight Penilaian)

Berikut adalah implementasi teknis utama yang telah ditambahkan:

### 1. 🧪 Testing (Unit & Integration)
Implementasi pengujian otomatis untuk memastikan stabilitas aplikasi.
- **Framework**: Menggunakan `Jest` dan `React Test Renderer`.
- **Unit Test**: Pengujian komponen individual (contoh: `__tests__/TermsModal-test.tsx`).
- **Snapshot Test**: Memastikan UI tidak berubah secara tidak sengaja (`__tests__/App-test.tsx`).
- **Coverage**: Meliputi render komponen dan logika dasar.

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
- **Logout Logic**: Logika logout yang aman, memastikan user diarahkan kembali ke layar utama (Onboarding) dan memutus akses "Back" ke halaman akun.
- **Guest Mode**: Dukungan untuk pengguna tamu tanpa login.

### 4. 📱 Responsif & Modern UI
- **Desain**: Tampilan bersih dengan palet warna kopi yang elegan.
- **Komponen**: Penggunaan `FlatList` dan `ScrollView` yang optimal.

## 🛠️ Teknologi

- **Core**: React Native, Expo SDK
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: React Context API
- **Database**: Expo SQLite (untuk data lokal)
- **Backend**: Firebase Integration

## 🚀 Cara Menjalankan

1.  **Instal Dependensi**:
    ```bash
    npm install
    ```

2.  **Jalankan Aplikasi**:
    ```bash
    npx expo start
    ```

3.  **Jalankan Testing**:
    ```bash
    npm run test
    ```
