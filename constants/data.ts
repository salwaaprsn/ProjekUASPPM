export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  desc: string;
}

export const MENU_API: MenuItem[] = [
  // COFFEE (Sisa 6 Menu)
  {
    id: '1',
    name: 'Aren Latte',
    price: '22.000',
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500',
    desc: 'Kopi susu gula aren khas Field Coffee dengan biji kopi pilihan.'
  },
  {
    id: '2',
    name: 'Caramel Macchiato',
    price: '28.000',
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500',
    desc: 'Espresso dengan susu creamy dan saus caramel premium.'
  },
  {
    id: '3',
    name: 'Americano',
    price: '18.000',
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=500',
    desc: 'Double shot espresso dengan air murni, cocok untuk pecinta kopi hitam.'
  },
  {
    id: '7',
    name: 'Mocha Fusion',
    price: '29.000',
    category: 'Coffee',
    image: 'https://plus.unsplash.com/premium_photo-1663012978924-5bfd443ac932?q=80&w',
    desc: 'Perpaduan sempurna antara espresso, susu, dan sirup cokelat premium.'
  },
  {
    id: '8',
    name: 'Cappuccino',
    price: '24.000',
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=500',
    desc: 'Kopi klasik dengan foam susu yang tebal dan taburan bubuk cokelat.'
  },
  {
    id: '10',
    name: 'Pandan Latte',
    price: '27.000',
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=500',
    desc: 'Kopi susu dengan aroma pandan harum yang menyegarkan.'
  },

  // NON-COFFEE (10)
  {
    id: '11',
    name: 'Matcha Latte',
    price: '25.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w',
    desc: 'Teh hijau Jepang murni dicampur dengan susu segar.'
  },
  {
    id: '12',
    name: 'Dark Chocolate',
    price: '24.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?q=80&w',
    desc: 'Cokelat hitam pekat yang tidak terlalu manis namun sangat creamy.'
  },
  {
    id: '13',
    name: 'Red Velvet',
    price: '26.000',
    category: 'Non-Coffee',
    image: 'https://img.lazcdn.com/g/p/f25d3eabf2400e5bb1f255725d408652.jpg_720x720q80.jpg',
    desc: 'Minuman rasa kue red velvet yang lembut di lidah.'
  },
  {
    id: '14',
    name: 'Taro Latte',
    price: '24.000',
    category: 'Non-Coffee',
    image: 'https://minumankekinian.id/wp-content/uploads/2025/11/Sering-Dijadikan-Rasa-Minuman-Inilah-Manfaat-Taro-Bagi-Kesehatan-yang-Jarang-Diketahui.jpg',
    desc: 'Rasa talas ungu yang unik dan manis.'
  },
  {
    id: '15',
    name: 'Strawberry Milk',
    price: '27.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w',
    desc: 'Susu segar dengan selai strawberry buatan sendiri dan potongan buah asli.'
  },
  {
    id: '16',
    name: 'Thai Tea',
    price: '22.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1644203541701-0c534473e616?q=80&w',
    desc: 'Teh Thailand autentik dengan campuran susu kental manis.'
  },
  {
    id: '17',
    name: 'Lychee Tea',
    price: '20.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500',
    desc: 'Teh segar dengan rasa buah leci dan buah leci asli.'
  },
  {
    id: '18',
    name: 'Cookies & Cream',
    price: '30.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=500',
    desc: 'Minuman blend dengan biskuit oreo yang dihancurkan dan whipped cream.'
  },
  {
    id: '19',
    name: 'Mango Breeze',
    price: '25.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1697642452436-9c40773cbcbb?q=80&w',
    desc: 'Es mangga segar dengan perasan jeruk nipis dan daun mint.'
  },
  {
    id: '20',
    name: 'Avocado Smoothies',
    price: '28.000',
    category: 'Non-Coffee',
    image: 'https://plus.unsplash.com/premium_photo-1726852751697-2d1157466e44?q=80&w',
    desc: 'Smoothies alpukat kental dengan saus cokelat di pinggir gelas.'
  },

  // DESSERT (10)
  {
    id: '21',
    name: 'Butter Croissant',
    price: '18.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=500',
    desc: 'Pastry renyah dengan rasa mentega yang gurih.'
  },
  {
    id: '22',
    name: 'Chocolate Muffin',
    price: '20.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1616151030755-76f6cd987a06?q=80&w',
    desc: 'Kue muffin lembut dengan potongan cokelat melimpah.'
  },
  {
    id: '23',
    name: 'Cheese Cake',
    price: '32.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1635327173758-85badf17f995?q=80&w',
    desc: 'Kue keju lembut dengan tekstur yang melt di mulut.'
  },
  {
    id: '24',
    name: 'Tiramisu Cake',
    price: '30.000',
    category: 'Dessert',
    image: 'https://plus.unsplash.com/premium_photo-1695028378225-97fbe39df62a?q=80&w',
    desc: 'Dessert Italia klasik dengan aroma kopi yang kuat.'
  },
  {
    id: '25',
    name: 'Almond Danish',
    price: '22.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1613995163959-60a6a0c65ede?q=80&w',
    desc: 'Roti manis dengan taburan kacang almond renyah.'
  },
  {
    id: '26',
    name: 'Brownies Ice Cream',
    price: '28.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1702827402870-7c33dc7b67be?q=80&w',
    desc: 'Brownies panggang hangat disajikan dengan es krim vanilla.'
  },
  {
    id: '27',
    name: 'Cinnamon Roll',
    price: '21.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1583527976767-5399024eeb05?q=80&w',
    desc: 'Roti gulung kayu manis dengan icing gula yang manis.'
  },
  {
    id: '28',
    name: 'Blueberry Muffin',
    price: '20.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=500',
    desc: 'Muffin panggang dengan buah blueberry asli di dalamnya.'
  },
  {
    id: '29',
    name: 'Fudgy Brownies',
    price: '15.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=500',
    desc: 'Brownies kental dan kenyal dengan cokelat premium.'
  },
  {
    id: '30',
    name: 'Fruit Tart',
    price: '25.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=500',
    desc: 'Tart buah segar dengan vla vanilla yang lembut.'
  },
];