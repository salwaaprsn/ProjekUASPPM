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
    image: 'https://images.unsplash.com/photo-1534706936160-d5ee67737249?q=80&w=500',
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
    image: 'https://images.unsplash.com/photo-1536819114556-1e10f967fb61?q=80&w=500',
    desc: 'Teh hijau Jepang murni dicampur dengan susu segar.'
  },
  {
    id: '12',
    name: 'Dark Chocolate',
    price: '24.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1541491008689-b5d3c6615e83?q=80&w=500',
    desc: 'Cokelat hitam pekat yang tidak terlalu manis namun sangat creamy.'
  },
  {
    id: '13',
    name: 'Red Velvet',
    price: '26.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1615478503562-ec2e8aa0e24e?q=80&w=500',
    desc: 'Minuman rasa kue red velvet yang lembut di lidah.'
  },
  {
    id: '14',
    name: 'Taro Latte',
    price: '24.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1634603410943-16a70460c57c?q=80&w=500',
    desc: 'Rasa talas ungu yang unik dan manis.'
  },
  {
    id: '15',
    name: 'Strawberry Milk',
    price: '27.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=500',
    desc: 'Susu segar dengan selai strawberry buatan sendiri dan potongan buah asli.'
  },
  {
    id: '16',
    name: 'Thai Tea Premium',
    price: '22.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1621263764491-72740523477c?q=80&w=500',
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
    image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?q=80&w=500',
    desc: 'Es mangga segar dengan perasan jeruk nipis dan daun mint.'
  },
  {
    id: '20',
    name: 'Avocado Smoothies',
    price: '28.000',
    category: 'Non-Coffee',
    image: 'https://images.unsplash.com/photo-1610485303248-03482701f6ca?q=80&w=500',
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
    image: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?q=80&w=500',
    desc: 'Kue muffin lembut dengan potongan cokelat melimpah.'
  },
  {
    id: '23',
    name: 'Cheese Cake',
    price: '32.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1524351159078-8be8723c769a?q=80&w=500',
    desc: 'Kue keju lembut dengan tekstur yang melt di mulut.'
  },
  {
    id: '24',
    name: 'Tiramisu Cup',
    price: '30.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500',
    desc: 'Dessert Italia klasik dengan aroma kopi yang kuat.'
  },
  {
    id: '25',
    name: 'Almond Danish',
    price: '22.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1608198399988-341f712c3711?q=80&w=500',
    desc: 'Roti manis dengan taburan kacang almond renyah.'
  },
  {
    id: '26',
    name: 'Brownies Ice Cream',
    price: '28.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=500',
    desc: 'Brownies panggang hangat disajikan dengan es krim vanilla.'
  },
  {
    id: '27',
    name: 'Cinnamon Roll',
    price: '21.000',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500',
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