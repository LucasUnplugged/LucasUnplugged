<?php
/**
 * @file
 * aqueduct_portfolio.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function aqueduct_portfolio_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_portfolio_piece';
  $strongarm->value = 0;
  $export['comment_anonymous_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_portfolio_piece';
  $strongarm->value = 1;
  $export['comment_default_mode_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_portfolio_piece';
  $strongarm->value = '50';
  $export['comment_default_per_page_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_portfolio_piece';
  $strongarm->value = 1;
  $export['comment_form_location_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_portfolio_piece';
  $strongarm->value = '1';
  $export['comment_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_portfolio_piece';
  $strongarm->value = '1';
  $export['comment_preview_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_portfolio_piece';
  $strongarm->value = 1;
  $export['comment_subject_field_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_portfolio_piece';
  $strongarm->value = array();
  $export['menu_options_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_portfolio_piece';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_portfolio_piece';
  $strongarm->value = array(
    0 => 'status',
    1 => 'promote',
  );
  $export['node_options_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_portfolio_piece';
  $strongarm->value = '1';
  $export['node_preview_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_portfolio_piece';
  $strongarm->value = 0;
  $export['node_submitted_portfolio_piece'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_portfolio_piece_pattern';
  $strongarm->value = 'portfolio/[node:title]';
  $export['pathauto_node_portfolio_piece_pattern'] = $strongarm;

  return $export;
}
