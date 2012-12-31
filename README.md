This jquery plugin is a tool that lets you type in your chosen keyboard layout even if the layout is not installed on your computer. Also you can simulate key presses using your mouse.

To use klava, include the following into your document:
```html
<script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
<script src="jquery.klava.js"></script>
<script>
$(document).ready(function() {
    $('textarea').klava({
        layouts: [
            "layouts/kbd-us.js",
            "layouts/kbd-baltic.js",
            "layouts/kbd-rusphon.js",
            "layouts/kbd-de.js"
        ]
    });
});
</script>
```
