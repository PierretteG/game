let panacekX = 100,
	panacekY = 100,
	panacekSirka = 64,
	panacekVyska = 70;

let panacek = document.querySelector('#panacek');

let minceX = 0,
	minceY = 0,
	minceSirka = 36,
	minceVyska = 36;

let mince = document.querySelector('#mince');

let zvukMince = document.querySelector('#zvukmince');

let pocetMinci = 0,
	score = document.querySelector('#score');

let vyhrano = false;

let fanfara = document.querySelector('#zvukfanfara');

let mouchaX = 0,
	mouchaY = 0,
	mouchaSirka = 72,
	mouchaVyska = 36,
	mouchaKrokX = 20,
	mouchaKrokY = 20;


let moucha = document.querySelector('#moucha');

let zvukSrazky = document.querySelector('#zvuksrazky');

let pocetZivotu = 5;

let zivoty = document.querySelector('#zivoty5');

let prohrano = false;

let imunita = 0;


// na začátku hry umístíme panáčka na výchozí souřadnice
umistiPanacka();

// vygeneruje náhodnou polohu a minci tam umístíme
umistiMinci();

setInterval(pohniMouchou, 200);





function priStiskuKlavesy(udalost) {

	if (vyhrano) {
		return;
	}

	if (udalost.key === 'ArrowRight') {
		panacekX = panacekX + 20;

		if (panacekX > window.innerWidth - panacekSirka) {
			panacekX = window.innerWidth - panacekSirka;
		}

		panacek.src = 'obrazky/panacek-vpravo.png';
	}

	if (udalost.key === 'ArrowLeft') {
		panacekX = panacekX - 20;

		if (panacekX < 0) {
			panacekX = 0;
		}

		panacek.src = 'obrazky/panacek-vlevo.png';
	}

	if (udalost.key === 'ArrowDown') {
		panacekY = panacekY + 20;

		if (panacekY > window.innerHeight - panacekVyska) {
			panacekY = window.innerHeight - panacekVyska;
		}

		panacek.src = 'obrazky/panacek.png';
	}

	if (udalost.key === 'ArrowUp') {
		panacekY = panacekY - 20;

		if (panacekY < 0) {
			panacekY = 0;
		}

		panacek.src = 'obrazky/panacek-nahoru.png';
	}




	umistiPanacka();

	if (!(panacekX + panacekSirka < minceX ||
			minceX + minceSirka < panacekX ||
			panacekY + panacekVyska < minceY ||
			minceY + minceVyska < panacekY)) {
		// panacek a mince se prekryvaji

		zvukMince.play();
		pocetMinci++;
		score.innerText = pocetMinci;

		if (pocetMinci === 10) {
			score.innerText = 'Vyhral jsi!';
			vyhrano = true;
			fanfara.play();


		}

		umistiMinci();
	}
}




function umistiPanacka() {
	// umístíme panáčka na obrazovce na souřadnice panacekX, panacekY
	panacek.style.left = panacekX + 'px';
	panacek.style.top = panacekY + 'px';
}

function umistiMinci() {
	// vygenerujeme náhodne souřadnice pro minci
	minceX = Math.floor(Math.random() * (window.innerWidth - minceSirka));
	minceY = Math.floor(Math.random() * (window.innerHeight - minceVyska));

	// umístíme minci na souřadnice minceX, minceY
	mince.style.left = minceX + 'px';
	mince.style.top = minceY + 'px';
}

function pohniMouchou() {

	if (prohrano || vyhrano) {
		return;
	}

	mouchaX += mouchaKrokX;
	mouchaY += mouchaKrokY;

	if (mouchaX > window.innerWidth - mouchaSirka) {

		mouchaX = window.innerWidth - mouchaSirka;
		mouchaKrokX = -(Math.floor(Math.random() * 25 + 10));
		moucha.src = 'obrazky/moucha-vlevo.png';
	}

	if (mouchaX < 0) {
		mouchaX = 0;
		mouchaKrokX = (Math.floor(Math.random() * 25 + 10));
		moucha.src = 'obrazky/moucha-vpravo.png';
	}

	if (mouchaY > window.innerHeight - mouchaVyska) {

		mouchaY = window.innerHeight - mouchaVyska;
		mouchaKrokY = -(Math.floor(Math.random() * 25 + 10));
		moucha.src = 'obrazky/moucha-vlevo.png';
	}

	if (mouchaY < 0) {
		mouchaY = 0;
		mouchaKrokY = (Math.floor(Math.random() * 25 + 10));
		moucha.src = 'obrazky/moucha-vpravo.png';
	}

	if (!(panacekX + panacekSirka < mouchaX ||
			mouchaX + mouchaSirka < panacekX ||
			panacekY + panacekVyska < mouchaY ||
			mouchaY + mouchaVyska < panacekY)) {

		zvukSrazky.play();
		pocetZivotu--;
		
		document.querySelector('#zivoty').src = 'obrazky/srdce-' + pocetZivotu + '.png';


		if (pocetZivotu === 0) {
			document.querySelector('#zivoty').src = 'obrazky/srdce-0.png';
			score.innerText = 'Game over :( Play again?';
			score.style.top = (window.innerHeight / 2.5) + 'px';
			score.style.left = (window.innerWidth / 5) + 'px';
			prohrano = true;
			hratZnovu();
		}

	}


	moucha.style.left = mouchaX + 'px';
	moucha.style.top = mouchaY + 'px';
}

function hratZnovu() {
	let buttonGroup =  document.querySelector('#button-group') 
	buttonGroup.style.display = 'block';
	buttonGroup.style.top = (window.innerHeight / 2) + 'px';
	buttonGroup.style.left = (window.innerWidth / 2.5) + 'px';
}

function yes() {
	window.location.reload();
}

function no() {
	window.close();
}