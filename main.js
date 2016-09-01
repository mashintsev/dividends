$(document).ready(function() {
    var tableSymbols = {};
    $('.mdl-data-table tbody tr').each(function(idx, el) {
        tableSymbols[$(el).data('symbol')] = {};
    });

    $.ajax({
        url: 'http://www.moex.com/iss/engines/stock/markets/shares/boardgroups/57/securities.jsonp?iss.meta=off&iss.json=extended&security_collection=3&lang=RU',
        success: function(data) {
            var json = JSON.parse(data)[1];
            var securityDataArr = json.securities;
            var marketDataArr = json.marketdata;
            for (var i = 0; i < marketDataArr.length; i++) {
                var symbolData = marketDataArr[i];
                if (tableSymbols[symbolData['SECID']]) {
                    var $tr = $('tr[data-symbol=' + symbolData['SECID'] + ']');
                    $tr.each(function(idx, el) {
                        $(el).find('.fingeek-dividends-price-col').text(symbolData['LAST']);
                        $(el).find('.fingeek-dividends-name-col').text(securityDataArr[i]['SECNAME']);
                        var dividend = $(el).find('.fingeek-dividends-div-col').text();
                        $(el).find('.fingeek-dividends-profit-col').text(Math.round(dividend / symbolData['LAST'] * 100 * 100) / 100 + '%');
                    });
                }
            }

            var table = $('#example').DataTable({
                paging: false,
                info: false,
                autoWidth: false,
                order: [[4, 'asc']],
                columns: [
                    {className: 'mdl-data-table__cell--non-numeric', width: '150px'},
                    {width: '50px'},
                    {width: '50px'},
                    {width: '20px'},
                    {type: 'de_date', width: '20px'},
                    {type: 'de_date', width: '20px'}
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
        }
    });

    (adsbygoogle = window.adsbygoogle || []).push({});
});
