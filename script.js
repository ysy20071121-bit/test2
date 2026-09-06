/* ========================================
   스크롤 등장 애니메이션
======================================== */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -12% 0px"
  }
);


/* 관찰할 요소 */

document
  .querySelectorAll(".quote p, .reveal, .reveal-photo")
  .forEach(element => {
    observer.observe(element);
  });



/* ========================================
   사진 넘기기
======================================== */

document.querySelectorAll(".photos").forEach(photoArea => {

  photoArea.addEventListener("click", () => {

    const cards = [...photoArea.children];

    if (cards.length < 2) return;

    const firstCard = cards[0];


    /* 첫 번째 사진을 오른쪽으로 날림 */

    firstCard.style.transform =
      "translateX(120%) rotate(10deg)";

    firstCard.style.opacity = "0";


    /* 애니메이션이 끝난 후 맨 뒤로 이동 */

    setTimeout(() => {

      photoArea.appendChild(firstCard);


      /*
        DOM 순서가 바뀌었으므로
        모든 사진의 위치를 다시 설정
      */

      const newCards = [...photoArea.children];


      newCards.forEach((card, index) => {

        card.style.transition = "none";

        card.style.opacity = "1";

        card.style.left = `${index * 11}%`;

        card.style.zIndex = 3 - index;

        card.style.transform =
          `rotate(${[-2, 3, 7][index]}deg)`;

      });


      /*
        브라우저가 위치를 인식한 다음
        다시 transition 활성화
      */

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          newCards.forEach(card => {
            card.style.transition =
              "left .55s cubic-bezier(.22,.75,.2,1), " +
              "transform .55s cubic-bezier(.22,.75,.2,1), " +
              "opacity .55s ease";
          });

        });

      });

    }, 480);

  });

});



/* ========================================
   주종 & 안주 열기
======================================== */

document.querySelectorAll(".drink").forEach(button => {

  button.addEventListener("click", () => {

    const box = button.nextElementSibling;

    if (!box) return;

    box.classList.toggle("open");


    /*
      버튼의 화살표 변경
    */

    const isOpen = box.classList.contains("open");

    button.firstChild.textContent =
      isOpen ? "▼ " : "◀ ";

  });

});



/* ========================================
   메인 화면 음원
======================================== */

document.querySelectorAll("[data-audio]").forEach(button => {

  button.addEventListener("click", () => {

    const audio = new Audio(button.dataset.audio);

    audio.play().catch(() => {

      alert(
        "audio 폴더에 음원 파일을 넣어주세요."
      );

    });

  });

});
