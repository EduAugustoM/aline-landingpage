<script>
const elementos = document.querySelectorAll('.scroll-left, .scroll-right, .scroll-outer');

function fadeScroll() {
  const posicaoScroll = window.innerHeight * 0.8;

  elementos.forEach((elemento) => {
    const elementoTop = elemento.getBoundingClientRect().top - posicaoScroll;
    
    if (elementoTop < 120) {
      elemento.classList.add('ativo');
    } else {
      elemento.classList.remove('ativo');
    }
  });
}

window.addEventListener('scroll', fadeScroll);

fadeScroll();
</script>