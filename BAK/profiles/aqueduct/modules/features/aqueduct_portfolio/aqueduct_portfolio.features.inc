<?php
/**
 * @file
 * aqueduct_portfolio.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function aqueduct_portfolio_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "file_entity" && $api == "file_default_displays") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function aqueduct_portfolio_views_api() {
  return array("version" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function aqueduct_portfolio_node_info() {
  $items = array(
    'portfolio_piece' => array(
      'name' => t('Portfolio Piece'),
      'base' => 'node_content',
      'description' => t('A personal work meant to showcase the ability and experience of an individual organization.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
