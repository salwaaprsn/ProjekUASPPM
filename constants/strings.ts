// Onboarding strings and translations
export const ONBOARDING_STRINGS = {
    Indonesia: {
        login: 'Masuk',
        register: 'Daftar menggunakan Google',
        skip: 'Lewati tahap ini',
        data: [
            {
                id: '1',
                title: 'Pengalaman Terbaik Menikmati Kopi',
                desc: 'Nikmati segelas kopi penuh rasa dari Field Coffee hanya dalam satu aplikasi.',
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000'
            },
            {
                id: '2',
                title: 'Berbagai Keuntungan Via Field App',
                desc: 'Pesan tanpa antri, dapat promo menarik setiap hari, Field Poin, dan promo menarik lainnya!',
                image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1000',
            },
            {
                id: '3',
                title: 'Menikmati Kopi Kapanpun, Dimanapun',
                desc: 'Bebas pilih cara pengambilan, bisa pick up di store atau dikirim langsung ke tujuanmu.',
                image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000',
            },
        ]
    },
    English: {
        login: 'Login',
        register: 'Register using Google',
        skip: 'Skip this step',
        data: [
            {
                id: '1',
                title: 'The Best Coffee Experience',
                desc: 'Enjoy a cup of full-flavored coffee from Field Coffee in just one app.',
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000'
            },
            {
                id: '2',
                title: 'Many Benefits Via Field App',
                desc: 'Order without queuing, get attractive promos every day, Field Points, and more!',
                image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1000',
            },
            {
                id: '3',
                title: 'Enjoy Coffee Anytime, Anywhere',
                desc: 'Feel free to choose how to pick up, at the store or delivered directly to you.',
                image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000',
            },
        ]
    }
};

export type LanguageType = 'Indonesia' | 'English';
