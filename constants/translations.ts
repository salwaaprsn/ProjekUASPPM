export const translations = {
    id: {
        // Common
        welcome: "Selamat Datang",
        back: "Kembali",
        save: "Simpan",
        delete: "Hapus",
        edit: "Ubah",
        cancel: "Batal",
        loading: "Memuat...",
        search: "Cari...",

        // Tabs
        home: "Beranda",
        menu: "Menu",
        orders: "Pesanan",
        account: "Akun",

        // Akun Screen
        saved_addresses: "Alamat Tersimpan",
        payment_methods: "Metode Pembayaran",
        settings: "Pengaturan",
        logout: "Keluar",
        logout_confirm: "Apakah kamu yakin ingin keluar?",

        // Settings Screen
        notifications: "Notifikasi Aplikasi",
        biometric: "Biometrik (FaceID/Fingerprint)",
        language: "Bahasa",
        dark_mode: "Mode Gelap",
        about: "Tentang Field Coffee",
        rating: "Beri Rating",
        version: "Versi",
        choose_language: "Pilih Bahasa",

        // Home/Menu
        good_morning: "Selamat Pagi",
        promo: "Promo Hari Ini",
        hot_coffee: "Kopi Panas",
        cold_coffee: "Kopi Dingin",
    },
    en: {
        // Common
        welcome: "Welcome",
        back: "Back",
        save: "Save",
        delete: "Delete",
        edit: "Edit",
        cancel: "Cancel",
        loading: "Loading...",
        search: "Search...",

        // Tabs
        home: "Home",
        menu: "Menu",
        orders: "Orders",
        account: "Account",

        // Akun Screen
        saved_addresses: "Saved Addresses",
        payment_methods: "Payment Methods",
        settings: "Settings",
        logout: "Logout",
        logout_confirm: "Are you sure you want to logout?",

        // Settings Screen
        notifications: "App Notifications",
        biometric: "Biometrics (FaceID/Fingerprint)",
        language: "Language",
        dark_mode: "Dark Mode",
        about: "About Field Coffee",
        rating: "Rate Us",
        version: "Version",
        choose_language: "Choose Language",

        // Home/Menu
        good_morning: "Good Morning",
        promo: "Today's Promo",
        hot_coffee: "Hot Coffee",
        cold_coffee: "Cold Coffee",
    }
};

export type LanguageCode = keyof typeof translations;
export type TranslationKey = keyof typeof translations['id'];
