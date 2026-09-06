/* ========================================
   JS 작동 표시
   JS가 작동하면 html에 js-enabled 추가
======================================== */

document.documentElement.classList.add("js-enabled");


/* ========================================
   스크롤 애니메이션
======================================== */

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15,

        rootMargin:
            "0px 0px -10% 0px"
    }
);


/* ========================================
   사진 영역
======================================== */

document
    .querySelectorAll(".photos")
    .forEach((photos) => {

        observer.observe(photos);

    });


/* ========================================
   인용문 애니메이션
======================================== */

document
    .querySelectorAll(".quote p")
    .forEach((text) => {

        observer.observe(text);

    });


/* ========================================
   캐릭터 정보 애니메이션
======================================== */

document
    .querySelectorAll(
        ".info h2, " +
        ".info small, " +
        ".info p, " +
        ".info .voice, " +
        ".info .tags"
    )
    .forEach((element) => {

        element.classList.add("reveal-item");

        observer.observe(element);

    });


/* ========================================
   사진 카드 넘기기
======================================== */

document
    .querySelectorAll(".photos")
    .forEach((photos) => {

        let moving = false;


        photos.addEventListener("click", () => {

            /* 애니메이션 중에는 중복 클릭 방지 */
            if (moving) {
                return;
            }

            moving = true;


            const cards =
                Array.from(
                    photos.querySelectorAll(".ph")
                );


            const firstCard = cards[0];


            /* 앞 카드가 오른쪽으로 빠짐 */

            firstCard.classList.add("leaving");


            setTimeout(() => {

                /*
                    첫 번째 카드를
                    맨 뒤로 이동
                */

                photos.appendChild(firstCard);


                /*
                    기존 inline 스타일 초기화
                */

                firstCard.classList.remove("leaving");


                /*
                    카드들의 위치 다시 계산
                */

                const newCards =
                    Array.from(
                        photos.querySelectorAll(".ph")
                    );


                newCards.forEach(
                    (card, index) => {

                        card.style.left =
                            `${index * 11}%`;

                        card.style.zIndex =
                            3 - index;

                        card.style.transform =
                            `rotate(${
                                [-2, 3, 7][index]
                            }deg)`;

                        card.style.opacity = "1";

                    }
                );


                moving = false;

            }, 500);

        });

    });


/* ========================================
   쿠리만쥬 주종 & 안주
======================================== */

document
    .querySelectorAll(".drink")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const box =
                    button.nextElementSibling;


                if (!box) {
                    return;
                }


                box.classList.toggle("open");


                if (box.classList.contains("open")) {

                    button.textContent =
                        "▼ 주종 & 안주";

                } else {

                    button.textContent =
                        "◀ 주종 & 안주";

                }

            }
        );

    });


/* ========================================
   메인 음악
======================================== */

const mainSound =
    document.getElementById("mainSound");


if (mainSound) {

    let audio = null;


    mainSound.addEventListener(
        "click",
        () => {

            if (!audio) {

                audio =
                    new Audio("audio/main.mp3");

            }


            if (audio.paused) {

                audio.play()
                    .catch(() => {

                        alert(
                            "audio 폴더 안에 main.mp3 파일이 있는지 확인해주세요."
                        );

                    });

            } else {

                audio.pause();

            }

        }
    );

}


/* ========================================
   캐릭터 음성 버튼
   별도 음성 파일이 없으므로
   브라우저의 음성 기능을 사용
======================================== */

document
    .querySelectorAll(".voice")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const name =
                    button.dataset.name;


                /*
                    브라우저가 음성 합성을 지원하는 경우
                    캐릭터 이름을 읽어줌
                */

                if (
                    "speechSynthesis"
                    in window
                ) {

                    window
                        .speechSynthesis
                        .cancel();


                    const utterance =
                        new SpeechSynthesisUtterance(
                            name
                        );


                    utterance.lang = "ko-KR";

                    utterance.rate = 0.9;

                    utterance.pitch = 1.2;


                    window
                        .speechSynthesis
                        .speak(
                            utterance
                        );

                }

            }
        );

    });
