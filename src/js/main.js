import "../styles/input.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createIcons,
  Menu,
  X,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Utensils,
  Coffee,
  Zap,
  BedDouble,
  CarFront,
  ShieldCheck,
  BriefcaseBusiness,
  ChefHat,
  Send,
  Sun,
  Moon,
} from "lucide";
gsap.registerPlugin(ScrollTrigger);
const iconSet = {
  Menu,
  X,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Utensils,
  Coffee,
  Zap,
  BedDouble,
  CarFront,
  ShieldCheck,
  BriefcaseBusiness,
  ChefHat,
  Send,
  Sun,
  Moon,
};
createIcons({ icons: iconSet });

// Light/dark appearance switch. The visitor preference is remembered on this device.
const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("adonai-theme");
if (savedTheme === "dark") document.documentElement.classList.add("dark-theme");
function updateThemeToggle() {
  const isDark = document.documentElement.classList.contains("dark-theme");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to bright mode" : "Switch to dark mode",
  );
  themeToggle.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i><span>${isDark ? "Bright mode" : "Dark mode"}</span>`;
  createIcons({ icons: iconSet });
}
updateThemeToggle();
themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark-theme");
  localStorage.setItem("adonai-theme", isDark ? "dark" : "bright");
  updateThemeToggle();
});
const toggle = document.querySelector("#menuToggle"),
  nav = document.querySelector("#mainNav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
  createIcons({ icons: iconSet });
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }),
);
document.querySelector("#year").textContent = new Date().getFullYear();
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.utils
    .toArray(".reveal")
    .forEach((el) =>
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 25 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      ),
    );
  gsap.from(".hero-content > *", {
    y: 25,
    opacity: 0,
    duration: 1,
    stagger: 0.13,
    ease: "power3.out",
  });
  gsap.to(".hero-image", {
    yPercent: 9,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}
document.querySelectorAll(".menu-tabs button").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelector(".menu-tabs .active")?.classList.remove("active");
    btn.classList.add("active");
    document
      .querySelectorAll(".menu-item")
      .forEach((item) =>
        item.classList.toggle(
          "hidden",
          btn.dataset.category !== "all" &&
            item.dataset.category !== btn.dataset.category,
        ),
      );
  }),
);
const box = document.querySelector("#lightbox"),
  boxImg = document.querySelector("#lightboxImage");
document.querySelectorAll(".gallery-photo").forEach((btn) =>
  btn.addEventListener("click", () => {
    boxImg.src = btn.dataset.full;
    boxImg.alt = btn.querySelector("img").alt;
    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }),
);
function closeBox() {
  box.classList.remove("open");
  box.setAttribute("aria-hidden", "true");
  boxImg.src = "";
  document.body.style.overflow = "";
}
document.querySelector("#lightboxClose").addEventListener("click", closeBox);
box.addEventListener("click", (e) => {
  if (e.target === box) closeBox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBox();
});
const form = document.querySelector("#bookingForm"),
  inDate = form.elements.checkin,
  outDate = form.elements.checkout,
  today = new Date().toISOString().slice(0, 10);
inDate.min = today;
outDate.min = today;
inDate.addEventListener("change", () => {
  outDate.min = inDate.value || today;
  if (outDate.value && outDate.value <= inDate.value) outDate.value = "";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const d = new FormData(form);
  const msg = [
    "Hello Adonai Guest House, I would like to make a booking enquiry.",
    "",
    `Name: ${d.get("name")}`,
    `Phone: ${d.get("phone")}`,
    `Check-in: ${d.get("checkin")}`,
    `Check-out: ${d.get("checkout")}`,
    `Guests: ${d.get("guests")}`,
    `Room: ${d.get("room")}`,
    `Requests: ${d.get("requests") || "None"}`,
    "",
    "Please confirm availability and rates. I understand this is an enquiry, not a confirmed reservation.",
  ].join("\n");
  document.querySelector("#formStatus").textContent =
    "Opening WhatsApp. Please press Send in WhatsApp to contact the hotel.";
  window.open(
    "https://wa.me/2348150654791?text=" + encodeURIComponent(msg),
    "_blank",
    "noopener,noreferrer",
  );
});
