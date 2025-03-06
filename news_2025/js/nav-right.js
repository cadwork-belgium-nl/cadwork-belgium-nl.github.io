document.addEventListener("DOMContentLoaded", function () {
    const toc = document.getElementById("nav-right");
    const content = document.getElementById("content");
    const headings = content.querySelectorAll("h2, h3, h4");

    // Ajouter un en-tête à la table des matières
    const tocHeader = document.createElement("h3");
    tocHeader.textContent = "Inhoudstafel";
    toc.appendChild(tocHeader);

    // Crée la table des matières avec une structure hiérarchique
    const tocList = document.createElement("ol");
    let currentLevel = 2;
    let parent = tocList;

    headings.forEach((heading, index) => {
        // Générer un id si absent
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const level = parseInt(heading.tagName.replace("H", ""), 10);
        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;

        const listItem = document.createElement("li");
        listItem.appendChild(link);

        if (level > currentLevel) {
            // Ajouter une sous-liste
            const subList = document.createElement("ol");
            parent.lastChild.appendChild(subList);
            parent = subList;
        } else if (level < currentLevel) {
            // Remonter dans la hiérarchie
            for (let i = 0; i < currentLevel - level; i++) {
                parent = parent.parentNode.parentNode;
            }
        }

        currentLevel = level;
        parent.appendChild(listItem);
    });

    toc.appendChild(tocList);

    // Gestion de l'élément actif
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = toc.querySelector(`a[href="#${id}"]`);
                const listItem = link.parentElement;

                if (entry.isIntersecting) {
                    link.classList.add("active");
                    listItem.classList.add("active");
                } else {
                    link.classList.remove("active");
                    listItem.classList.remove("active");
                }
            });
        },
        {
            root: null,
            rootMargin: "0px 0px -80% 0px",
            threshold: 0.1
        }
    );

    headings.forEach(heading => {
        observer.observe(heading);
    });
});
