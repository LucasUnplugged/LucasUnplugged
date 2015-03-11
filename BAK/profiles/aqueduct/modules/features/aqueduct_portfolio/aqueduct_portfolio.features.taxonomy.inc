<?php
/**
 * @file
 * aqueduct_portfolio.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function aqueduct_portfolio_taxonomy_default_vocabularies() {
  return array(
    'project_role' => array(
      'name' => 'Project Role',
      'machine_name' => 'project_role',
      'description' => 'The roles played in various projects. Visual design, development, security, information architecture, site planning, etc.',
      'hierarchy' => '0',
      'module' => 'taxonomy',
      'weight' => '0',
    ),
    'skills' => array(
      'name' => 'Skills',
      'machine_name' => 'skills',
      'description' => 'The skills and technologies used to achieve the results of various projects. PHP, Responsive Design, AJAX, etc.',
      'hierarchy' => '0',
      'module' => 'taxonomy',
      'weight' => '0',
    ),
  );
}
