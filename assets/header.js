document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("bg-white/70", "backdrop-blur-3xl","text-black");
      header.classList.remove("bg-transparent","text-white");
    } else {
      header.classList.add("bg-transparent" , "text-white");
      header.classList.remove("bg-white/70", "backdrop-blur-3xl","text-black");
    }
  };

  window.addEventListener("scroll", handleScroll);
});