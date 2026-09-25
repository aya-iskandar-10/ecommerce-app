const image = (photoId) => `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=900&q=85`;

function makeProduct({ id, name, category, categoryId, subcategory, brand, price, oldPrice, stock, rating, reviewCount, tags, shortDescription, benefit, detail, images, features, badge }) {
  return {
    id,
    name,
    description: `${name} by ${brand} is made for ${benefit}, with ${detail}.`,
    shortDescription,
    category,
    categoryId,
    subcategory,
    brand,
    tags,
    rating,
    reviewCount,
    ...(badge ? { badge } : {}),
    sizeType: 'none',
    hasVariants: false,
    price,
    ...(oldPrice ? { oldPrice } : {}),
    stock,
    images: images.map(image),
    features: features.map(([label, value]) => ({ label, value })),
  };
}

function makeVariantProduct({ id, name, category, categoryId, subcategory, brand, sizeType, rating, reviewCount, tags, shortDescription, benefit, detail, features, badge, variants }) {
  return {
    id,
    name,
    description: `${name} by ${brand} is made for ${benefit}, with ${detail}.`,
    shortDescription,
    category,
    categoryId,
    subcategory,
    brand,
    tags,
    rating,
    reviewCount,
    ...(badge ? { badge } : {}),
    sizeType,
    hasVariants: true,
    variants: variants.map((variant) => ({
      id: `${id}-${variant.color.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      color: variant.color,
      colorCode: variant.colorCode,
      images: variant.images.map(image),
      price: variant.price,
      ...(variant.oldPrice ? { oldPrice: variant.oldPrice } : {}),
      sizes: variant.sizes,
    })),
    features: features.map(([label, value]) => ({ label, value })),
  };
}

const electronics = [
  ['Aurora Tablet 11', 'Tablets', 'Auraline', 249.99, 18, 4.7, 184, ['tablet', 'portable', 'work'], 'mobile work and study', 'a bright display and all-day battery', ['1523240795612-9a054b0db644', '1516321318423-f06f85e504b3'], [['Display', '11 inch'], ['Battery', '12 hours'], ['Storage', '128 GB']]],
  ['Pulse Pro Earbuds', 'Audio', 'Auraline', 79.99, 34, 4.6, 216, ['audio', 'earbuds', 'wireless'], 'commuting and calls', 'adaptive noise reduction in a pocket-sized case', ['1495740581664-3a3e7f3c2b7b', '1606220945770-d5b3b8f0a2d4'], [['Battery', '28 hours'], ['Controls', 'Touch']]],
  ['Elevate Laptop Stand', 'Computer Accessories', 'Northline', 54.0, 22, 4.5, 88, ['desk', 'laptop', 'office'], 'a more comfortable desk', 'a sturdy aluminum frame with six height positions', ['1496181133206-80ce9b88a853', '1497366811353-6870744d04b2'], [['Material', 'Aluminum'], ['Positions', '6']]],
  ['VoltGo Power Bank', 'Mobile Accessories', 'Voltwell', 39.99, 41, 4.4, 143, ['charging', 'power', 'travel'], 'days away from an outlet', 'fast USB-C charging in a slim travel-ready body', ['1609592424847-0b7c5e2f5ad0', '1609592424990-1f9bb9e6b2f1'], [['Capacity', '20,000 mAh'], ['Output', '30 W']]],
  ['StudioView 27 Monitor', 'Monitors', 'Frameworks', 279.0, 9, 4.8, 132, ['monitor', 'desk', 'creative'], 'focused work and creative projects', 'crisp color and a nearly borderless QHD panel', ['1527443224154-c4a3942d3acf', '1547119957-637f8679db1e'], [['Resolution', 'QHD'], ['Refresh rate', '100 Hz']]],
  ['ClearFrame Webcam', 'Computer Accessories', 'Frameworks', 69.5, 27, 4.3, 67, ['webcam', 'video', 'work'], 'clear calls and recordings', 'a wide-angle lens with automatic light correction', ['1587825140708-dfaf72ae4b04', '1497366754035-f200968a6e72'], [['Resolution', '1080p'], ['Microphones', 'Dual']]],
  ['MeshLink Wi-Fi 6 Router', 'Networking', 'Signal House', 119.0, 14, 4.6, 93, ['router', 'wifi', 'home'], 'reliable whole-home coverage', 'fast Wi-Fi 6 performance for busy connected spaces', ['1558494949-ef010cbdcc31', '1518770660439-4636190af475'], [['Coverage', '2,000 sq ft'], ['Standard', 'Wi-Fi 6']]],
  ['Harbor Bluetooth Speaker', 'Audio', 'Soundcraft', 89.99, 31, 4.7, 174, ['speaker', 'audio', 'bluetooth'], 'music at home or outdoors', 'warm room-filling sound from a water-resistant shell', ['1608043152269-423dbba4e7e8', '1602874801006-0e7d27b8f0d4'], [['Battery', '18 hours'], ['Resistance', 'IP67']]],
  ['Everyday Shield Case', 'Mobile Accessories', 'Cover Co', 24.0, 56, 4.2, 71, ['phone-case', 'protection', 'mobile'], 'protecting a daily phone', 'a slim shock-absorbing shell with a soft-touch finish', ['1556656793-08538906a9f8', '1551817958-d9d369f8f3bc'], [['Material', 'Recycled TPU'], ['Protection', '2 m drop']]],
  ['ChargeDock Trio', 'Charging', 'Voltwell', 64.99, 19, 4.5, 109, ['charging', 'desk', 'wireless'], 'a tidy bedside or desk setup', 'one compact stand for a phone, watch, and earbuds', ['1586953208448-b95a79798f07', '1551721434-56a0d7f7e8d9'], [['Devices', '3 at once'], ['Connection', 'USB-C']]],
  ['PageTurn E-Reader', 'E-Readers', 'Leafline', 139.0, 16, 4.7, 148, ['reading', 'ebook', 'travel'], 'reading anywhere', 'a glare-free display with weeks of battery life', ['1544947950-fa07a98d237f', '1512820790803-83ca734da794'], [['Display', '6.8 inch'], ['Storage', '16 GB']]],
  ['LinkHub USB-C Dock', 'Computer Accessories', 'Northline', 84.5, 24, 4.4, 57, ['usb', 'laptop', 'office'], 'a flexible hybrid-work desk', 'seven useful ports in a compact anodized shell', ['1625842268584-8f3296236761', '1517336714739-489689fd1ca8'], [['Ports', '7'], ['Video', '4K HDMI']]],
  ['Glide Silent Mouse', 'Computer Accessories', 'Northline', 34.99, 48, 4.3, 129, ['mouse', 'office', 'wireless'], 'quiet focused work', 'a precise ergonomic mouse with silent switches', ['1527814050087-3793815479db', '1527430253228-e93688616381'], [['Connection', 'Bluetooth'], ['Battery', '18 months']]],
  ['PocketBeam Projector', 'Home Electronics', 'LumaWorks', 229.0, 8, 4.5, 82, ['projector', 'movie-night', 'portable'], 'movie nights in small spaces', 'a portable HD projector with simple wireless casting', ['1492724441997-5dc865305da7', '1593784991095-a205069470b6'], [['Resolution', '1080p'], ['Brightness', '400 ANSI']]],
  ['Halo Smart Bulb Set', 'Smart Home', 'LumaWorks', 42.0, 38, 4.4, 96, ['lighting', 'smart-home', 'bulb'], 'rooms that shift with the mood', 'color-tunable bulbs with schedules and voice control', ['1507473885765-e6ed057f782c', '1513506003901-1e6a229e2d15'], [['Pieces', '4 bulbs'], ['Control', 'App and voice']]],
  ['BreathePure Mini', 'Home Electronics', 'Airwell', 149.99, 12, 4.6, 73, ['air-purifier', 'home', 'wellness'], 'cleaner air in personal spaces', 'quiet three-stage filtration for bedrooms and desks', ['1615874694520-474822394f20', '1585771724684-8d7a0c2a3d5e'], [['Filter', 'HEPA H13'], ['Room size', '250 sq ft']]],
  ['Instant Bloom Camera', 'Cameras', 'Flicker', 99.0, 21, 4.5, 104, ['camera', 'photography', 'instant'], 'small moments worth keeping', 'a cheerful instant camera with a built-in flash', ['1516035069371-29a1b244cc32', '1526170375885-4d8ecf77b99f'], [['Film', 'Instant'], ['Flash', 'Built-in']]],
  ['TypeMate Tablet Keyboard', 'Computer Accessories', 'Keyline', 74.0, 17, 4.2, 48, ['keyboard', 'tablet', 'mobile'], 'turning a tablet into a workspace', 'a low-profile keyboard case with a comfortable hinge', ['1587829741301-dc798b83add3', '1595225476474-87563907a212'], [['Layout', 'Compact'], ['Battery', '90 days']]],
  ['RoadEye Dash Camera', 'Car Electronics', 'Signal House', 119.99, 13, 4.5, 91, ['dashcam', 'car', 'travel'], 'more confidence on the road', 'a compact camera with night recording and loop storage', ['1449965408869-eaa3f722e40d', '1502877338535-766e1452684a'], [['Video', '1440p'], ['Storage', '128 GB']]],
  ['PocketVault SSD', 'Storage', 'Frameworks', 109.0, 26, 4.8, 64, ['storage', 'ssd', 'laptop'], 'moving large files quickly', 'a durable pocket SSD for work, photos, and travel', ['1597872200969-09f7e63b7a7f', '1531297484001-80022131f5a1'], [['Capacity', '1 TB'], ['Interface', 'USB-C']]],
  ['Scout Mini Drone', 'Cameras', 'Flicker', 249.0, 6, 4.4, 39, ['drone', 'camera', 'outdoors'], 'a new perspective outdoors', 'a foldable camera drone with assisted flight controls', ['1473968512647-3e447244af8f', '1508614589041-895b88991e3e'], [['Flight time', '24 minutes'], ['Camera', '4K']]],
  ['CableNest Organizer', 'Mobile Accessories', 'Gathered Goods', 18.5, 63, 4.1, 55, ['cables', 'organization', 'travel'], 'a calmer tech drawer', 'a recycled-fabric organizer with labeled elastic loops', ['1558618666-fcd25c85cd64', '1524758631624-e2822e304c36'], [['Material', 'Recycled felt'], ['Loops', '8']]],
];

const fashion = [
  { id: 33, name: 'Everyday Pullover Hoodie', subcategory: 'Clothing', brand: 'North Thread', sizeType: 'clothing', price: 58, oldPrice: 72, rating: 4.6, reviewCount: 143, tags: ['hoodie', 'cotton', 'casual'], shortDescription: 'A soft layer for cool mornings.', benefit: 'easy everyday layering', detail: 'brushed organic cotton fleece', features: [['Material', 'Organic cotton'], ['Fit', 'Relaxed']], variants: [{ color: 'Oat', colorCode: '#D7C7B5', images: ['1503342217505-b0a15ec3261c', '1515886657613-9f3515b0c78f'], price: 58, oldPrice: 72, sizes: { S: 8, M: 14, L: 11, XL: 5 } }, { color: 'Forest', colorCode: '#30584C', images: ['1512436991641-6745cdb1723f', '1551488831-00ddcb6c6bd3'], price: 58, oldPrice: 72, sizes: { S: 6, M: 10, L: 9, XL: 4 } }] },
  { id: 34, name: 'Straight Leg Denim', subcategory: 'Clothing', brand: 'Harbor Denim', sizeType: 'clothing', price: 79, rating: 4.5, reviewCount: 96, tags: ['jeans', 'denim', 'wardrobe'], shortDescription: 'A reliable fit for every day.', benefit: 'building an easy wardrobe', detail: 'midweight stretch denim', features: [['Rise', 'Mid-rise'], ['Fit', 'Straight leg']], variants: [{ color: 'Indigo', colorCode: '#263C5A', images: ['1542272604-787c3835535d', '1541099649105-f69ad21f3246'], price: 79, sizes: { S: 5, M: 12, L: 12, XL: 6 } }, { color: 'Washed Black', colorCode: '#252525', images: ['1548883354-7622d03aca27', '1552374196-c4e7ffc6e126'], price: 79, sizes: { S: 4, M: 9, L: 8, XL: 4 } }] },
  { id: 35, name: 'Court Low Sneakers', subcategory: 'Footwear', brand: 'Common Ground', sizeType: 'shoe', price: 88, oldPrice: 110, rating: 4.7, reviewCount: 181, tags: ['sneakers', 'shoes', 'casual'], shortDescription: 'Clean lines for off-duty days.', benefit: 'comfortable city walking', detail: 'cushioned rubber soles and a leather upper', features: [['Upper', 'Leather'], ['Sole', 'Rubber']], variants: [{ color: 'White', colorCode: '#F7F7F4', images: ['1549298916-b41d501d3772', '1525966222134-bcff17fb4b0e'], price: 88, oldPrice: 110, sizes: { '40': 6, '41': 12, '42': 14, '43': 8 } }, { color: 'Green', colorCode: '#597565', images: ['1552346154-21d32810aba3', '1460353581641-37baddab0fa2'], price: 88, oldPrice: 110, sizes: { '40': 4, '41': 9, '42': 11, '43': 5 } }] },
  { id: 36, name: 'Linen Camp Shirt', subcategory: 'Clothing', brand: 'Sunward', sizeType: 'clothing', price: 64, rating: 4.4, reviewCount: 57, tags: ['shirt', 'linen', 'summer'], shortDescription: 'Lightweight ease for warm days.', benefit: 'breathable warm-weather dressing', detail: 'washed linen with a relaxed collar', features: [['Material', 'Linen'], ['Care', 'Machine wash']], variants: [{ color: 'Sand', colorCode: '#D4C2A8', images: ['1551488831-00ddcb6c6bd3', '1525507119028-ed4c629a60a3'], price: 64, sizes: { S: 5, M: 10, L: 8, XL: 3 } }, { color: 'Blue', colorCode: '#527895', images: ['1562157873-818bc0726f68', '1529139574466-a303027c1d8b'], price: 64, sizes: { S: 6, M: 11, L: 7, XL: 4 } }] },
  { id: 37, name: 'Merino Cardigan', subcategory: 'Knitwear', brand: 'Morrow Knit', sizeType: 'clothing', price: 98, oldPrice: 125, rating: 4.8, reviewCount: 84, tags: ['cardigan', 'merino', 'layering'], shortDescription: 'A refined layer with soft warmth.', benefit: 'polished transitional layering', detail: 'fine merino wool with a neat button front', features: [['Material', 'Merino wool'], ['Weight', 'Lightweight']], variants: [{ color: 'Camel', colorCode: '#B38A63', images: ['1576566588028-4147f3842f27', '1541099649105-f69ad21f3246'], price: 98, oldPrice: 125, sizes: { S: 4, M: 8, L: 7, XL: 3 } }, { color: 'Navy', colorCode: '#1F324B', images: ['1525507119028-ed4c629a60a3', '1503342217505-b0a15ec3261c'], price: 98, oldPrice: 125, sizes: { S: 5, M: 9, L: 8, XL: 4 } }] },
  { id: 38, name: 'Pleated Midi Skirt', subcategory: 'Clothing', brand: 'Fabric Co', sizeType: 'clothing', price: 72, rating: 4.5, reviewCount: 63, tags: ['skirt', 'pleated', 'smart-casual'], shortDescription: 'Movement and polish in equal measure.', benefit: 'easy desk-to-dinner dressing', detail: 'fluid pleats with a comfortable elastic waist', features: [['Length', 'Midi'], ['Waist', 'Elasticated']], variants: [{ color: 'Black', colorCode: '#222222', images: ['1583496661160-fb5886a13d27', '1551488831-00ddcb6c6bd3'], price: 72, sizes: { S: 5, M: 8, L: 6, XL: 2 } }, { color: 'Rust', colorCode: '#A75B45', images: ['1583846783214-722a4f2a7c1d', '1566174053879-31528523f8ae'], price: 72, sizes: { S: 4, M: 7, L: 5, XL: 2 } }] },
  { id: 39, name: 'Stretch Chinos', subcategory: 'Clothing', brand: 'Common Ground', sizeType: 'clothing', price: 69, rating: 4.3, reviewCount: 72, tags: ['chinos', 'trousers', 'everyday'], shortDescription: 'Smart comfort for busy weeks.', benefit: 'workdays and weekends', detail: 'flexible cotton twill with a clean tapered leg', features: [['Fabric', 'Cotton twill'], ['Fit', 'Tapered']], variants: [{ color: 'Khaki', colorCode: '#B5A27E', images: ['1473966968600-fa801b869a1a', '1506629905607-d9b1b30a5c58'], price: 69, sizes: { S: 6, M: 11, L: 10, XL: 4 } }, { color: 'Charcoal', colorCode: '#4B4C4D', images: ['1515886657613-9f3515b0c78f', '1552374196-c4e7ffc6e126'], price: 69, sizes: { S: 5, M: 9, L: 8, XL: 3 } }] },
  ['Washed Denim Jacket', 'Outerwear', 'Harbor Denim', 109, 14, 4.7, 118, ['jacket', 'denim', 'layering'], 'a dependable layer for changing weather', 'a softly broken-in denim shell with roomy pockets', ['1517841905240-472988babdf9', '1529139574466-a303027c1d8b'], [['Fabric', 'Cotton denim'], ['Pockets', '4']], null],
  ['Daily Jogger', 'Clothing', 'North Thread', 62, 27, 4.5, 101, ['joggers', 'lounge', 'cotton'], 'comfortable travel and lounge days', 'a tapered fleece jogger with a clean finish', ['1548883354-7622d03aca27', '1503342217505-b0a15ec3261c'], [['Fabric', 'Cotton fleece'], ['Waist', 'Drawstring']], null],
  ['Satin Slip Dress', 'Dresses', 'Serein Studio', 84, 4.6, 89, ['dress', 'satin', 'occasion'], 'simple evening dressing', 'a fluid bias cut with adjustable straps', ['1566174053879-31528523f8ae', '1595777457583-877c7c7f3b9f'], [['Fabric', 'Satin'], ['Length', 'Midi']], null],
  ['Everyday Polo', 'Clothing', 'Sunward', 48, 4.4, 77, ['polo', 'cotton', 'smart-casual'], 'casual polish', 'soft pique cotton with a neat ribbed collar', ['1521572163474-6864f9cf17ab', '1551488831-00ddcb6c6bd3'], [['Fabric', 'Pique cotton'], ['Fit', 'Regular']], null],
  ['Unstructured Blazer', 'Tailoring', 'North & Hide', 148, 179, 4.6, 61, ['blazer', 'tailoring', 'office'], 'light tailoring without the stiffness', 'a soft shoulder and breathable half lining', ['1507679799987-c73779587ccf', '1594938298603-c8148c4dae35'], [['Lining', 'Half lined'], ['Fit', 'Relaxed']], null],
  ['Ribbed Beanie', 'Accessories', 'Morrow Knit', 28, 4.5, 54, ['beanie', 'knit', 'winter'], 'cold-weather comfort', 'a warm ribbed knit with a soft folded cuff', ['1576871337632-b9c2f5e5b5d9', '1515886657613-9f3515b0c78f'], [['Material', 'Wool blend'], ['Fit', 'One size']], null],
  ['Everyday Sunglasses', 'Accessories', 'Fathom', 58, 4.4, 105, ['sunglasses', 'accessories', 'summer'], 'bright days and easy style', 'polarized lenses in a lightweight acetate frame', ['1511499767150-a48a237f0083', '1508296695146-7a1f149e1c3c'], [['Lens', 'Polarized'], ['Frame', 'Acetate']], null],
  ['Leather Belt', 'Accessories', 'North & Hide', 46, 4.6, 72, ['belt', 'leather', 'accessories'], 'finishing everyday outfits', 'full-grain leather with a brushed metal buckle', ['1553062407-98eeb64c6a62', '1624222247344-8a4e8c4a8e8c'], [['Material', 'Full-grain leather'], ['Buckle', 'Brushed steel']], null],
  ['Soft Wool Scarf', 'Accessories', 'Morrow Knit', 52, 4.7, 83, ['scarf', 'wool', 'winter'], 'warmth without bulk', 'a generous brushed weave in a versatile neutral', ['1523381210434-271e8be1f52b', '1548883354-7622d03aca27'], [['Material', 'Wool blend'], ['Length', '180 cm']], null],
  ['Canvas Market Tote', 'Bags & Accessories', 'Gathered Goods', 34, 4.5, 67, ['tote', 'canvas', 'bags'], 'market trips and daily carry', 'heavyweight canvas with an interior pocket', ['1553062407-98eeb64c6a62', '1590874103328-eac38a683ce7'], [['Material', 'Canvas'], ['Capacity', '18 litres']], null],
  { id: 50, name: 'Suede Loafers', subcategory: 'Footwear', brand: 'Common Ground', sizeType: 'shoe', price: 118, rating: 4.6, reviewCount: 49, tags: ['loafers', 'suede', 'shoes'], shortDescription: 'A relaxed step up from sneakers.', benefit: 'smart casual days', detail: 'supple suede and a flexible cup sole', features: [['Upper', 'Suede'], ['Sole', 'Rubber']], variants: [{ color: 'Tan', colorCode: '#B9855B', images: ['1533867617858-e7b97e060509', '1549298916-b41d501d3772'], price: 118, sizes: { '40': 4, '41': 7, '42': 8, '43': 5 } }, { color: 'Black', colorCode: '#242424', images: ['1542291026-7eec264c27ff', '1525966222134-bcff17fb4b0e'], price: 118, sizes: { '40': 3, '41': 6, '42': 7, '43': 4 } }] },
  ['Packable Raincoat', 'Outerwear', 'Sunward', 96, 4.4, 38, ['raincoat', 'outerwear', 'travel'], 'unpredictable travel weather', 'a water-resistant shell that folds into its own pocket', ['1529139574466-a303027c1d8b', '1515886657613-9f3515b0c78f'], [['Waterproofing', '10K'], ['Pack size', 'Pocket']], null],
  ['Utility Cargo Shorts', 'Clothing', 'Harbor Denim', 54, 4.3, 52, ['shorts', 'cargo', 'summer'], 'active summer weekends', 'durable cotton ripstop with useful side pockets', ['1503342217505-b0a15ec3261c', '1515886657613-9f3515b0c78f'], [['Fabric', 'Cotton ripstop'], ['Pockets', '6']], null],
  ['Textured Knit Sweater', 'Knitwear', 'North Thread', 88, 4.5, 73, ['sweater', 'knitwear', 'layering'], 'cool-weather layering', 'a textured stitch with a comfortable relaxed shape', ['1576566588028-4147f3842f27', '1503342217505-b0a15ec3261c'], [['Material', 'Cotton blend'], ['Knit', 'Textured']], null],
  ['Canvas Slip-ons', 'Footwear', 'Common Ground', 61, 4.4, 66, ['slip-ons', 'shoes', 'canvas'], 'quick everyday errands', 'easy elastic-sided canvas shoes with cushioned insoles', ['1525966222134-bcff17fb4b0e', '1549298916-b41d501d3772'], [['Upper', 'Canvas'], ['Insole', 'Cushioned']], null],
  ['Soft Crossbody Bag', 'Bags & Accessories', 'North & Hide', 76, 4.7, 91, ['crossbody', 'bag', 'leather'], 'hands-free city days', 'a compact leather bag with considered internal pockets', ['1548036328-c9fa89d128fa', '1553062407-98eeb64c6a62'], [['Material', 'Leather'], ['Strap', 'Adjustable']], null],
];

const beauty = [
  ['Daily Balance Cleanser', 'Skincare', 'Serein', 24, 48, 4.6, 112, ['cleanser', 'skincare', 'gentle'], 'a calm, comfortable cleanse', 'a low-foam gel with oat and panthenol', ['1556228578-0d85b1a4d571', '1571781926291-c477ebfd024b'], [['Size', '150 ml'], ['Skin type', 'All skin']]],
  ['Cloud Veil Moisturizer', 'Skincare', 'Serein', 32, 37, 4.7, 158, ['moisturizer', 'skincare', 'hydration'], 'lightweight daily hydration', 'a barrier-supporting cream with ceramides', ['1556228720-195a672e8a03', '1611930022073-b7a4ba5fcccd'], [['Size', '50 ml'], ['Finish', 'Natural']]],
  ['Mineral SPF 40', 'Sun Care', 'Solace Beauty', 28, 42, 4.5, 89, ['spf', 'sun-care', 'skincare'], 'daily sun protection', 'a sheer mineral formula that sits well under makeup', ['1556228578-0d85b1a4d571', '1556229010-9c3f0e0a8e8f'], [['Protection', 'SPF 40'], ['Finish', 'Sheer']]],
  ['Rosewater Face Mist', 'Skincare', 'Botanica', 19, 4.4, 63, ['face-mist', 'botanical', 'skincare'], 'a quick refreshing reset', 'a fine mist of rosewater and glycerin', ['1556228720-195a672e8a03', '1515377905703-c4788e51af15'], [['Size', '100 ml'], ['Scent', 'Rose']]],
  ['Soft Focus Foundation', 'Makeup', 'Lumen Beauty', 42, 4.5, 96, ['foundation', 'makeup', 'complexion'], 'even, natural-looking coverage', 'buildable coverage with a soft satin finish', ['1522335789203-aabd1fc54bc9', '1512496015851-a90fb38ba796'], [['Coverage', 'Medium'], ['Finish', 'Satin']]],
  ['Velvet Line Mascara', 'Makeup', 'Lumen Beauty', 26, 4.6, 137, ['mascara', 'makeup', 'eyes'], 'defined lashes with a soft finish', 'a flexible brush that separates without clumps', ['1512496015851-a90fb38ba796', '1522335789203-aabd1fc54bc9'], [['Wear', '12 hours'], ['Brush', 'Tapered']]],
  ['Tinted Lip Balm', 'Makeup', 'Lumen Beauty', 18, 4.3, 74, ['lip-balm', 'makeup', 'tinted'], 'comfortable color on busy days', 'a nourishing balm with a sheer berry tint', ['1586495777744-4413f21062fa', '1586495777744-4413f21062fa'], [['Finish', 'Sheer'], ['Care', 'Jojoba oil']]],
  ['Cedar Hand Wash', 'Bath & Body', 'Field Notes', 22, 4.5, 58, ['hand-wash', 'bath', 'cedar'], 'a more considered daily ritual', 'a gentle plant-based wash with a clean cedar scent', ['1608248543803-ba4f8c70ae0b', '1608571423902-eed4a5ad8108'], [['Size', '300 ml'], ['Scent', 'Cedar']]],
  ['Quiet Hour Body Oil', 'Bath & Body', 'Botanica', 36, 4.7, 82, ['body-oil', 'wellness', 'skincare'], 'slow evenings and soft skin', 'a dry-touch blend of jojoba and meadowfoam oils', ['1608571423902-eed4a5ad8108', '1556229010-9c3f0e0a8e8f'], [['Size', '100 ml'], ['Finish', 'Dry touch']]],
  ['Everyday Shampoo', 'Hair Care', 'Field Notes', 21, 4.4, 71, ['shampoo', 'hair-care', 'clean'], 'a balanced hair-wash routine', 'a gentle cleanser with rice protein and aloe', ['1527799820374-dcf8d9d4a388', '1535585209827-5162fef1d5b9'], [['Size', '400 ml'], ['Hair type', 'All hair']]],
  ['Repair Conditioner', 'Hair Care', 'Field Notes', 23, 4.5, 69, ['conditioner', 'hair-care', 'repair'], 'soft, manageable hair', 'a smoothing conditioner with amino acids', ['1527799820374-dcf8d9d4a388', '1535585209827-5162fef1d5b9'], [['Size', '400 ml'], ['Formula', 'Amino acids']]],
  ['Linen & Iris Eau de Parfum', 'Fragrances', 'Serein', 78, 4.8, 121, ['perfume', 'fragrance', 'iris'], 'a quiet signature scent', 'clean iris, linen, and pale cedar in a close-wearing blend', ['1541643600914-78b084683601', '1594035910387-fea47794261f'], [['Size', '50 ml'], ['Family', 'Woody floral']]],
  ['Citrus Grove Eau de Toilette', 'Fragrances', 'Solace Beauty', 59, 4.5, 44, ['fragrance', 'citrus', 'perfume'], 'bright starts and warm afternoons', 'bergamot, neroli, and green leaves with a dry finish', ['1594035910387-fea47794261f', '1563170351-be82bc888aa4'], [['Size', '50 ml'], ['Family', 'Citrus']]],
  ['Calm Clay Mask', 'Skincare', 'Botanica', 29, 4.4, 52, ['face-mask', 'clay', 'skincare'], 'a weekly skin reset', 'a gentle kaolin mask with calendula and aloe', ['1556228578-0d85b1a4d571', '1611930022073-b7a4ba5fcccd'], [['Size', '75 ml'], ['Skin type', 'Combination']]],
];

const homeLiving = [
  ['BrewMate Pour-Over Set', 'Kitchen Appliances', 'Morrow', 48, 4.7, 124, ['coffee', 'pour-over', 'kitchen'], 'a slower morning coffee ritual', 'a ceramic dripper, server, and reusable filter', ['1495474472287-4d71bcdd2085', '1517668808822-9ebb02f2a0e6'], [['Pieces', '3'], ['Material', 'Ceramic']]],
  ['Linen Table Runner', 'Textiles', 'Gather', 32, 4.5, 63, ['table-linen', 'home', 'dining'], 'a considered dining table', 'washed linen with a softly frayed edge', ['1577140917170-285929a8b4e3', '1600494603989-9650cf6d1c9b'], [['Material', 'Linen'], ['Length', '180 cm']]],
  ['Stoneware Dinner Set', 'Dining', 'Gather', 96, 4.6, 88, ['dinnerware', 'ceramic', 'kitchen'], 'everyday meals and slow hosting', 'hand-finished stoneware in a quiet neutral glaze', ['1603199506016-b9a594b593c2', '1601050690597-df0568f70950'], [['Pieces', '16'], ['Material', 'Stoneware']]],
  ['Cloud Knit Throw', 'Textiles', 'Morrow Home', 74, 4.8, 116, ['throw', 'blanket', 'home'], 'quiet reading corners', 'a generous textured knit that adds soft warmth', ['1505693416388-ac5ce068fe85', '1519710164239-da123dc03ef4'], [['Material', 'Cotton blend'], ['Size', '130 x 180 cm']]],
  ['Rattan Storage Basket', 'Storage', 'Field & Form', 42, 4.4, 51, ['basket', 'storage', 'home'], 'a calmer open shelf', 'handwoven rattan with sturdy integrated handles', ['1586023492125-27b2c045efd7', '1616486338812-3dadae4b4ace'], [['Material', 'Rattan'], ['Use', 'Indoor']]],
  ['Arc Floor Lamp', 'Lighting', 'Luma', 189, 219, 4.6, 97, ['lamp', 'lighting', 'home'], 'a warm reading corner', 'a curved metal stem with a linen drum shade', ['1507473885765-e6ed057f782c', '1513506003901-1e6a229e2d15'], [['Light', 'Warm LED'], ['Height', '165 cm']]],
  ['Linen Cushion Cover', 'Textiles', 'Morrow Home', 24, 4.3, 42, ['cushion', 'linen', 'decor'], 'small seasonal home updates', 'a washed linen cover with a hidden zip', ['1584100936595-c0654b55a5a9', '1618220179428-22790b461013'], [['Material', 'Linen'], ['Size', '45 x 45 cm']]],
  ['Oak Wall Shelf', 'Furniture', 'Field & Form', 88, 4.5, 37, ['shelf', 'oak', 'storage'], 'displaying the things you love', 'solid oak with a clean floating profile', ['1594620302200-9a72e1f8f6f8', '1505693416388-ac5ce068fe85'], [['Material', 'Oak'], ['Width', '60 cm']]],
  ['Bamboo Laundry Hamper', 'Storage', 'Field & Form', 69, 4.4, 45, ['laundry', 'basket', 'bamboo'], 'keeping laundry beautifully contained', 'a ventilated bamboo hamper with a washable liner', ['1586023492125-27b2c045efd7', '1618220179428-22790b461013'], [['Material', 'Bamboo'], ['Liner', 'Cotton']]],
  ['Scented Soy Candle', 'Home Fragrance', 'Serein Home', 28, 4.7, 143, ['candle', 'home-fragrance', 'soy'], 'a softer evening atmosphere', 'a hand-poured soy candle with cedar and amber notes', ['1603006905003-44b0f5c6f8a4', '1602607204004-178b5d72c14a'], [['Burn time', '45 hours'], ['Wax', 'Soy']]],
  ['Daily Reed Diffuser', 'Home Fragrance', 'Serein Home', 34, 4.5, 91, ['diffuser', 'home-fragrance', 'scent'], 'a gentle room scent', 'a low-maintenance diffuser with fig and sandalwood notes', ['1603006905003-44b0f5c6f8a4', '1608571423902-eed4a5ad8108'], [['Volume', '100 ml'], ['Duration', '8 weeks']]],
  ['Compact Tool Kit', 'Home Tools', 'Gathered Goods', 52, 4.6, 76, ['tools', 'home', 'repair'], 'small home fixes', 'a compact set of useful tools in a zip case', ['1581147036324-c17b68b9e9b4', '1586864387967-d02ef85d93e8'], [['Pieces', '24'], ['Case', 'Canvas']]],
];

const sports = [
  { id: 82, name: 'Trail Running Shoes', subcategory: 'Footwear', brand: 'Stride', sizeType: 'shoe', price: 116, oldPrice: 140, rating: 4.8, reviewCount: 138, tags: ['running', 'trail', 'shoes'], shortDescription: 'Grip and confidence for uneven ground.', benefit: 'weekend trail miles', detail: 'responsive cushioning with a lugged outsole', features: [['Upper', 'Ripstop mesh'], ['Sole', 'Trail rubber']], variants: [{ color: 'Clay', colorCode: '#B8654E', images: ['1542291026-7eec264c27ff', '1460353581641-37baddab0fa2'], price: 116, oldPrice: 140, sizes: { '40': 5, '41': 9, '42': 11, '43': 7 } }, { color: 'Black', colorCode: '#20252A', images: ['1525966222134-bcff17fb4b0e', '1437958629152-8afc4249fdf4'], price: 116, oldPrice: 140, sizes: { '40': 4, '41': 8, '42': 10, '43': 6 } }] },
  ['Core Training Mat', 'Training', 'Form Lab', 38, 4.6, 94, ['yoga', 'fitness', 'mat'], 'comfortable floor training', 'a dense non-slip surface with easy roll-up straps', ['1544367567-0f2fcb009e0b', '1518611012118-696072aa579a'], [['Thickness', '6 mm'], ['Material', 'TPE']]],
  ['Insulated Water Bottle', 'Hydration', 'Summit Supply', 32, 4.7, 127, ['bottle', 'hydration', 'outdoors'], 'cold water on the move', 'double-wall steel that keeps drinks cold for a full day', ['1602143407151-7111542de6e8', '1550504883-8f9d2f7d4f8b'], [['Capacity', '750 ml'], ['Insulation', '24 hours']]],
  ['Flex Resistance Bands', 'Training', 'Form Lab', 26, 4.5, 61, ['fitness', 'bands', 'training'], 'strength work anywhere', 'five resistance levels with a carry pouch', ['1517836357463-d25dfeac3438', '1583454110551-21f2fa2afe61'], [['Levels', '5'], ['Material', 'Latex-free']]],
  ['Aero Cycling Helmet', 'Cycling', 'Summit Supply', 84, 4.6, 72, ['cycling', 'helmet', 'safety'], 'confident everyday rides', 'a ventilated lightweight shell with an adjustable fit', ['1558981806-ec527fa84c39', '1502744688674-c619d1586c9e'], [['Weight', '280 g'], ['Fit', 'Adjustable']]],
  ['Performance Running Tee', 'Clothing', 'Stride', 44, 4.4, 58, ['running', 'shirt', 'sports'], 'cooler training sessions', 'quick-drying fabric with reflective details', ['1552674605-db6ffd4facb5', '1521572163474-6864f9cf17ab'], [['Fabric', 'Recycled polyester'], ['Dry time', 'Quick']]],
  ['Recovery Massage Ball', 'Recovery', 'Form Lab', 18, 4.5, 43, ['recovery', 'massage', 'fitness'], 'post-workout recovery', 'firm textured pressure for targeted muscle release', ['1599058917212-d750089bc07e', '1517832207067-4db24a2ae47c'], [['Material', 'Cork'], ['Diameter', '7 cm']]],
  ['Foldable Picnic Blanket', 'Outdoors', 'Campwell', 58, 4.7, 83, ['picnic', 'outdoors', 'blanket'], 'park days and outdoor lunches', 'a water-resistant blanket that folds into a carry tote', ['1500530855697-b586d89ba3ee', '1473445361085-b9a07f55608b'], [['Surface', 'Water-resistant'], ['Size', '140 x 180 cm']]],
  ['Lightweight Hiking Pack', 'Bags', 'Campwell', 92, 4.6, 67, ['hiking', 'backpack', 'outdoors'], 'day hikes and short escapes', 'a ventilated 20-litre pack with useful trail pockets', ['1551632811-561732d1e306', '1553062407-98eeb64c6a62'], [['Capacity', '20 litres'], ['Back', 'Ventilated']]],
];

const accessories = [
  ['Slim Card Wallet', 'Wallets', 'North & Hide', 42, 4.6, 89, ['wallet', 'leather', 'accessories'], 'a lighter everyday carry', 'vegetable-tanned leather with six card slots', ['1627123424574-724758594e93', '1553062407-98eeb64c6a62'], [['Material', 'Leather'], ['Slots', '6']]],
  ['Travel Passport Holder', 'Travel Accessories', 'Gathered Goods', 36, 4.4, 48, ['travel', 'passport', 'organizer'], 'keeping travel documents together', 'a slim holder with card and boarding-pass slots', ['1553062407-98eeb64c6a62', '1517841905240-472988babdf9'], [['Material', 'Vegan leather'], ['Slots', '4']]],
  ['Everyday Key Clip', 'Small Accessories', 'North & Hide', 22, 4.5, 61, ['keys', 'leather', 'carry'], 'a tidier pocket or bag', 'a sturdy clip with a vegetable-tanned leather tab', ['1553062407-98eeb64c6a62', '1624222247344-8a4e8c4a8e8c'], [['Material', 'Leather'], ['Hardware', 'Steel']]],
  ['Canvas Camera Strap', 'Camera Accessories', 'Fathom', 39, 4.3, 34, ['camera', 'strap', 'canvas'], 'comfortable camera carry', 'wide woven canvas with secure metal adjusters', ['1516035069371-29a1b244cc32', '1526170375885-4d8ecf77b99f'], [['Material', 'Canvas'], ['Width', '4 cm']]],
  ['Leather Watch Roll', 'Travel Accessories', 'North & Hide', 68, 4.7, 41, ['watch', 'travel', 'leather'], 'protecting watches while traveling', 'a soft lined roll for two favorite watches', ['1518544887879-9d2d6b7e2d83', '1553062407-98eeb64c6a62'], [['Capacity', '2 watches'], ['Lining', 'Microfiber']]],
  ['Oversized Canvas Cap', 'Hats', 'Sunward', 29, 4.4, 57, ['cap', 'canvas', 'summer'], 'easy sun coverage', 'a six-panel cap with an adjustable back strap', ['1521369909029-2d1e41c7d8a9', '1515886657613-9f3515b0c78f'], [['Material', 'Cotton canvas'], ['Fit', 'Adjustable']]],
  ['Packable Travel Umbrella', 'Travel Accessories', 'Campwell', 31, 4.2, 39, ['umbrella', 'travel', 'rain'], 'surprise showers', 'a compact wind-resistant umbrella with a sleeve', ['1515694346937-94d85e41e6f0', '1517841905240-472988babdf9'], [['Length', '28 cm'], ['Feature', 'Wind-resistant']]],
  ['Minimalist Hair Claw Set', 'Hair Accessories', 'Serein Studio', 16, 4.5, 73, ['hair', 'accessories', 'claw'], 'quick, polished hair days', 'three strong acetate clips in soft neutral tones', ['1522335789203-aabd1fc54bc9', '1512496015851-a90fb38ba796'], [['Pieces', '3'], ['Material', 'Acetate']]],
  ['Travel Jewelry Case', 'Travel Accessories', 'Gathered Goods', 44, 4.6, 52, ['jewelry', 'travel', 'organizer'], 'keeping small pieces organized', 'a compact zip case with ring and earring sections', ['1515562141207-7a88fb7ce338', '1506630448388-4e683c67ddb0'], [['Material', 'Vegan leather'], ['Sections', '6']]],
  ['Braided Phone Lanyard', 'Mobile Accessories', 'Cover Co', 19, 4.3, 46, ['phone', 'lanyard', 'carry'], 'hands-free days and travel', 'a soft braided lanyard with a secure phone tab', ['1556656793-08538906a9f8', '1551817958-d9d369f8f3bc'], [['Length', 'Adjustable'], ['Material', 'Nylon']]],
];

const categoryProducts = (items, category, categoryId, startId) => items.map((item, index) => {
  if (item.id) return makeVariantProduct({ ...item, category, categoryId });
  const [name, subcategory, brand, price, ...rest] = item;
  const arrays = rest.filter(Array.isArray);
  const features = arrays.find((value) => Array.isArray(value[0]));
  const images = arrays.find((value) => typeof value[0] === 'string' && value[0].length > 15);
  const tags = arrays.find((value) => typeof value[0] === 'string' && value[0].length <= 15);
  const numericValues = rest.filter((value) => typeof value === 'number');
  const compactOldPrice = numericValues[0] > 100 && numericValues[1] <= 5 ? numericValues[0] : undefined;
  const normalizedNumbers = compactOldPrice ? numericValues.slice(1) : numericValues;
  const ratingIndex = normalizedNumbers.findIndex((value) => value >= 0 && value <= 5);
  const rating = normalizedNumbers[ratingIndex];
  const reviewCount = normalizedNumbers[ratingIndex + 1];
  const stock = compactOldPrice ? 8 + ((startId + index) * 7) % 47 : numericValues[0] > 5 ? numericValues[0] : 8 + ((startId + index) * 7) % 47;
  const oldPrice = compactOldPrice;
  const textValues = rest.filter((value) => typeof value === 'string');
  const [shortDescription, benefit, detail] = textValues;
  return makeProduct({ id: startId + index, name, category, categoryId, subcategory, brand, price, oldPrice, stock, rating, reviewCount, tags, shortDescription, benefit, detail, images, features });
});

export const additionalProducts = [
  ...categoryProducts(electronics, 'Electronics', 'electronics', 11),
  ...categoryProducts(fashion, 'Fashion', 'fashion', 33),
  ...categoryProducts(beauty, 'Beauty', 'beauty', 56),
  ...categoryProducts(homeLiving, 'Home & Living', 'home-living', 70),
  ...categoryProducts(sports, 'Sports & Fitness', 'sports', 82),
  ...categoryProducts(accessories, 'Accessories', 'accessories', 91),
];
