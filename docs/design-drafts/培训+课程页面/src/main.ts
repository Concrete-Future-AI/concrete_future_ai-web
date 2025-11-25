import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/page.css";

const nav = document.querySelector<HTMLDivElement>(".main-navigation");
let lastScroll = 0;

window.addEventListener("scroll", () => {
	if (!nav) return;
	const current = window.scrollY;
	nav.classList.toggle("nav-scrolled", current > 40);

	const scrollingUp = current < lastScroll;
	nav.classList.toggle("nav-hidden", current > 200 && !scrollingUp);
	lastScroll = current;
});

const accordionHeaders =
	document.querySelectorAll<HTMLButtonElement>(".accordion-header");
document.querySelector(".accordion-item")?.classList.add("active");

for (const header of accordionHeaders) {
	header.addEventListener("click", () => {
		const item = header.closest(".accordion-item");
		if (!item) return;
		const isActive = item.classList.contains("active");

		const accordionItems =
			document.querySelectorAll<HTMLDivElement>(".accordion-item");
		for (const accordionItem of accordionItems) {
			accordionItem.classList.remove("active");
		}

		if (!isActive) {
			item.classList.add("active");
		}
	});
}
