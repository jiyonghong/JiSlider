JiSlider
========

Simple Image Slider - jQuery Plugin
-----------------------------------

JiSlider is a simple jQuery Plugin to create a Image Slider. You can modify settings to make the slider for your taste. It has been tested on Safari 8, Chrome 44, Firefox 38.

Simple Usage
------------

```html
<head>
  <link rel="stylesheet" href="/path/to/JiSlider.css">
</head>
...
<script src="/path/to/jquery.min.js"></script>
<script src="/path/to/JiSlider.js"></script>
<script>
  $(window).load(function () {
    $('#JiSlider').JiSlider();
  });
</script>
```

Custom Settings
---------------

You can modify:
  + auto
    + This value represents whether the animation will be automatic or not.
    + Default value: **true**
    + Boolean
  + start
    + This value represents start slide.
    + Default value: **1**
    + Number
  + time
    + This value represents animation time.
    + Default value: **1000**
    + Number in milliseconds
  + stay
    + This value represents stay time in between animations.
    + Default value: **2000**
    + Number in millisecons
  + controller
    + This value represents where the controller will appear or not
    + Default value: **true**
    + Boolean
  + color
    + This value represents color of controller.
    + Default value: **#664422**
    + hexcode value
  + easing
    + This value represents easing of animation.
    + Default value: **ease**
    + CSS Transition easing property
  + reverse
    + This value represents whether animation direction will be reversed or not
    + Default value: **false**
    + Boolean
