function visualizeBeers(arr) {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 20,
        values: [0, 20],
        slide: function(event, ui) {
            let minHandle = ui.values[0];
            let maxHandle = ui.values[1];
            $("#alcohol-level").text(minHandle + "% - " + maxHandle + "%");

            showHideBeers(minHandle, maxHandle);
        }
    });

    let minHandle = $("#slider-range").slider("values", 0);
    let maxHandle = $("#slider-range").slider("values", 1);
    $("#alcohol-level").text(minHandle + "% - " + maxHandle + "%");
    showHideBeers(minHandle, maxHandle);

    let row = $('.collection');
    for (let obj of arr) {
        let div = $('<div class="col-md-6 col-lg-4 p-4">');
        let beer = $(`<div class="beer" data-alcohol="${obj.alcohol}">`);
        beer.append(`<img src="beers/${obj.id}.jpg">`)
            .append($('<h2 contenteditable="true">').text(obj.name))
            .append($('<p contenteditable="true">').text(`${obj.alcohol}%`))
            .append($('<p class="description" contenteditable="true">').text(obj.description));
        div.append(beer);
        row.append(div);
    }

    function showHideBeers(min, max) {
        let beers = $('.beer');
        beers.parent().hide();
        beers.each((i, e) => {
            let alcoholLevel = Number($(e).data("alcohol"));
            if (alcoholLevel >= min && alcoholLevel <= max) {
                $(e).parent().show();
            }
        });
    }
}