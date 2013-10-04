(function( $ ) {
    // Hide that "You need JS" text (they obviously have JS if this is running)
    $('.nojs').hide();

    // Print the clock in the upper-right corner
    function renderTime( firstRun ) {
        var now = new Date();
        var time = [
            now.getHours(),
            now.getMinutes()
        ].join(':');

        $('.clock').html( time );

        // If this is the first time we've run the function, we want to correct
        // for the fact that the page won't be loaded at :00 on the clock
        var delay = 60 - now.getSeconds();
        // If this isn't the first run, fire again in one minute
        setTimeout(renderTime, firstRun ? delay : 60000);
    }

    // Initial clock render
    renderTime( true );

    // Fetch the .md file with the site content, then render it in the document
    $.get('README.md').then(function( readmeContent ) {
        // Inject the retrieved content into the XMP container,
        // where it will be processed by strapdown
        $('xmp').html( readmeContent );

        // Load and execute Strapdown.js
        // Script tag injection code adapted from our Googley overlords
        var strapdown = document.createElement('script');
        strapdown.type = 'text/javascript';
        strapdown.src = 'js/vendor/strapdown/strapdown.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(strapdown, s);
    });

})( jQuery );