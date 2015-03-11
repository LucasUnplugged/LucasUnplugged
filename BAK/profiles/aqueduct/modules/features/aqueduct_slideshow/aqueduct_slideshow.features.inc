<?php
/**
 * @file
 * aqueduct_slideshow.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function aqueduct_slideshow_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "file_entity" && $api == "file_default_displays") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "flexslider" && $api == "flexslider_default_preset") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "resp_img" && $api == "default_resp_img_suffixs") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_image_default_styles().
 */
function aqueduct_slideshow_image_default_styles() {
  $styles = array();

  // Exported image style: aqueduct_slideshow__large
  $styles['aqueduct_slideshow__large'] = array(
    'name' => 'aqueduct_slideshow__large',
    'effects' => array(
      2 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => '800',
          'height' => '500',
        ),
        'weight' => '1',
      ),
    ),
  );

  // Exported image style: aqueduct_slideshow__small
  $styles['aqueduct_slideshow__small'] = array(
    'name' => 'aqueduct_slideshow__small',
    'effects' => array(
      1 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => '400',
          'height' => '250',
        ),
        'weight' => '0',
      ),
    ),
  );

  return $styles;
}
