$(document).ready(function () {
    let limit = 15;
    let page = 0;
    $('#search-button, #load-more').on('click', function(e){
        let searchTerm = $('#search-term').val();
        $.get(
            'https://itunes.apple.com/search?',
            {
                term: searchTerm,
                limit,
                offset: limit * page++,
            },
            function (data) {
                for(r in data.results){
                    $('#results').append(`
                    <div class="card col-12 col-md-3 m-3 result-card">
                        <div class="card-header result-header">
                            <h5 class="card-title">${data.results[r].trackName}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Artist: ${data.results[r].artistName}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Kind: ${data.results[r].kind}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Track Time (miliseconds): ${data.results[r].trackTimeMillis}</h6>
                        </div>
                        <div class="card-body p-4">
                            <a href="${data.results[r].artworkUrl100}">View Album Artwork</a> 
                        </div>
                    </div>
                        `);
                }
                console.log(page);
                $('#load-more').show();
            },
            'JSONP'
        )
    });
    $('#reset-button').on('click', function() {
        $('#search-term').val('');
        $('#results').empty();
        page = 0;
        $('#load-more').hide();
    });

});