$.modal = () =>
{
    const modalWindow = document.createElement('div')
    modalWindow.classList.add('modal')
    modalWindow.insertAdjacentHTML('afterbegin',`
    <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-close" data-close="true"></div>
            <h1 class="modal-title"></h1>
            <p class="modal-content"></p>
        </div>
    </div>
    `)
    
    document.body.appendChild(modalWindow)


    const modal =
    {
        setContent(article)
        {
            modalWindow.querySelector('.modal-title').innerHTML = article.title
            modalWindow.querySelector('.modal-content').innerHTML = article.content
        },
        
        open()
        {
            modalWindow.classList.add('open')    
            document.body.style.height = '100vh'
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '15px'
        },
        
        close()
        {
            modalWindow.querySelector('.modal-content').scrollTo(0, 0) //возвращение скролла на место при закрытии карточки

            modalWindow.classList.remove('open')
            document.body.style.height = 'auto'
            document.body.style.overflow = 'visible'
            document.body.style.paddingRight = '0'

        }
    }

    const listener = event =>
    {
        if (event.target.dataset.close)
        {
            modal.close()
        }
    }
    
    modalWindow.addEventListener('click', listener)
    
    modal.destroy = () => //добавляем метод
    {
        modalWindow.removeEventListener('click', listener)
        modalWindow.parentNode.removeChild(modalWindow)
    }

    return modal
}