//OUR SERVICE PART:
let $tabs = $('.tabs');
$tabs.on('click', handler);

function handler(event) {
    if (event.target.dataset.hasOwnProperty('tabLink')) {
        const linkValue = event.target.dataset.tabLink;
        $('.tab-active').removeClass('tab-active');
        $('.content-active').removeClass('content-active');
        event.target.classList.add('tab-active');
        $(`[data-tab-name='${linkValue}']`)
            .addClass('content-active')
    }
}

//CATEGORIES PART:
const $categories = $('.category');

function select(event) {
    event.preventDefault();
    //when categories selected,except "all" category:
    if (event.target.dataset.hasOwnProperty('category')) {
        $('.category-content').show();
        $('.active-category').removeClass('active-category');
        $('.active-img').removeClass('active-img');
        const categoryValue = event.target.dataset.category;
        $('.category-content').filter(`[data-category-content='${categoryValue}']`).addClass('active-img');
        $(`[data-category='${categoryValue}']`).addClass('active-category');
        $('.category-content:not(.active-img)').hide();
    }
    //if "all" category selected:
    if (event.target.dataset.hasOwnProperty('ownCategory')) {
        const value = event.target.dataset.ownCategory;
        $('.active-category').removeClass('active-category');
        $(`[data-own-category='${value}']`).addClass('active-category');
        $('.category-content').show()
    }
}

$categories.on('click', select);


//Add 12 images:
$('.load-more').on('click', imageLoader)

function imageLoader() {
    //images were added with previously assigned categories.
    // They will be distributed accordingly to proper categories:
    $('.img-container').append(`
<div class="new-container">
  <div class="category-content" data-category-content="graphic">
        <img src="./images/wordpress2.jpg" alt="" >
  </div>
   <div class="category-content" data-category-content="graphic">
        <img src="./images/wordpress3.jpg" alt="1" >
    </div>
    <div class="category-content" data-category-content="web">
        <img src="./images/wordpress4.jpg" alt="" >
    </div>
    <div class="category-content" data-category-content="web">
        <img src="./images/wordpress5.jpg" alt="" >
    </div>
    <div class="category-content" data-category-content="landing">
        <img src="./images/wordpress6.jpg" alt="" >
    </div>
    <div class="category-content" data-category-content="wordpress">
        <img src="./images/wordpress7.jpg" alt="" >
    </div>
    <div class="category-content" data-category-content="wordpress">
        <img src="./images/wordpress8.jpg" alt="" >
    </div>
    <div class="category-content" data-category-content="landing">
        <img src="./images/wordpress9.jpg" alt="" >
    </div>
    <div class="category-content" data-category-content="web">
        <img src="./images/wordpress10.jpg" alt="" >
    </div>
    <div class="category-content" data-category-content="web">
        <img src="./images/web-design1.jpg" alt="" >
    </div>
    <div class="category-content" data-category-content="graphic">
        <img src="./images/web-design2.jpg" alt="" >
    </div>
    <div class="category-content" data-category-content="graphic">
        <img src="./images/web-design3.jpg" alt="" >
    </div>
</div>
`)
    $('.new-container').css({
        'display': 'flex',
        'flex-wrap': 'wrap'
    })

    //if "all" category was active before adding photos:
    if ($('.active-category').data('ownCategory')) {
        $('.load-more').hide();
    } else {
        //if another categories where active before adding,
        // hide added photos that don't match selected category:
        const activeCategory = $('.active-img').data("categoryContent");

        $(`*[data-category-content='${activeCategory}']`).addClass('active-img').show()
        $('.category-content:not(.active-img)').hide();
        $('.load-more').hide();
    }
}

// CAROUSEL PART:

$('.feedback').hide();
$(`[data-feedback="Hasan Ali"]`).show()

$('.selected').append(`
    <h2>${$('.moved-icon').data('name')}</h2>
    <p>${$('.moved-icon').data('position')}</p>
    <img src="${$('.moved-icon').attr('src')}"/>
    `)

// selecting icon by click:
$('.list img').click(function () {
    selectPerson($(this));
})

//function: what to do if person selected:
function selectPerson($el) {
    $('.feedback').hide();
    $('.moved-icon').removeClass('moved-icon')
    $('.selected')
        .empty()
        .data('id', $el.data('id'))
        .append(`
    <h2>${$el.data('name')}</h2>
    <p>${$el.data('position')}</p>
    <img src="${$el.attr('src')}"/>
    `)
    $el.addClass('moved-icon');
    //binding feedbacks with selected icon:
    let value = $el.data('name');
    $(`[data-feedback="${value}"]`).show();


}

// selecting person by arrows of carousel:
$('.arrow-right').on('click', goNext);

function goNext() {
    const $previousMoved = $('.moved-icon').removeClass('moved-icon');
    let $next = $previousMoved.next();
    if ($next.length === 0) {
        $next = $('.list').children().first()
    }
    $next.addClass('moved-icon');
    selectPerson($next);
}

$('.arrow-left').on('click', goLeft);

function goLeft() {
    const $previousMoved = $('.moved-icon').removeClass('moved-icon');
    let $left = $previousMoved.prev();
    if ($left.length === 0) {
        $left = $('.list').children().last();
    }
    $left.addClass('moved-icon');
    selectPerson($left);
}

// white block:
function overimg(event) {
    $('.active-image').removeClass('active-image');
    $(event.target).addClass('active-image')
    if (!($('.active-image').next().is('.overlay'))) {
        $(event.currentTarget).append(
            ` <div class="overlay">
                    <div class="rounds"><a href="#" class="search"><i class="icon-link"></i></a><a href="#"
                                                                                                   class="search"><i
                            class="icon-search ic"></i></a></div>
                    <a href class="overlay-line1"><span>creative design</span></a>
                    <div class="overlay-line2"><span>Web Design</span></div>
                </div>`)
    }
}


$('.img-container').on('mouseenter', '.category-content', overimg)