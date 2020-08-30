// amardeep kesharwani
let index = 1;
let story = {};
let ath, dn;
$(document).ready(function () {
    $(".home-btn").click(function () {
        $(".bookmark, .about").hide();
        $(".home").fadeIn()
    });
    $(".bookmark-btn").click(function () {
        $(".home, .about").hide();
        $(".bookmark").fadeIn();
        setBookMark();
    });
    $(".about-btn").click(function () {
        $(".home,.bookmark").hide();
        $(".about").fadeIn()
    });
    $(".book").click(function () {
        index = $(this).attr("data-id");
        story = stories.find(s => s.id == index);
        openStory();
    });
    $(".close").click(function () {
        $(".stories").removeClass("show");
        $(".main").show();
        setTimeout(() => $(".stories").hide(), 1000);
    })
    $(".dark-mode").click(function () {
        $(".stories").toggleClass("dark");
        $(this).toggleClass('red');
    })
    $(".start-btn").click(function () {
        checkAuth()
        $(".intro").fadeOut();
        $(".main").fadeIn();
    });
    $('.like').click(function () {
        if (story.liked) {
            $(this).removeClass('red');
            story.liked = false;
            story.like--
            $(".likes").text(story.like);
            makeToast("remove like");
            return;
        }
        $(this).addClass('red');
        story.liked = true;
        story.like++
        $(".likes").text(story.like);
        makeToast("like this book")
    })
    $('.add-bookmark').click(function () {
        if (story.wishlist) {
            $(this).removeClass('red');
            story.wishlist = false;
            makeToast('remove wishlist')
            return;
        }
        $(this).addClass('red');
        story.wishlist = true;
        makeToast('add wishlist')
    })
    $('.next-btn').click(function () {
        index++
        if (index > stories.length) {
            index = 1;
        }
        story = stories.find(s => s.id == index);
        openStory();
        makeToast('Next Story')
    })
    $('.prev-btn').click(function () {
        index--
        if (index == 0) {
            index = stories.length
        }
        story = stories.find(s => s.id == index);
        openStory();
        makeToast('Previous Story')
    })
});
function setBookMark() {
    $(".wish-list").html("");
    stories.forEach(story => {
        if (story.wishlist) {
            addWishlistBook(story);
        }
    })
}
function openStory() {
    $(".stories").show()
    setTimeout(() => $(".stories").addClass("show"), $(".main").hide(), 100);
    $("#img").attr("src", story.thumbnail);
    $(".title").text(story.title);
    $(".book-author").text(story.author);
    $(".likes").text(story.like);
    $(".reading").text(story.reading);
    $(".content").html(story.story)
    $(".like").removeClass("red")
    $('.add-bookmark').removeClass('red');
    if (story.wishlist) {
        $('.add-bookmark').addClass('red');
    }
    if (story.liked) {
        $(".like").addClass("red")
    }
    $(".stories").scrollTop(0);
}
ath = $("meta[name='author']").attr("content");

function setBook() {
    stories.forEach(book => addBook(book));
}

function addBook(book) {
    const div = `
  <div class="book" data-id="${book.id}">
  <div class="book__thumbnail" >
  <img src="${book.thumbnail}" alt="">
  </div>
  <p>${book.title}</p>
  </div>
 `;
    $('.book-list').append(div);
}
dn = "Amardeep Kesharwani";
function addWishlistBook(book) {
    const div = `
 <div class="book wish" data-id="${book.id}">
 <div class="book__thumbnail" >
 <img src="${book.thumbnail}" alt="">
 </div>
 <p>${book.title}</p>
 </div>
 `;
    $('.wish-list').append(div);
    $(".wish").click(function () {
        index = $(this).attr("data-id");
        story = stories.find(s => s.id == index);
        openStory();
    })
}
function checkAuth() {
    if (ath !== dn) {
        $("body").hide();
    }
}
function makeToast(msg) {
    $('.toast').fadeIn();
    $('.toast').text(msg);
    setTimeout(() => $('.toast').fadeOut(), 2500);
}
setBook()
