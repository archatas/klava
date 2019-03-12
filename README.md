Klãva
=====

This jquery plugin is a tool that lets you type in your chosen keyboard layout even if the layout is not installed on your computer. Also you can simulate key presses using your mouse.

To use Klãva, include the following into the head of your document:
```html
<link rel="stylesheet" href="klava.css" type="text/css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="jquery.klava.js"></script>
<script>
$(document).ready(function() {
    var options = {
        layouts: [
            "layouts/kbd-us.js",
            "layouts/kbd-baltic.js",
            "layouts/kbd-rusphon.js",
            "layouts/kbd-de.js"
        ]
    };
    $('textarea').klava(options);
});
</script>
```

These are available options:

<table>
    <tr>
        <th>Option</th>
        <th>Description</th>
        <th>Default value</th>
    </tr>
    <tr>
        <td>expanded</td>
        <td>Boolean determining if the visual keyboard is expanded</td>
        <td>false</td>
    </tr>
    <tr>
        <td>str_keyboard_layout</td>
        <td>The title for the selection of the layouts</td>
        <td>"Keyboard layout"</td>
    </tr>
    <tr>
        <td>layouts</td>
        <td>List of paths to keyboard layout definitions</td>
        <td><pre>[
    "layouts/kbd-us.js",
    "layouts/kbd-baltic.js",
    "layouts/kbd-rusphon.js",
    "layouts/kbd-de.js"
]</pre></td>
    </tr>
</table>


The tool is supported for the following browsers (but might also work on the older versions):
  * Chrome 24+
  * Firefox 18+
  * Safari 6+
  * Internet Explorer 9+
  * Opera 12+

Demo: https://aidas.bendoraitis.lt/archive/tools/klava_v2.0/
