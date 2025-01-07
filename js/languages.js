const langButtons = document.querySelectorAll("[data-language]");
const translateText = document.querySelectorAll("[data-section]");

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        fetch(`./languages/${button.dataset.language}.json`)
            .then((res) => {
                const selectedLanguage = button.dataset.language;
                localStorage.setItem("idioma", selectedLanguage);
                return res.json();
            })
            .then((data) => {
                translateText.forEach((el) => {
                    const section = el.dataset.section;
                    const value = el.dataset.value;

                    el.innerHTML = data[section][value];
                });
            })
            .catch((error) => {
                console.error("Error al cargar JSON:", error);
            });
    });
});

window.onload = () => {
  const savedLanguage = localStorage.getItem("idioma");
  translatePage(savedLanguage);
}

function translatePage(language) {
    fetch(`./languages/${language}.json`)
    .then((res) => res.json())
    .then((data) => {
        translateText.forEach((el) => {
            const section = el.dataset.section;
            const value = el.dataset.value;

            el.innerHTML = data[section][value];
        })
    })
}