'use strict';
{
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('ul');
  const slides = ul.children;
  const dots = [];  
  let currentIndex = 0; //img.a=0, b=1, c=2

  function updateButtons() {
    prev.classList.remove('hidden');
    next.classList.remove('hidden');

    if (currentIndex === 0) {
      prev.classList.add('hidden');
    }
    //if (currentIndex === 2) {
      if (currentIndex === slides.length -1) {
      next.classList.add('hidden');
    }
  }

  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  }
  //#next,#prevのクリック動作の関数が重複していたので、modeSlidesという関数にまとめた

  function setupDots() {
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement('button');
      // ボタンをクリックイベントを追加する
      button.addEventListener('click', () => {
        currentIndex = i;
        updateDots();
        updateButtons();
        moveSlides();
      });

      dots.push(button);
      document.querySelector('nav').appendChild(button);
      console.log(dots);
    }

    dots[0].classList.add('current');
  }
  // 画像下側のボタンを動的に操作するための関数

  function updateDots() {
    dots.forEach(dot => {
      dot.classList.remove('current');
    });
    dots[currentIndex].classList.add('current');

  }
  // クリックしたボタンにcurrentIndexクラスを移動させるための関数
  // #next,#prevを押した時にもクラスが下ボタンのクラスが移動するように関数にする


  updateButtons();
  setupDots();

  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    moveSlides();
    updateDots();
  });
  //nextを押したら画像が画像幅分だけ横にスライドする
  //画像の幅をslideWidthで取得し、その幅だけtranslateXする

  prev.addEventListener('click', () => {
    currentIndex--;
    updateButtons();
    moveSlides();
    updateDots();
  });
  //nextとほぼ同じ動作でcurrentIndexの数が減っていくだけ

  // ウィンドウの幅を拡張したとき、隠れている画像が見えてしまうことがある
  window.addEventListener('resize', () => {
    // resize=ウィンドウの幅が変わったら　ということ
    moveSlides();
  });
}

