/**
 * @author ujklm23
 * @version 1.0.0
 * @copyright 2021
 */

if (localStorage.getItem('scoreGame') == null) {
  localStorage.setItem('scoreGame', '0');
}

// Ambil beberapa hal
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('.playerLivesCount');
const score = document.querySelector('.score');

let playerLives = 6;
let scoreGame = localStorage.getItem('scoreGame'); // score game dari local storage

playerLivesCount.innerText = playerLives; // nyawa player
score.innerHTML = scoreGame;

// data gambar
const data = [
  { imgSrc: './img/patrick.png', name: 'patrick' },
  { imgSrc: './img/sepatu.png', name: 'sepatu' },
  { imgSrc: './img/baju.png', name: 'baju' },
  { imgSrc: './img/sepatu.png', name: 'sepatu' },
  { imgSrc: './img/squidward.png', name: 'squidward' },
  { imgSrc: './img/spongebob.png', name: 'spongebob' },
  { imgSrc: './img/wayang.png', name: 'wayang' },
  { imgSrc: './img/patrick.png', name: 'patrick' },
  { imgSrc: './img/spongebob.png', name: 'spongebob' },
  { imgSrc: './img/baju.png', name: 'baju' },
  { imgSrc: './img/squidward.png', name: 'squidward' },
  { imgSrc: './img/wayang.png', name: 'wayang' },
];

/**
 * @function cardGenerator membuat card
 */
const cardGenerator = () => {
  const cardData = data.sort(() => Math.random() - 0.61); // acak gambar

  let firstSelect;

  cardData.forEach(item => {
    const card = document.createElement('div'); // buat tag div
    const face = document.createElement('img'); // tag img
    const back = document.createElement('div'); // tag div

    card.classList = 'card tutup'; // tambah class card
    face.classList = 'face'; // class face
    back.classList = 'back'; // class back

    // masukkan div kedalam section (sect > div)
    section.appendChild(card);

    // masukkan img kedalam div (div.card > img)
    card.appendChild(face);

    // isi <img src=""/> dengan item.imgSrc
    face.src = item.imgSrc;
    face.name = item.name;
    face.width = 250;
    face.height = 250;

    // didalam card dikasih div (.card > .back)
    card.appendChild(back);

    card.addEventListener('click', function () {
      // cek apakah gambar sudah sesuai pasangan / BENAR
      // jika BENAR otomatis sudah terbuka dan tidak bisa ditutup
      if (!this.classList.contains('benar')) {
        // cek ada class tutup
        if (card.classList[1] == 'tutup') {
          card.classList.add('buka');
          card.classList.remove('tutup');
        } else {
          card.classList.add('tutup');
          card.classList.remove('buka');
        }

        // jika buka berarti img tampil
        if (card.classList.contains('buka')) {
          face.style.display = 'block';

          const buka = document.querySelectorAll('.buka');

          // Megambil pilihan ganjil yg otomatis pertama
          if (buka.length % 2 == 1) {
            firstSelect = this;
            console.log(`Pilihan pertama:  ${firstSelect.firstChild.name}`);
          }

          if (buka.length % 2 == 0) {
            console.log(`Pilihan kedua:  ${this.firstChild.name}`);

            // kita cocokan di pilihan kedua
            if (firstSelect.firstChild.name == this.firstChild.name) {
              firstSelect.classList.add('benar');
              this.classList.add('benar');
            } else {
              firstSelect.classList.remove('buka');
              firstSelect.classList.add('tutup');
              card.classList.remove('buka');
              card.classList.add('tutup');

              setTimeout(() => {
                face.style.display = 'none';
                firstSelect.firstChild.style.display = 'none';

                playerLives--;
                playerLivesCount.innerText = playerLives;
              }, 500);

              if (playerLives == 1) {
                playerLivesCount.innerText = 0;
                alert('Kamu Kalah! :(');
                document.location.href = '';
              }
            }
          }
        } else {
          face.style.display = 'none';
        }
      }

      const benar = document.querySelectorAll('.benar');
      if (benar.length == 12) {
        let scoreNow = parseInt(scoreGame);

        scoreNow += 1;

        localStorage.setItem('scoreGame', scoreNow.toString());
        alert('Kamu Menang! :(');
        document.location.href = '';
      }
    });
  });
};

cardGenerator();
