/* =========================================================
   Birthday Surprise Site - plain JavaScript version
   ========================================================= */

/* ---------------------------------------------------------
   SETTINGS - change these
   --------------------------------------------------------- */
const NAME = "Khushu";                 // the birthday person's name
const FROM = "Your Foolish Brother"; // your name / sign-off
const SECRET_CODE = "1811";            // their birthday as DDMM (15 Oct = "1510"), typed on the "Party Gateway" screen

// The birthday message that gets typed out. Line breaks are kept as you write them.
const FULL_MESSAGE = `Oh My Dearest sister, ${NAME}! 🎉
ahead of this is something you wouldn’t expect,

and it needs to be accessed after a specific time. 

That’s why I’ve locked the button. No matter how many times you spam 

it, it will only move forward after 18th October past 10:00 pm. And why not on your Bday? 

Is bcuz that is something that should not be said on your bday 🤪😝. So I request your 

kind patience and wait till it opens. It’s a things that will make you beat the shit Outta me 😅😭. Just 

don’t beat me, either way you won’t be getting that chance anyway 😆😜. And yaa, don’t let curiosity
 
get the best of you, be like a good girl and wait, got it...

With Lots of Apologies,

${FROM} 🎂`;

// confetti colours
// the "View Memories" button stays locked until this moment (18 Oct 2026, 10:00 pm IST)
const UNLOCK_AT = new Date("2026-10-18T22:00:00+05:30");

const CONFETTI_COLORS = ["#fde047", "#fb923c", "#f472b6", "#a78bfa", "#22d3ee", "#4ade80"];

/* --------------------------------------------------------- */
const $ = (id) => document.getElementById(id);
const rand = (min, max) => min + Math.random() * (max - min);
const ICON = (id, style) => `<svg class="icon" style="${style || ""}"><use href="#${id}"/></svg>`;

// confetti burst from the middle of the screen
function confettiBurst(count) {
  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  document.body.appendChild(layer);

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "confetti";
    const size = rand(6, 12);
    p.style.width = size + "px";
    p.style.height = size * rand(0.4, 1) + "px";
    p.style.left = "50%";
    p.style.top = "40%";
    p.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    p.style.borderRadius = Math.random() < 0.3 ? "50%" : "2px";
    layer.appendChild(p);

    const angle = rand(0, Math.PI * 2);
    const dist = rand(100, 380);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 120;
    p.animate(
      [
        { transform: "translate(0px, 0px) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy + 500}px) rotate(${rand(360, 1080)}deg)`, opacity: 0 },
      ],
      { duration: rand(1800, 3200), easing: "cubic-bezier(.2,.7,.4,1)", fill: "forwards" }
    );
  }
  setTimeout(() => layer.remove(), 3500);
}

/* ---------------------------------------------------------
   1. Screen navigation
   loader -> secretCode -> giftReveal -> birthdayIntro -> message
   --------------------------------------------------------- */
let currentScreen = "loader";
let switching = false;

// code that runs when a screen is shown / left
const screenHooks = {
  loader:          { enter: startLoader,  leave: stopLoader },
  secretCode:      { enter: focusCode },
  giftReveal:     { enter: startReveal,  leave: stopReveal },
  message:         { enter: startTyping,  leave: stopTyping },
};

function goTo(name) {
  if (switching || name === currentScreen) return;
  switching = true;

  const from = $("screen-" + currentScreen);
  const to = $("screen-" + name);
  const leavingName = currentScreen;
  const leaveTime = leavingName === "giftReveal" ? 1000 : 800;

  from.classList.add("leaving");
  setTimeout(() => {
    from.classList.remove("active", "leaving");
    if (screenHooks[leavingName] && screenHooks[leavingName].leave) screenHooks[leavingName].leave();

    currentScreen = name;
    to.classList.add("active", "entering");
    window.scrollTo(0, 0);
    if (screenHooks[name] && screenHooks[name].enter) screenHooks[name].enter();

    setTimeout(() => {
      to.classList.remove("entering");
      switching = false;
    }, name === "giftReveal" ? 1000 : 800);
  }, leaveTime);
}

/* ---------------------------------------------------------
   2. Loader (progress bar)
   --------------------------------------------------------- */
let loaderTimer = null;
let loaderDoneTimer = null;
let progress = 0;

function startLoader() {
  progress = 0;
  renderProgress();
  loaderTimer = setInterval(() => {
    if (progress >= 99) {
      clearInterval(loaderTimer);
      progress = 100;
      renderProgress();
      loaderDoneTimer = setTimeout(() => goTo("secretCode"), 800);
      return;
    }
    progress += 1.5;
    renderProgress();
  }, 60);
}
function stopLoader() {
  clearInterval(loaderTimer);
  clearTimeout(loaderDoneTimer);
}
function renderProgress() {
  $("progress-fill").style.width = progress + "%";
  $("progress-text").textContent = Math.round(progress) + "%";
}

/* ---------------------------------------------------------
   3. Secret code
   --------------------------------------------------------- */
let wrongTimer = null;

function focusCode() {
  // (not auto-focused on purpose, so the phone keyboard doesn't pop up by itself)
}

$("code-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("code-input");

  if (input.value === SECRET_CODE) {
    goTo("giftReveal");
    return;
  }

  // wrong code: shake the card, show the message for 2.5 seconds
  const card = $("code-card");
  card.classList.remove("shake");
  void card.offsetWidth; // restart the animation
  card.classList.add("shake");

  input.classList.add("wrong");
  $("wrong-msg").hidden = false;
  input.value = "";

  clearTimeout(wrongTimer);
  wrongTimer = setTimeout(() => {
    input.classList.remove("wrong");
    $("wrong-msg").hidden = true;
  }, 2500);
});

/* ---------------------------------------------------------
   4. Gift reveal (gift splits in two, sparkles + balloons + confetti burst out)
   --------------------------------------------------------- */
let revealTimers = [];

function startReveal() {
  const stage = $("reveal-stage");
  stage.querySelectorAll(".fx").forEach((el) => el.remove());
  $("reveal-text").hidden = true;

  // 12 sparkles burst outwards in a circle
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 * Math.PI) / 180;
    const dx = Math.cos(angle) * 150;
    const dy = Math.sin(angle) * 150;
    const delay = 2800 + i * 100;

    const outer = document.createElement("div");
    outer.className = "fx";
    const inner = document.createElement("div");
    inner.innerHTML = ICON("i-sparkles", "width:24px;height:24px;color:#fde047");
    outer.appendChild(inner);
    stage.appendChild(outer);

    outer.animate(
      [{ transform: "translate(0px, 0px)" }, { transform: `translate(${dx}px, ${dy}px)` }],
      { duration: 2500, delay, easing: "ease-out", fill: "both" }
    );
    inner.animate(
      [
        { opacity: 0, transform: "scale(0.1)", easing: "ease-out" },
        { opacity: 1, transform: "scale(1.5)", easing: "ease-out" },
        { opacity: 0, transform: "scale(0)" },
      ],
      { duration: 2500, delay, fill: "both" }
    );
  }

  // 8 balloons & party emojis float upwards
  const BALLOONS = ["🎈", "🎉", "🎁", "🎂", "🎈", "✨", "🎈", "🥳"];
  for (let i = 0; i < 8; i++) {
    const x = (Math.random() - 0.5) * 240;
    const delay = 3200 + i * 200;

    const outer = document.createElement("div");
    outer.className = "fx fx-balloon";
    const inner = document.createElement("div");
    inner.textContent = BALLOONS[i];
    outer.appendChild(inner);
    stage.appendChild(outer);

    outer.animate(
      [
        { transform: "translate(0px, 0px) rotate(0deg)" },
        { transform: `translate(${x}px, -240px) rotate(${rand(-25, 25)}deg)` },
      ],
      { duration: 3000, delay, easing: "ease-out", fill: "both" }
    );
    inner.animate(
      [
        { opacity: 0, transform: "scale(0.1)", easing: "ease-out" },
        { opacity: 1, transform: "scale(1.2)", easing: "ease-out" },
        { opacity: 0, transform: "scale(0.5)" },
      ],
      { duration: 3000, delay, fill: "both" }
    );
  }

  // text appears after 2s, whole screen moves on after 6s
  revealTimers.push(setTimeout(() => confettiBurst(120), 2800)); // gift pops open
  revealTimers.push(setTimeout(() => { $("reveal-text").hidden = false; }, 2000));
  revealTimers.push(setTimeout(() => goTo("birthdayIntro"), 6000));
}
function stopReveal() {
  revealTimers.forEach(clearTimeout);
  revealTimers = [];
}

/* ---------------------------------------------------------
   5. Intro
   --------------------------------------------------------- */
$("btn-show").addEventListener("click", () => goTo("message"));

/* ---------------------------------------------------------
   6. Message (typewriter effect)
   --------------------------------------------------------- */
let typeTimer = null;
let showBtnTimer = null;

function startTyping() {
  const text = $("msg-text");
  const scroll = $("msg-scroll");
  const chars = Array.from(FULL_MESSAGE); // keeps emojis whole
  let i = 0;

  text.textContent = "";
  $("msg-btn-wrap").hidden = true;
  $("msg-wrap").classList.remove("up");

  const textNode = document.createTextNode("");
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  text.appendChild(textNode);
  text.appendChild(cursor);

  function step() {
    if (i < chars.length) {
      i++;
      textNode.nodeValue = chars.slice(0, i).join("");
      scroll.scrollTop = scroll.scrollHeight; // follow the text as it's typed
      typeTimer = setTimeout(step, 20);
    } else {
      cursor.remove();
      confettiBurst(80); // message finished
      showBtnTimer = setTimeout(() => {
        $("msg-btn-wrap").hidden = false;
        $("msg-wrap").classList.add("up");
      }, 1000);
    }
  }
  step();
}
function stopTyping() {
  clearTimeout(typeTimer);
  clearTimeout(showBtnTimer);
}
// The apology page is deliberately not deployed until the scheduled workflow
// publishes it. This client-side check gives a friendly popup; the missing file
// is what prevents the page from being reached early through this website.
const releaseModal = $("release-modal");
const releaseStatus = $("release-status");
let releaseCheckBusy = false;
let lastFocusBeforeModal = null;

function showReleaseModal(message) {
  if (message) releaseStatus.textContent = message;
  lastFocusBeforeModal = document.activeElement;
  releaseModal.hidden = false;
  document.body.classList.add("release-modal-open");
  $("release-ok").focus();
}
function hideReleaseModal() {
  releaseModal.hidden = true;
  document.body.classList.remove("release-modal-open");
  if (lastFocusBeforeModal && typeof lastFocusBeforeModal.focus === "function") lastFocusBeforeModal.focus();
}
$("release-close").addEventListener("click", hideReleaseModal);
$("release-ok").addEventListener("click", hideReleaseModal);
releaseModal.querySelector("[data-close-release]").addEventListener("click", hideReleaseModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !releaseModal.hidden) hideReleaseModal();
});

$("btn-memories").addEventListener("click", async () => {
  if (releaseCheckBusy) return;
  const now = Date.now();
  if (now < UNLOCK_AT.getTime()) {
    showReleaseModal();
    return;
  }

  // The workflow can run a few minutes late. Only navigate once the file
  // actually exists on the published site; otherwise explain the delay.
  releaseCheckBusy = true;
  const button = $("btn-memories");
  button.setAttribute("aria-busy", "true");
  try {
    const response = await fetch("../sorry/index.html?release-check=" + Date.now(), {
      method: "HEAD", cache: "no-store"
    });
    if (response.ok) {
      window.location.href = "../sorry/";
      return;
    }
    showReleaseModal("The scheduled release time has arrived, but GitHub is still publishing the page. Please wait a few minutes and try again. 💗");
  } catch (error) {
    showReleaseModal("I couldn’t confirm that the apology page has finished publishing. Please check your connection and try again in a few minutes. 💗");
  } finally {
    releaseCheckBusy = false;
    button.removeAttribute("aria-busy");
  }
});

/* ---------------------------------------------------------
   8. Start!
   --------------------------------------------------------- */
(function init() {
  const first = $("screen-loader");
  first.classList.add("entering");
  setTimeout(() => first.classList.remove("entering"), 800);
  startLoader();
})();
