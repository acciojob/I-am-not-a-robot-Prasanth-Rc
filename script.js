//your code here
document.addEventListener("DOMContentLoaded", () => {
        const imageContainer = document.getElementById("image-container");
        const resetButton = document.getElementById("reset");
        const verifyButton = document.getElementById("verify");
        const resultMessage = document.getElementById("para");

        let imageUrls = [
          "https://picsum.photos/id/237/200/300",
          "https://picsum.photos/seed/picsum/200/300",
          "https://picsum.photos/200/300?grayscale",
          "https://picsum.photos/200/300/",
          "https://picsum.photos/200/300.jpg"
        ];

        let duplicateIndex = Math.floor(Math.random() * 5);
        let images = [...imageUrls];
        images.push(imageUrls[duplicateIndex]);
        images = images.sort(() => Math.random() - 0.5);

        let selectedImages = [];

        function renderImages() {
          imageContainer.innerHTML = "";
          images.forEach((src, index) => {
            let img = document.createElement("img");
            img.src = src;
            img.dataset.index = index;
            img.addEventListener("click", () => handleImageClick(img));
            imageContainer.appendChild(img);
          });
        }

        function handleImageClick(img) {
          if (selectedImages.length < 2 && !selectedImages.includes(img)) {
            img.classList.add("selected");
            selectedImages.push(img);
            resetButton.style.display = "block";

            if (selectedImages.length === 2) {
              verifyButton.style.display = "block";
            }
          }
        }

        verifyButton.addEventListener("click", () => {
          verifyButton.style.display = "none";
          if (selectedImages[0].src === selectedImages[1].src) {
            resultMessage.textContent = "You are a human. Congratulations!";
          } else {
            resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
          }
        });

        resetButton.addEventListener("click", () => {
          selectedImages.forEach(img => img.classList.remove("selected"));
          selectedImages = [];
          resetButton.style.display = "none";
          verifyButton.style.display = "none";
          resultMessage.textContent = "";
        });

        renderImages();
      });