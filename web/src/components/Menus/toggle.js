const linkColor = document.querySelectorAll('.nav__link')
function colorLink(){
    linkColor.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
}
linkColor.forEach(l => l.addEventListener('click', colorLink))