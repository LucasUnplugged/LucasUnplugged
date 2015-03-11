<?php
/**
 * @file
 * aqueduct_slideshow.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function aqueduct_slideshow_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'resp_img_block_enabled';
  $strongarm->value = 1;
  $export['resp_img_block_enabled'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'resp_img_default_suffix';
  $strongarm->value = '__small';
  $export['resp_img_default_suffix'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'resp_img_forceredirect';
  $strongarm->value = '0';
  $export['resp_img_forceredirect'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'resp_img_forceresize';
  $strongarm->value = '0';
  $export['resp_img_forceresize'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'resp_img_purgeexpire';
  $strongarm->value = '0';
  $export['resp_img_purgeexpire'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'resp_img_reloadonresize';
  $strongarm->value = '0';
  $export['resp_img_reloadonresize'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'resp_img_use_device_pixel_ratio';
  $strongarm->value = 0;
  $export['resp_img_use_device_pixel_ratio'] = $strongarm;

  return $export;
}
