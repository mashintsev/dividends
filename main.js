$(document).ready(function() {
    var table = $('#example').DataTable({
        paging: false,
        info: false,
        autoWidth: false,
        order: [[3, 'asc']],
        columns: [
            {className: 'mdl-data-table__cell--non-numeric', width: '150px'},
            {width: '50px'},
            {width: '20px'},
            {type: 'de_date', width: '20px'},
            {type: 'de_date', width: '20px'},
            {width: '20px', className: 'fingeek-dividends-agreed'}
        ]
    });

    $('#search').on('keyup change', function() {
        table
            .columns(0)
            .search(this.value)
            .draw();
    });
    $('.mdl-textfield .mdl-button').on('click', function() {
        $(this).parent().toggleClass('is-focused');
    });

    (adsbygoogle = window.adsbygoogle || []).push({});
});
