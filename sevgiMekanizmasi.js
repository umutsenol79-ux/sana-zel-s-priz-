// --- sevgiMekanizmasi.js ---

// ------------------------------------
// 1. AYARLAR VE DEĞİŞKENLER
// ------------------------------------

// LÜTFEN SİFRENİZİ BURAYA YAZIN! (Küçük harf, rakam vb. içerebilir)
const DOGRU_SIFRE = "ezgiumut"; 

const mesajlar = [
    "Seninle tanıştığım gün anladım hayatımın en güzel hikayesi seninle başlıyıcaktı.",
    "Birlikte geçirdiğimiz her an her saniye hayatımın en güzel anına dönüşüyor.",
    "Beni tamamlayan tek şey Sensin.",
    "Sensiz hayat düşüncesi bile yarım kalmak ben sensiz olamam.",
    "Hayatıma yaptığın dokunuş herşeyi güzelleştirdi.",
    "Buraya ne kadar şey yazsam da sana olan sevgimi açıklamaya yetmeyecek.",
    "Seni seviyorum iyi ki varsın MY LOVE.",
];

// OTOMATİK AYAR
const MESAJ_SAYISI = mesajlar.length;
const FOTOGRAF_TIKLAMA_SAYISI = MESAJ_SAYISI + 1; 

let mesajSayaci = 0; // Butona basma sayısını tutar

// ------------------------------------
// 2. ELEMENT SEÇİMLERİ (GÜNCELLENDİ)
// ------------------------------------

const girisEkrani = document.getElementById('giris-ekrani');
const surprizEkrani = document.getElementById('surpriz-ekrani');
// const notuAcBtn = document.getElementById('notu-ac-btn'); // Silindi
const mesajKutusu = document.getElementById('mesaj-kutusu');
const degistirBtn = document.getElementById('degistir-btn');
const havaiFisekAlani = document.getElementById('havai-fisek-alani');
const cicekAlani = document.getElementById('cicek-alani');
const surprizContainer = document.querySelector('.surpriz-container'); 

const mesajButonuAlani = document.getElementById('mesaj-butonu-alani'); 
const fotografAlani = document.getElementById('son-fotograf-alani'); 

// YENİ ŞİFRE ELEMENTLERİ
const sifreKutusu = document.getElementById('sifre-kutusu');
const kontrolBtn = document.getElementById('kontrol-btn');
const sifreMesaji = document.getElementById('sifre-mesaji');


let fireworkInterval, flowerInterval;
const fireworkColors = ['#ff6f61', '#ffc72c', '#8d46e9', '#4fc3f7', '#aed581'];


// ------------------------------------
// 3. MESAJ VE AKIŞ KONTROL FONKSİYONU (Aynı Kaldı)
// ------------------------------------

function mesajGoster() {
    
    mesajSayaci++; 

    if (mesajSayaci === FOTOGRAF_TIKLAMA_SAYISI) {
        
        // FOTOĞRAF GÖSTERME KISMI
        mesajButonuAlani.style.display = 'none';
        fotografAlani.style.display = 'block'; 
        
        clearInterval(fireworkInterval);
        clearInterval(flowerInterval);
        fireworkInterval = setInterval(createFirework, 150);
        flowerInterval = setInterval(createFlower, 100);
        
        degistirBtn.removeEventListener('click', mesajGoster);
        return;
    }

    // MESAJ GÖSTERME KISMI
    const mesajIndexi = mesajSayaci - 1; 
    const kalanTiklama = FOTOGRAF_TIKLAMA_SAYISI - mesajSayaci;
    degistirBtn.textContent = `Başka Bir Mesaj (Kalan: ${kalanTiklama})`;
    
    mesajKutusu.classList.add('fade-out');
    
    setTimeout(() => {
        mesajKutusu.textContent = mesajlar[mesajIndexi]; 
        mesajKutusu.classList.remove('fade-out');
        mesajKutusu.classList.add('fade-in');
    }, 200);
    
    setTimeout(() => {
        mesajKutusu.classList.remove('fade-in');
    }, 400);
}

// ------------------------------------
// 4. ANİMASYON FONKSİYONLARI (Aynı Kaldı)
// ------------------------------------

function createFirework() {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = `${Math.random() * 100}vw`;
    firework.style.top = `${Math.random() * 80 + 10}vh`;
    firework.style.setProperty('--firework-color', fireworkColors[Math.floor(Math.random() * fireworkColors.length)]);
    havaiFisekAlani.appendChild(firework);
    firework.addEventListener('animationend', () => { firework.remove(); });
}

function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower'); 
    flower.classList.add('heart-shape'); 
    
    flower.style.left = `${Math.random() * 100}vw`;
    flower.style.width = `${Math.random() * 20 + 20}px`; 
    flower.style.height = flower.style.width;
    flower.style.animationDuration = `${Math.random() * 3 + 4}s`;
    
    cicekAlani.appendChild(flower); 
    flower.addEventListener('animationend', () => { flower.remove(); });
}

function startEffects() {
    fireworkInterval = setInterval(createFirework, 500); 
    flowerInterval = setInterval(createFlower, 300);

    setTimeout(() => {
        clearInterval(fireworkInterval);
        clearInterval(flowerInterval);
        fireworkInterval = setInterval(createFirework, 2000);
        flowerInterval = setInterval(createFlower, 1500);
    }, 10000);
}


// ------------------------------------
// 5. OLAY DİNLEYİCİLERİ (GÜNCELLENDİ)
// ------------------------------------

// ŞİFRE KONTROL BUTONU İŞLEVİ
kontrolBtn.addEventListener('click', () => {
    
    const girilenSifre = sifreKutusu.value.trim(); // Girilen değeri boşluklardan temizle

    if (girilenSifre === DOGRU_SIFRE) {
        
        // BAŞARILI GİRİŞ: Sürpriz Ekranına Geçiş
        girisEkrani.classList.remove('aktif');
        surprizEkrani.classList.add('aktif'); 
        
        startEffects(); 

        setTimeout(() => {
            surprizContainer.classList.remove('hidden');
            surprizContainer.classList.add('visible');
            
            // İlk mesajı göster (1. tıklama sayılır)
            mesajGoster();
        }, 1000); 

    } else {
        
        // HATA: Yanlış Şifre Uyarısı
        sifreKutusu.value = ""; // Kutuyu temizle
        sifreKutusu.style.border = '2px solid red';
        sifreMesaji.textContent = 'Yanlış Şifre! Lütfen Tekrar Dene.';
        sifreMesaji.style.color = 'red';
        
        // Uyarıyı bir süre sonra sıfırla
        setTimeout(() => {
            sifreKutusu.style.border = '1px solid #ccc';
            sifreMesaji.textContent = 'Lütfen Doğru Şifreyi Gir:';
            sifreMesaji.style.color = '#333';
        }, 2000);
    }
});

// MESAJ DEĞİŞTİR BUTONU
degistirBtn.addEventListener('click', mesajGoster);