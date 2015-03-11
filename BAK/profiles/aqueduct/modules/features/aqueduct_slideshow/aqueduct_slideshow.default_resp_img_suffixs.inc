<?php
/**
 * @file
 * aqueduct_slideshow.default_resp_img_suffixs.inc
 */

/**
 * Implements hook_default_resp_img_suffixs().
 */
function aqueduct_slideshow_default_resp_img_suffixs() {
  $export = array();

  $resp_img_suffix = new stdClass();
  $resp_img_suffix->disabled = FALSE; /* Edit this to true to make a default resp_img_suffix disabled initially */
  $resp_img_suffix->api_version = 1;
  $resp_img_suffix->name = 'aqueduct_slideshow_large';
  $resp_img_suffix->label = 'Aqueduct Slideshow Large';
  $resp_img_suffix->suffix = '__large';
  $resp_img_suffix->breakpoint = 450;
  $export['aqueduct_slideshow_large'] = $resp_img_suffix;

  $resp_img_suffix = new stdClass();
  $resp_img_suffix->disabled = FALSE; /* Edit this to true to make a default resp_img_suffix disabled initially */
  $resp_img_suffix->api_version = 1;
  $resp_img_suffix->name = 'aqueduct_slideshow_small';
  $resp_img_suffix->label = 'Aqueduct Slideshow Small';
  $resp_img_suffix->suffix = '__small';
  $resp_img_suffix->breakpoint = 0;
  $export['aqueduct_slideshow_small'] = $resp_img_suffix;

  return $export;
}
