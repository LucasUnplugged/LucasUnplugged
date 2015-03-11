<?php
/**
 * @file
 * aqueduct_slideshow.flexslider_default_preset.inc
 */

/**
 * Implements hook_flexslider_default_presets().
 */
function aqueduct_slideshow_flexslider_default_presets() {
  $export = array();

  $preset = new stdClass();
  $preset->disabled = FALSE; /* Edit this to true to make a default preset disabled initially */
  $preset->api_version = 1;
  $preset->name = 'aqueduct_flexslider';
  $preset->title = 'Aqueduct Flexslider';
  $preset->theme = 'classic';
  $preset->imagestyle_normal = 'aqueduct_slideshow__small';
  $preset->options = array(
    'width' => 450,
    'height' => 300,
    'animation' => 'fade',
    'animationDuration' => 600,
    'slideDirection' => 'horizontal',
    'slideshow' => 1,
    'slideshowSpeed' => 7000,
    'animationLoop' => 1,
    'randomize' => 0,
    'slideToStart' => 0,
    'directionNav' => 1,
    'controlNav' => 1,
    'keyboardNav' => 1,
    'mousewheel' => 1,
    'prevText' => 'Previous',
    'nextText' => 'Next',
    'pausePlay' => 0,
    'pauseText' => 'Pause',
    'playText' => 'Play',
    'pauseOnAction' => 1,
    'controlsContainer' => '.flex-nav-container',
    'manualControls' => '',
  );
  $export['aqueduct_flexslider'] = $preset;

  return $export;
}
