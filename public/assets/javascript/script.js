$(document).ready(function() {


      
    $('#scrape-btn').on('click', function() {
        event.preventDefault();

        $('html,body').animate({
            scrollTop: $(".scraped-container").offset().top
        }, 1000);
        
        // $.getJSON("/headlines", function(data) {
        // for (var i = 0; i < 10; i++) {
        //     $(".cards").append("<img src=" + data[i].img_url + "><h4 data-id='" + data[i]._id + "'>" + data[i].headline + "</h4><br /><a href='" + data[i].link + "' target='_blank'>" + data[i].link + "</a><br><a class='fa fa-bookmark-o' id='bookmark-icon'></a><hr>");
        // }

        //  for (var i = 0; i < 12; i++) {
        //     $('.cards').append(
        //         '<article class="br2 ba b--black-10 mv4">' + 
        //             '<img src="' + data[i].img_url + '" class="db w-100 br2 br--top">' +
        //                 '<div class="pa2 ph3-ns pb3-ns">' +
        //                     '<div class="dt w-100 mt1">' +
        //                         '<div class="dtc">' +
        //                             '<h1 class="f5 f4-ns mv0">' + data[i].headline + '</h1>' +
        //                         '</div>' + 
        //                         '<div class="dtc tr">' +
        //                             '<i class="fa fa-bookmark-o" id="bookmark-icon"></i>' +
        //                         '</div>' +
        //                     '</div>' + 
        //                         '<a class="f6 lh-copy measure mt2 white" target="_blank" href="' + data[i].link + '">' +
        //                         data[i].link +
        //                         '</a>' +
        //                 '</div>' +
        //         '</article>');
        //     }
        // });
        $.get('/fetch', data => {
            console.log('fetched');
        })
    })

    $('#saved-btn').on('click', function() {
        $('html,body').animate({
            scrollTop: $(".saved-container").offset().top
        }, 1000);
    });

    $(document).on('click', '#bookmark-icon', function() {
        var id = $(this).parent().data('id');
        console.log(id);
        $.ajax({
            type: 'GET',
            url: '/saved/' + id
        });
        $(this).parent('div').remove();
    });

    $(document).on('click', '#unsave', function() {
        var id = $(this).parent().data('id');
        console.log(id);
        $.ajax({
            type: 'GET',
            url: '/unsaved/' + id
        });
        $(this).parent('div').remove();
        location.reload();
    });

    $(document).on('click', '#notes', function() {
        const thisId = $(this).data('id');
        console.log(thisId);

        $.ajax({
            method: 'GET',
            url: '/headlines/' + thisId
        }).then(data => {
            console.log(data);
        })
    })

    $(document).on('click', '#new-note-btn', function() {
        event.preventDefault();
        var id = $(this).data('id');
        var newNote = $('form textarea').val().trim();
        // console.log(id);
        // console.log(newNote);

        var noteObj = {
            body: newNote
        };

        $.ajax('/headlines/' + id, {
            method: 'POST',
            data: noteObj
        }).then(data => {
            console.log(data);
            location.reload();
        })
        $('form textarea').val('');
    })

    $(document).on('click', '#delete-note-span', function() {
        event.preventDefault();
        var id = $(this).data('id');

        $.ajax({
            url: '/api/notes/' + id,
            method: 'DELETE'
        }).then(data => {
            $(this).parent().remove();
        })
    })
})