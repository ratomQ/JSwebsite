//================= Окно 1 ====================

$.firstWindow = {}

$.firstWindow.open = () =>
{
    const content = document.createElement('div')
    content.classList.add('content')
    content.insertAdjacentHTML('afterbegin',`
        <h1 class="content-title">JS Practice</h1>
        <button class="content-btn" data-openSW>Войти</button>
    `)

    content.querySelector('[data-openSW]').addEventListener('click', event =>
    {
        $.firstWindow.close().then(() =>
        {
            $.secondWindow.open()
        })
    })

    $.firstWindow.content = content

    document.body.appendChild(content)
}

$.firstWindow.close = () =>
{
    const content = $.firstWindow.content

    content.classList.add('animate__animated')
    content.classList.add('animate__bounceOut')
    
    return new Promise(resolve =>
    {
        setTimeout(() =>
        {
            document.body.removeChild(content)
            resolve()
        }, 750)
    })
}

$.firstWindow.open()


//================= Окно 2 ====================

$.secondWindow = {}

$.secondWindow.open = () =>
{
    const html = articles.map(e =>`
    <div class="block" data-id="${e.id}">
        <h3 class="block-title">${e.title || 'Title'}</h3>
        <p class="block-content">${e.content.substring(0, 512) + '...' || ''}</p>
        <div class="block-footer">
            <button class="block-btn1" data-type="read" data-id="${e.id}">Читать продолжение</button>
            <button class="block-btn2" data-type="remove" data-id="${e.id}">Удалить</button>
        </div>
    </div>    
    `).join('')

    
    const container = document.createElement('div')
    container.classList.add('container')
    
    const containerTitle = document.createElement('h1')
    containerTitle.classList.add('container-title')
    containerTitle.innerHTML = 'Articles'
    container.appendChild(containerTitle)
    
    const div = document.createElement('div')
    div.classList.add('container-blocks')
    div.insertAdjacentHTML('afterbegin', html)
    
    container.appendChild(div)

    container.classList.add('animate__animated')
    container.classList.add('animate__backInDown')
    
    $.secondWindow.content = container
    
    setTimeout(() =>
    {
        document.body.appendChild(container)
    }, 100)
}

$.secondWindow.close = () =>
{
    const container = $.secondWindow.content
    document.body.removeChild(container)
}

document.addEventListener('click', event =>
{
    const btnID = +event.target.dataset.id
    const type = event.target.dataset.type
    const article = articles.find(f => f.id === btnID)

    if (type === 'read')
    {
        modal.setContent(article)
        modal.open()
    }
    else if (type === 'remove')
    {

        const block = document.body.querySelector(`[data-id="${btnID}"]`)
        block.classList.add('animate__animated')
        block.classList.add('animate__fadeOutUp')

        articles = articles.filter(item => item !== article)

        setTimeout(() =>
        {
            block.remove()
        }, 1000)
    }
})

//================= Modal ====================

const modal = $.modal() //создаем модальное окно без запуска