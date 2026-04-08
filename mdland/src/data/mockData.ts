import { Villa, Event, Restaurant, DiningItem, Booking, User, MapMarker, Wahana } from '../types';

// ─── VILLAS AT MDLAND BENGKULU ─────────────────────────────
export const VILLAS: Villa[] = [
  // === STANDARD (5) ===
  { id: 'v-s1', name: 'Standard Coastal Room', description: 'Kamar standar yang nyaman dengan balkon menghadap area resort. Pilihan ekonomis tanpa mengorbankan kenyamanan.', images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800','https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'], pricePerNight: 800000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['Balcony','AC','WiFi','TV'], rating: 4.5, available: true, category: 'standard' },
  { id: 'v-s2', name: 'Standard Garden Room', description: 'Kamar standar dengan pemandangan taman hijau. Tenang, bersih, dan nyaman untuk liburan singkat.', images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800','https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'], pricePerNight: 750000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['Garden View','AC','WiFi','TV'], rating: 4.4, available: true, category: 'standard' },
  { id: 'v-s3', name: 'Standard Twin Room', description: 'Kamar twin bed cocok untuk teman atau keluarga kecil. Lokasi strategis dekat kolam renang utama.', images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800','https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'], pricePerNight: 850000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['Twin Beds','AC','WiFi','TV','Pool Access'], rating: 4.3, available: true, category: 'standard' },
  { id: 'v-s4', name: 'Standard Pool View', description: 'Kamar standar dengan pemandangan kolam renang. Akses langsung ke area pool dan sun deck.', images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800','https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'], pricePerNight: 900000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['Pool View','AC','WiFi','TV','Pool Access'], rating: 4.5, available: true, category: 'standard' },
  { id: 'v-s5', name: 'Standard Economy', description: 'Pilihan paling terjangkau di MDLAND. Kamar bersih dengan fasilitas esensial untuk budget traveler.', images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'], pricePerNight: 650000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['AC','WiFi','TV'], rating: 4.2, available: true, category: 'standard' },

  // === DELUXE (5) ===
  { id: 'v-d1', name: 'Garden Retreat Villa', description: 'Villa nyaman dikelilingi taman tropis hijau. Dilengkapi kolam rendam, bathtub outdoor, dan furnitur natural dari rotan.', images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800','https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800','https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'], pricePerNight: 1500000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['Plunge Pool','Garden View','Outdoor Bath','AC','WiFi'], rating: 4.7, available: true, category: 'deluxe' },
  { id: 'v-d2', name: 'Family Beach House', description: 'Rumah pantai luas untuk keluarga. Dua kamar tidur, ruang keluarga terbuka, dan halaman bermain anak menghadap laut.', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800','https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800','https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], pricePerNight: 2000000, maxGuests: 6, bedrooms: 2, bathrooms: 2, amenities: ['Kids Area','Ocean View','Kitchen','Garden','AC','WiFi'], rating: 4.8, available: true, category: 'deluxe' },
  { id: 'v-d3', name: 'Deluxe Lagoon Villa', description: 'Villa deluxe menghadap laguna buatan. Teras privat dengan kolam rendam dan kursi berjemur.', images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800','https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'], pricePerNight: 1800000, maxGuests: 3, bedrooms: 1, bathrooms: 1, amenities: ['Lagoon View','Plunge Pool','Terrace','AC','WiFi','Mini Bar'], rating: 4.7, available: true, category: 'deluxe' },
  { id: 'v-d4', name: 'Deluxe Corner Villa', description: 'Villa sudut dengan ruang ekstra dan dua sisi jendela panoramik. Privasi lebih dengan lokasi ujung resort.', images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800','https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'], pricePerNight: 1650000, maxGuests: 4, bedrooms: 2, bathrooms: 1, amenities: ['Corner Unit','Panoramic View','AC','WiFi','Mini Bar'], rating: 4.6, available: true, category: 'deluxe' },
  { id: 'v-d5', name: 'Deluxe Terrace Suite', description: 'Suite deluxe dengan teras luas menghadap taman dan kolam utama. Ruang tamu terpisah dari kamar tidur.', images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800','https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'], pricePerNight: 1900000, maxGuests: 3, bedrooms: 1, bathrooms: 1, amenities: ['Terrace','Pool View','Living Room','AC','WiFi','Mini Bar'], rating: 4.8, available: false, category: 'deluxe' },

  // === PREMIUM (5) ===
  { id: 'v-p1', name: 'Ocean Breeze Villa', description: 'Villa premium menghadap laut dengan kolam renang pribadi, teras luas, dan akses langsung ke pantai.', images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800','https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800','https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800','https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], pricePerNight: 2500000, maxGuests: 4, bedrooms: 2, bathrooms: 2, amenities: ['Private Pool','Ocean View','Beach Access','AC','WiFi','Mini Bar'], rating: 4.9, available: true, category: 'premium' },
  { id: 'v-p2', name: 'Premium Cliff Villa', description: 'Villa premium di atas tebing dengan infinity pool menghadap Samudera Hindia. Pengalaman eksklusif.', images: ['https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800','https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800'], pricePerNight: 2800000, maxGuests: 4, bedrooms: 2, bathrooms: 2, amenities: ['Infinity Pool','Cliff View','Butler Service','AC','WiFi','Mini Bar'], rating: 4.9, available: true, category: 'premium' },
  { id: 'v-p3', name: 'Premium Beachfront', description: 'Villa langsung di bibir pantai. Bangun dengan suara ombak dan nikmati sunrise dari tempat tidur.', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800','https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'], pricePerNight: 2700000, maxGuests: 4, bedrooms: 2, bathrooms: 2, amenities: ['Beachfront','Private Deck','Outdoor Shower','AC','WiFi','Mini Bar'], rating: 4.8, available: true, category: 'premium' },
  { id: 'v-p4', name: 'Premium Honeymoon', description: 'Villa romantis untuk pasangan. Dilengkapi jacuzzi outdoor, candle dinner setup, dan champagne welcome.', images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800','https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'], pricePerNight: 3000000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['Jacuzzi','Candle Dinner','Champagne','Ocean View','AC','WiFi'], rating: 5.0, available: true, category: 'premium' },
  { id: 'v-p5', name: 'Premium Family Grand', description: 'Villa premium luas untuk keluarga besar. Tiga kamar tidur, dapur lengkap, dan area bermain anak.', images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800','https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800','https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'], pricePerNight: 3200000, maxGuests: 8, bedrooms: 3, bathrooms: 3, amenities: ['Private Pool','Kids Area','Kitchen','Garden','AC','WiFi','BBQ Area'], rating: 4.8, available: true, category: 'premium' },

  // === SUITE (5) ===
  { id: 'v-su1', name: 'Sunset Suite', description: 'Suite eksklusif di lantai atas dengan pemandangan matahari terbenam yang spektakuler. Glass balcony dan jacuzzi privat.', images: ['https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800','https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800','https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800'], pricePerNight: 3500000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['Jacuzzi','Sunset View','Glass Balcony','Butler Service','Mini Bar'], rating: 5.0, available: true, category: 'suite' },
  { id: 'v-su2', name: 'Presidential Suite', description: 'Suite terluas dan termewah di MDLAND. Ruang tamu megah, dapur privat, dan butler 24 jam.', images: ['https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800','https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800','https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'], pricePerNight: 5000000, maxGuests: 4, bedrooms: 2, bathrooms: 2, amenities: ['Private Pool','Butler 24h','Grand Living Room','Kitchen','Sunset View','Wine Cellar'], rating: 5.0, available: true, category: 'suite' },
  { id: 'v-su3', name: 'Royal Ocean Suite', description: 'Suite royal dengan pemandangan 180° laut. Bathtub marmer, rain shower, dan teleskop di balkon.', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800','https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'], pricePerNight: 4200000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['180° Ocean View','Marble Bath','Telescope','Butler Service','Mini Bar'], rating: 4.9, available: true, category: 'suite' },
  { id: 'v-su4', name: 'Penthouse Suite', description: 'Penthouse di puncak resort dengan rooftop privat, jacuzzi, dan pemandangan seluruh pantai Bengkulu.', images: ['https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800','https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'], pricePerNight: 4500000, maxGuests: 4, bedrooms: 2, bathrooms: 2, amenities: ['Rooftop','Jacuzzi','Panoramic View','Butler Service','Private Dining'], rating: 4.9, available: false, category: 'suite' },
  { id: 'v-su5', name: 'Honeymoon Paradise Suite', description: 'Suite romantis ultimate. Petal bath, private cinema, candle dinner di tepi laut. Pengalaman tak terlupakan.', images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800','https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'], pricePerNight: 4000000, maxGuests: 2, bedrooms: 1, bathrooms: 1, amenities: ['Petal Bath','Private Cinema','Candle Dinner','Butler Service','Champagne'], rating: 5.0, available: true, category: 'suite' },
];

// ─── WAHANA (ATTRACTIONS) ──────────────────────────────────
export const WAHANA: Wahana[] = [
  // === WATER (5) ===
  { id: 'w-wa1', name: 'Jet Ski Adventure', description: 'Rasakan sensasi memacu jet ski di perairan Bengkulu yang jernih. Cocok untuk pencari adrenalin!', image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?w=800', price: 350000, duration: '30 menit', capacity: 2, category: 'water', rating: 4.8, available: true, minAge: 16 },
  { id: 'w-wa2', name: 'Flyboard Experience', description: 'Terbang di atas air dengan flyboard! Instruktur profesional akan memandu Anda untuk pengalaman tak terlupakan.', image: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=800', price: 500000, duration: '20 menit', capacity: 1, category: 'water', rating: 4.9, available: true, minAge: 18 },
  { id: 'w-wa3', name: 'Parasailing', description: 'Terbang tinggi di atas laut dengan parasail. Pemandangan pantai Bengkulu dari ketinggian yang menakjubkan!', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', price: 450000, duration: '15 menit', capacity: 2, category: 'water', rating: 4.7, available: true, minAge: 14 },
  { id: 'w-wa4', name: 'Wakeboard Session', description: 'Tantang keseimbangan Anda dengan wakeboard di perairan tenang laguna MDLAND. Peralatan lengkap tersedia.', image: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=800', price: 300000, duration: '30 menit', capacity: 1, category: 'water', rating: 4.6, available: true, minAge: 14 },
  { id: 'w-wa5', name: 'Stand Up Paddle (SUP)', description: 'Berdiri di atas papan paddle dan jelajahi perairan tenang. Olahraga seru yang melatih keseimbangan.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', price: 150000, duration: '45 menit', capacity: 1, category: 'water', rating: 4.5, available: true },

  // === ADVENTURE (5) ===
  { id: 'w-ad1', name: 'Banana Boat Ride', description: 'Naik banana boat bersama teman! Bersiap untuk terlempar ke air dan tertawa bersama.', image: 'https://images.unsplash.com/photo-1605125950881-05e0a0771e08?w=800', price: 200000, duration: '15 menit', capacity: 6, category: 'adventure', rating: 4.7, available: true },
  { id: 'w-ad2', name: 'Snorkeling Tour', description: 'Jelajahi keindahan bawah laut Bengkulu dengan perlengkapan snorkeling lengkap dan pemandu berpengalaman.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', price: 250000, duration: '60 menit', capacity: 8, category: 'adventure', rating: 4.8, available: true, minAge: 10 },
  { id: 'w-ad3', name: 'Cliff Jumping', description: 'Lompat dari tebing setinggi 5-10 meter ke laut biru! Dipandu instruktur bersertifikat untuk keamanan.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', price: 200000, duration: '45 menit', capacity: 5, category: 'adventure', rating: 4.9, available: true, minAge: 16 },
  { id: 'w-ad4', name: 'Scuba Diving Intro', description: 'Pengenalan scuba diving untuk pemula. Selam hingga 5 meter dan lihat keindahan terumbu karang.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', price: 600000, duration: '90 menit', capacity: 4, category: 'adventure', rating: 4.9, available: true, minAge: 12 },
  { id: 'w-ad5', name: 'Beach ATV Ride', description: 'Pacu ATV di sepanjang pantai pasir putih. Trek seru melewati hutan mangrove dan bukit pantai.', image: 'https://images.unsplash.com/photo-1605125950881-05e0a0771e08?w=800', price: 300000, duration: '30 menit', capacity: 2, category: 'adventure', rating: 4.6, available: true, minAge: 16 },

  // === FAMILY (5) ===
  { id: 'w-fa1', name: 'Bebek Air (Pedal Boat)', description: 'Wahana keluarga favorit! Kayuh bebek air bersama anak-anak di area laguna yang tenang dan aman.', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800', price: 100000, duration: '30 menit', capacity: 4, category: 'family', rating: 4.4, available: true },
  { id: 'w-fa2', name: 'Mini Speed Boat', description: 'Speedboat mini untuk anak-anak di area laguna terkontrol. Aman dan menyenangkan!', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800', price: 80000, duration: '15 menit', capacity: 2, category: 'family', rating: 4.3, available: true },
  { id: 'w-fa3', name: 'Kids Water Playground', description: 'Taman air anak dengan seluncuran, semprotan air, dan ember tumpah. Area aman dengan pengawas.', image: 'https://images.unsplash.com/photo-1605125950881-05e0a0771e08?w=800', price: 75000, duration: '60 menit', capacity: 20, category: 'family', rating: 4.5, available: true },
  { id: 'w-fa4', name: 'Glass Bottom Boat', description: 'Lihat kehidupan bawah laut tanpa basah! Perahu berlantai kaca cocok untuk semua umur.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', price: 120000, duration: '30 menit', capacity: 10, category: 'family', rating: 4.6, available: true },
  { id: 'w-fa5', name: 'Sand Castle Workshop', description: 'Workshop membuat istana pasir bersama instruktur. Alat dan cetakan premium disediakan.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', price: 50000, duration: '45 menit', capacity: 8, category: 'family', rating: 4.2, available: true },

  // === LEISURE (5) ===
  { id: 'w-le1', name: 'Canoe Trip', description: 'Susuri pantai dengan kano sambil menikmati pemandangan laut dan tebing karang Bengkulu yang indah.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', price: 150000, duration: '45 menit', capacity: 2, category: 'leisure', rating: 4.6, available: true },
  { id: 'w-le2', name: 'Sunset Cruise', description: 'Nikmati matahari terbenam dari atas perahu tradisional. Termasuk welcome drink dan snack.', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800', price: 400000, duration: '90 menit', capacity: 10, category: 'leisure', rating: 4.9, available: true },
  { id: 'w-le3', name: 'Sunrise Fishing', description: 'Memancing di pagi hari bersama nelayan lokal. Hasil tangkapan bisa dimasak langsung di beach grill.', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800', price: 250000, duration: '120 menit', capacity: 4, category: 'leisure', rating: 4.7, available: true },
  { id: 'w-le4', name: 'Beach Horseback Riding', description: 'Berkuda di sepanjang pantai saat sunrise atau sunset. Kuda jinak yang ramah untuk semua level.', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', price: 350000, duration: '45 menit', capacity: 1, category: 'leisure', rating: 4.8, available: true, minAge: 8 },
  { id: 'w-le5', name: 'Floating Breakfast', description: 'Sarapan mewah terapung di kolam renang privat villa Anda. Menu premium dan dekorasi bunga.', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800', price: 500000, duration: '60 menit', capacity: 2, category: 'leisure', rating: 5.0, available: true },
];

// ─── EVENTS ────────────────────────────────────────────────
export const EVENTS: Event[] = [
  // === Deep House (5) ===
  { id: 'e-dh1', title: 'Sunset Sessions', description: 'Live DJ spinning deep house & tropical beats saat matahari terbenam di poolside MDLAND.', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', date: '2026-04-15', time: '17:00 - 23:00', location: 'MDLAND Beach Club', genre: 'Deep House', artist: 'DJ Oceanwave', price: 150000, attending: 342 },
  { id: 'e-dh2', title: 'Deep Blue Nights', description: 'Malam deep house di tepi kolam infinity. Visual mapping dan cocktail premium.', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800', date: '2026-04-22', time: '20:00 - 02:00', location: 'MDLAND Infinity Pool', genre: 'Deep House', artist: 'DJ Aquatic', price: 175000, attending: 210 },
  { id: 'e-dh3', title: 'Tropical House Brunch', description: 'Sunday brunch dengan alunan tropical house. Menu brunch premium dan mimosa unlimited.', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', date: '2026-04-20', time: '11:00 - 15:00', location: 'MDLAND Ocean Kitchen', genre: 'Deep House', price: 200000, attending: 120 },
  { id: 'e-dh4', title: 'Moonlit Grooves', description: 'Deep house session di bawah cahaya bulan purnama. Fire pits dan ambient lighting.', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800', date: '2026-04-29', time: '19:00 - 01:00', location: 'MDLAND Beach Club', genre: 'Deep House', artist: 'DJ Solaris', price: 160000, attending: 280 },
  { id: 'e-dh5', title: 'Wave Frequency', description: 'Deep house & progressive selection dari DJ internasional. Sound system premium Funktion-One.', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', date: '2026-05-03', time: '18:00 - 00:00', location: 'MDLAND Main Stage', genre: 'Deep House', artist: 'DJ Reef', price: 250000, attending: 450 },

  // === R&B (5) ===
  { id: 'e-rb1', title: 'R&B Under the Stars', description: 'Malam penuh musik R&B di bawah bintang-bintang. Cocktail premium dan suasana romantis.', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', date: '2026-04-18', time: '20:00 - 01:00', location: 'MDLAND Starlight Deck', genre: 'R&B', artist: 'Luna Waves', price: 200000, attending: 189 },
  { id: 'e-rb2', title: 'Smooth R&B Evenings', description: 'Live band R&B dengan suara merdu penyanyi lokal berbakat. Dinner pairing tersedia.', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', date: '2026-04-25', time: '19:00 - 23:00', location: 'MDLAND Lounge', genre: 'R&B', artist: 'Velvet Soul Band', price: 175000, attending: 145 },
  { id: 'e-rb3', title: 'R&B Pool Party', description: 'Pool party dengan playlist R&B terbaik. Floaties, cocktail, dan vibes santai.', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800', date: '2026-05-02', time: '14:00 - 20:00', location: 'MDLAND Infinity Pool', genre: 'R&B', price: 125000, attending: 230 },
  { id: 'e-rb4', title: 'Old School R&B Night', description: 'Throwback ke era 90s-2000s R&B. Nostalgia hits dari Aaliyah, Usher, dan Destiny\'s Child.', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', date: '2026-05-09', time: '20:00 - 01:00', location: 'MDLAND Beach Club', genre: 'R&B', artist: 'DJ Retro', price: 150000, attending: 310 },
  { id: 'e-rb5', title: 'Candlelight R&B', description: 'Intimate R&B performance diterangi ribuan lilin. Pengalaman romantis yang magical.', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', date: '2026-05-14', time: '19:30 - 22:30', location: 'MDLAND Garden Stage', genre: 'R&B', artist: 'Aria Soulful', price: 225000, attending: 85 },

  // === Electronic (5) ===
  { id: 'e-el1', title: 'Full Moon Beach Party', description: 'Pesta pantai legendaris MDLAND! Fire dancer, live percussion, glow paint, dan musik nonstop.', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800', date: '2026-04-22', time: '21:00 - 04:00', location: 'MDLAND Main Beach', genre: 'Electronic', price: 175000, attending: 856 },
  { id: 'e-el2', title: 'Neon Rave', description: 'Rave party dengan LED, laser show, dan neon body paint. Bring your glow sticks!', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', date: '2026-05-01', time: '22:00 - 05:00', location: 'MDLAND Beach Club', genre: 'Electronic', artist: 'DJ Neonix', price: 200000, attending: 620 },
  { id: 'e-el3', title: 'Bass Drop Friday', description: 'Friday night EDM showcase. Bass heavy sets dari DJ-DJ terbaik Sumatera.', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800', date: '2026-04-24', time: '21:00 - 03:00', location: 'MDLAND Main Stage', genre: 'Electronic', artist: 'ThunderBass', price: 150000, attending: 475 },
  { id: 'e-el4', title: 'Techno Sunrise', description: 'Pesta techno dari midnight sampai sunrise. Pengalaman festival di pantai Bengkulu.', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', date: '2026-05-08', time: '00:00 - 07:00', location: 'MDLAND Main Beach', genre: 'Electronic', artist: 'Minimal Mind', price: 225000, attending: 380 },
  { id: 'e-el5', title: 'Trance Paradise', description: 'Trance music euphoria. Journey of uplifting trance yang membawa ke dimensi lain.', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800', date: '2026-05-15', time: '20:00 - 02:00', location: 'MDLAND Beach Club', genre: 'Electronic', artist: 'ElevateX', price: 180000, attending: 290 },

  // === Acoustic (5) ===
  { id: 'e-ac1', title: 'Chill & Grill Sundays', description: 'Santai di hari Minggu dengan live acoustic, BBQ premium, dan cocktail.', image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800', date: '2026-04-20', time: '12:00 - 18:00', location: 'MDLAND Poolside', genre: 'Acoustic', price: 100000, attending: 234 },
  { id: 'e-ac2', title: 'Acoustic Beach Sunset', description: 'Penampilan acoustic duo dengan gitar dan ukulele saat sunset. Free entry with drink purchase.', image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800', date: '2026-04-17', time: '16:30 - 19:30', location: 'MDLAND Beach Bar', genre: 'Acoustic', artist: 'The Coconuts', price: 50000, attending: 178 },
  { id: 'e-ac3', title: 'Open Mic Night', description: 'Tunjukkan bakat musikmu! Open mic untuk semua tamu MDLAND. Hadiah untuk penampil terbaik.', image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800', date: '2026-04-23', time: '19:00 - 22:00', location: 'MDLAND Lounge', genre: 'Acoustic', price: 0, attending: 95 },
  { id: 'e-ac4', title: 'Campfire Sing-Along', description: 'Nyanyikan lagu-lagu favorit bersama di api unggun tepi pantai. Marshmallow & hot choco disediakan.', image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800', date: '2026-04-26', time: '19:30 - 22:00', location: 'MDLAND Bonfire Pit', genre: 'Acoustic', price: 75000, attending: 65 },
  { id: 'e-ac5', title: 'Breakfast Serenade', description: 'Sarapan ditemani live acoustic serenade. Mulai hari dengan musik dan makanan lezat.', image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800', date: '2026-04-27', time: '07:30 - 10:00', location: 'MDLAND Ocean Kitchen', genre: 'Acoustic', price: 85000, attending: 110 },

  // === Jazz (5) ===
  { id: 'e-jz1', title: 'Jazz & Wine Evening', description: 'Pertunjukan jazz elegan dengan wine tasting dari berbagai daerah.', image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800', date: '2026-04-25', time: '19:00 - 23:00', location: 'MDLAND Lounge', genre: 'Jazz', artist: 'The Bengkulu Quartet', price: 250000, attending: 78 },
  { id: 'e-jz2', title: 'Smooth Jazz Brunch', description: 'Brunch mewah diiringi smooth jazz quartet. Menu 5-course dan champagne.', image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800', date: '2026-04-19', time: '10:00 - 14:00', location: 'MDLAND Ocean Kitchen', genre: 'Jazz', artist: 'Pacific Jazz Trio', price: 300000, attending: 55 },
  { id: 'e-jz3', title: 'Late Night Jazz Club', description: 'Suasana jazz club intim di MDLAND. Whiskey bar dan cigar lounge tersedia.', image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800', date: '2026-05-02', time: '21:00 - 01:00', location: 'MDLAND Lounge', genre: 'Jazz', artist: 'Midnight Sax', price: 200000, attending: 68 },
  { id: 'e-jz4', title: 'Jazz on the Deck', description: 'Pertunjukan jazz outdoor di deck kayu menghadap laut. Angin laut dan musik jazz sempurna.', image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800', date: '2026-05-06', time: '18:00 - 22:00', location: 'MDLAND Starlight Deck', genre: 'Jazz', artist: 'Bossa Nova Duo', price: 175000, attending: 92 },
  { id: 'e-jz5', title: 'Piano Bar Sessions', description: 'Solo piano jazz di bar premium MDLAND. Acoustic grand piano dan suasana intimate.', image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800', date: '2026-05-10', time: '20:00 - 23:30', location: 'MDLAND Lounge', genre: 'Jazz', artist: 'Reza Pianoman', price: 125000, attending: 48 },

  // === Wellness (5) ===
  { id: 'e-wl1', title: 'Yoga & Sound Healing', description: 'Mulai pagi dengan yoga tepi pantai dilanjutkan sesi sound healing dengan crystal bowl.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', date: '2026-04-16', time: '06:30 - 09:00', location: 'MDLAND Wellness Deck', genre: 'Wellness', price: 75000, attending: 45 },
  { id: 'e-wl2', title: 'Sunrise Meditation', description: 'Meditasi sunrise di pantai. Guided meditation oleh instruktur bersertifikat. Semua level welcome.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', date: '2026-04-17', time: '05:30 - 07:00', location: 'MDLAND Main Beach', genre: 'Wellness', price: 50000, attending: 32 },
  { id: 'e-wl3', title: 'Full Moon Ceremony', description: 'Upacara bulan purnama dengan meditasi, journaling, dan release ritual. Spiritual dan menenangkan.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', date: '2026-04-22', time: '19:00 - 21:00', location: 'MDLAND Wellness Deck', genre: 'Wellness', price: 100000, attending: 28 },
  { id: 'e-wl4', title: 'Beach Pilates', description: 'Pilates di atas pasir putih. Perkuat core dan fleksibilitas dengan pemandangan laut.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', date: '2026-04-19', time: '07:00 - 08:30', location: 'MDLAND Main Beach', genre: 'Wellness', price: 60000, attending: 38 },
  { id: 'e-wl5', title: 'Breathwork & Ice Bath', description: 'Wim Hof method breathwork dilanjutkan ice bath. Tingkatkan energi dan daya tahan tubuh.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', date: '2026-04-28', time: '06:00 - 08:00', location: 'MDLAND Wellness Deck', genre: 'Wellness', price: 125000, attending: 22 },
];

// ─── F&B / RESTAURANTS ─────────────────────────────────────
const DINING_ITEMS: DiningItem[] = [
  { id: 'd1', name: 'Pempek Palembang', description: 'Pempek kapal selam dengan kuah cuko asli, disajikan hangat', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', price: 35000, category: 'appetizer', rating: 4.9, isSignature: true },
  { id: 'd2', name: 'Nasi Goreng Seafood', description: 'Nasi goreng spesial dengan udang, cumi, dan ikan segar Bengkulu', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400', price: 55000, category: 'main', rating: 4.8, isSignature: true },
  { id: 'd3', name: 'Ikan Bakar Bengkulu', description: 'Ikan kakap bakar bumbu khas Bengkulu dengan sambal dan lalapan segar', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', price: 75000, category: 'main', rating: 5.0, isSignature: true },
  { id: 'd4', name: 'Sate Ayam Madura', description: 'Sate ayam dengan bumbu kacang khas, dilengkapi lontong dan acar', image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400', price: 40000, category: 'main', rating: 4.7, isSignature: false },
  { id: 'd5', name: 'Mie Goreng Seafood', description: 'Mie goreng dengan udang dan cumi, bumbu pedas manis', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400', price: 45000, category: 'main', rating: 4.6, isSignature: false },
  { id: 'd6', name: 'Es Kelapa Muda', description: 'Kelapa muda segar langsung dari pohon, disajikan dengan es serut', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400', price: 25000, category: 'beverage', rating: 4.8, isSignature: false },
  { id: 'd7', name: 'Tropical Sunset Cocktail', description: 'Campuran jus mangga, passion fruit, dan soda dengan hiasan bunga', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400', price: 65000, category: 'cocktail', rating: 4.9, isSignature: true },
  { id: 'd8', name: 'Es Cendol Bengkulu', description: 'Cendol pandan dengan santan, gula merah, dan nangka segar', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', price: 20000, category: 'dessert', rating: 4.7, isSignature: false },
  { id: 'd9', name: 'Pisang Goreng Crispy', description: 'Pisang goreng dengan tepung crispy dan topping coklat madu', image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=400', price: 25000, category: 'snack', rating: 4.5, isSignature: false },
  { id: 'd10', name: 'French Fries & Onion Rings', description: 'Kentang goreng dan onion rings renyah dengan saus sambal mayo', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400', price: 35000, category: 'snack', rating: 4.4, isSignature: false },
  { id: 'd11', name: 'Juice Bar Combo', description: 'Pilihan jus buah segar: jeruk, semangka, melon, atau alpukat', image: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=400', price: 30000, category: 'beverage', rating: 4.6, isSignature: false },
  { id: 'd12', name: 'Wagyu Burger Premium', description: 'Burger wagyu A5 dengan keju cheddar, truffle mayo, dan roti brioche', image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400', price: 95000, category: 'main', rating: 4.9, isSignature: true },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest1',
    name: 'MDLAND Ocean Kitchen',
    description: 'Restoran utama MDLAND Bengkulu. Sajian seafood segar dan masakan Nusantara premium dengan pemandangan laut.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    cuisine: 'Seafood & Indonesian',
    rating: 4.9,
    priceRange: 'Rp 35k - 95k',
    openHours: '10:00 - 22:00',
    items: DINING_ITEMS.filter(i => ['d1', 'd2', 'd3', 'd4', 'd5', 'd7', 'd12'].includes(i.id)),
  },
  {
    id: 'rest2',
    name: 'Beach Grill & Bar',
    description: 'Makan santai langsung di tepi pantai. Grilled food, snack, dan minuman tropis segar.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
    cuisine: 'Grill & Snacks',
    rating: 4.7,
    priceRange: 'Rp 20k - 65k',
    openHours: '09:00 - 21:00',
    items: DINING_ITEMS.filter(i => ['d6', 'd8', 'd9', 'd10', 'd11'].includes(i.id)),
  },
];

// ─── BOOKINGS ──────────────────────────────────────────────
export const BOOKINGS: Booking[] = [
  {
    id: 'b1',
    villaId: 'v1',
    villaName: 'Ocean Breeze Villa',
    type: 'villa',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800',
    checkIn: '2026-05-10',
    checkOut: '2026-05-12',
    guests: 2,
    totalPrice: 5000000,
    status: 'upcoming',
  },
  {
    id: 'b2',
    wahanaId: 'w1',
    wahanaName: 'Jet Ski Adventure',
    type: 'wahana',
    image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?w=800',
    date: '2026-04-20',
    guests: 2,
    totalPrice: 700000,
    status: 'upcoming',
  },
];

// ─── USER ──────────────────────────────────────────────────
export const USER: User = {
  id: 'u1',
  name: 'Alexander Mitchell',
  email: 'alex.mitchell@email.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  memberSince: '2024-06-15',
  tier: 'platinum',
  bookingsCount: 12,
};

// ─── MAP MARKERS ───────────────────────────────────────────
export const MAP_MARKERS: MapMarker[] = [
  // ── Villas ──
  { id: 'm1', title: 'Oceanfront Suite', description: 'Villa Premium · 3 Kamar', coordinate: { latitude: -3.7838, longitude: 102.2525 }, type: 'villa', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400', rating: 4.9, reviewCount: 245, price: 3500000, category: 'premium', isOpen: true },
  { id: 'm2', title: 'Sunset Villa', description: 'Villa Deluxe · 2 Kamar', coordinate: { latitude: -3.7856504265064865, longitude: 102.25445085755116 }, type: 'villa', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400', rating: 4.7, reviewCount: 189, price: 2800000, category: 'deluxe', isOpen: true },
  { id: 'm3', title: 'Garden Cottage', description: 'Villa Standard · 1 Kamar', coordinate: { latitude: -3.7855, longitude: 102.2510 }, type: 'villa', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400', rating: 4.5, reviewCount: 132, price: 1800000, category: 'standard', isOpen: true },

  // ── Restaurants ──
  { id: 'm4', title: 'Ocean Kitchen', description: 'Seafood & Indonesian', coordinate: { latitude: -3.7852134373607798, longitude: 102.25210207571139}, type: 'restaurant', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', rating: 4.8, reviewCount: 412, price: 150000, category: 'seafood', isOpen: true },
  { id: 'm5', title: 'Bamboo Grill', description: 'BBQ & Steak House', coordinate: { latitude: -3.7849323025161605, longitude: 102.2528435683876 }, type: 'restaurant', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', rating: 4.6, reviewCount: 287, price: 200000, category: 'grill', isOpen: true },

  // ── Wahana ──
  { id: 'm6', title: "Pirate's Revenge", description: 'Thrill Rides', coordinate: { latitude: -3.7847182267230144, longitude: 102.25293050348753 }, type: 'wahana', image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=400', rating: 4.5, reviewCount: 1980, price: 40000, category: 'adventure', waitTime: 25, isOpen: true },
  { id: 'm7', title: 'Sky Wheel', description: 'Family Rides', coordinate: { latitude: -3.7840477872545755, longitude: 102.25204862875809 }, type: 'wahana', image: 'https://images.unsplash.com/photo-1570179538662-faa5e38a5994?w=400', rating: 4.3, reviewCount: 876, price: 30000, category: 'family', waitTime: 15, isOpen: true },
  { id: 'm8', title: 'Wave Pool', description: 'Water Park', coordinate: { latitude: -3.78555246601874, longitude: 102.25171649411975 }, type: 'wahana', image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?w=400', rating: 4.8, reviewCount: 2341, price: 50000, category: 'water', waitTime: 10, isOpen: true },

  // ── Events ──
  { id: 'm9', title: 'Beach Club Stage', description: 'Live Music & DJ', coordinate: { latitude: -3.7838592697694686, longitude: 102.2527576552265 }, type: 'event', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', rating: 4.7, reviewCount: 1200, price: 100000, category: 'music', isOpen: true },
  { id: 'm10', title: 'Sunset Lounge', description: 'Acoustic Night', coordinate: { latitude: -3.7854381599241242, longitude: 102.25097768784981}, type: 'event', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400', rating: 4.5, reviewCount: 567, price: 75000, category: 'music', isOpen: true },

  // ── Facilities ──
  { id: 'm11', title: 'MDLAND Reception', description: 'Lobby Utama', coordinate: { latitude: -3.784517939126953, longitude: 102.25313460257593 }, type: 'facility', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', rating: 4.8, reviewCount: 890, isOpen: true },
  { id: 'm12', title: 'Spa & Wellness', description: 'Relaksasi & Massage', coordinate: { latitude: -3.7853545941081435, longitude: 102.25231852098672 }, type: 'facility', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400', rating: 4.9, reviewCount: 345, price: 250000, isOpen: true },
  { id: 'm13', title: 'Kids Zone', description: 'Area Bermain Anak', coordinate: { latitude: -3.7854791236995493, longitude: 102.25203053937747 }, type: 'facility', image: 'https://images.unsplash.com/photo-1587655100339-cc06f9a8f042?w=400', rating: 4.4, reviewCount: 234, isOpen: true },
  { id: 'm14', title: 'Parking Area', description: 'Parkir Luas & Aman', coordinate: { latitude: -3.7847325403911025, longitude: 102.25335294507066 }, type: 'facility', image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400', rating: 4.2, reviewCount: 120, isOpen: true },
];

// ─── ONBOARDING ────────────────────────────────────────────
export const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Welcome to MDLAND',
    subtitle: 'Resort & waterpark terbaik di Bengkulu. Nikmati villa mewah, wahana air seru, dan kuliner lezat.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  },
  {
    id: '2',
    title: 'Serunya Wahana Air',
    subtitle: 'Jet ski, flyboard, canoe trip, dan banyak lagi! Beli tiket langsung dari aplikasi.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
  },
  {
    id: '3',
    title: 'Kuliner & Hiburan',
    subtitle: 'Pesan makanan, booking villa, dan nikmati event malam yang tak terlupakan.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
  },
];
