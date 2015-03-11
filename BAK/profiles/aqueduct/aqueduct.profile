<?php
/**
 * @file
 * Additional hooks implemented by the Aqueduct install profile.
 */

/**
 * Implements hook_form_FORM_ID_alter().
 *
 * Allows the profile to alter the site configuration form.
 * This technique is used by core and a number of other install profiles.
 */
function aqueduct_form_install_configure_form_alter(&$form, $form_state) {
  // Pre-populate the site name with the server name.
  $form['site_information']['site_name']['#default_value'] = $_SERVER['SERVER_NAME'];
}
