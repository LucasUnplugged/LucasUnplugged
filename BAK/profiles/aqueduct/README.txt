CONTENTS
--------

  * Introduction
  * Installation
  * Using Aqueduct
  * Design Decisions


INTRODUCTION
------------

Aqueduct is a Drupal distribution for professionals looking to showcase their
experience and prowess. While it may be used as-is to provide blog, portfolio
and basic page functionality, it is designed to be quickly extended through the
use of other modules. Though it comes with the Achromatic responsive theme
(based on Golden Grid), it may be used with any other theme.


INSTALLATION
------------

Aqueduct is Drupal distribution. When first choosing your installation options,
select "Aqueduct," and the relevant modules, features and themes will
automatically be installed and enabled for you.

Typekit's League Gothic and Museo web fonts are both used in Achromatic if
they are available. If you would like to use these fonts, simply enable the
Typekit module, then provide your kit's API key at Admin > Configure > Typekit.


USING AQUEDUCT
--------------

Aqueduct has three main components: pages, blog posts, and portfolio pieces.
all three can be created via Admin > Content > Add Content.

Pages function just as they do in core, while blog posts are a more streamlined
alternative to the Blog module. The five most recent blog posts will appear in
the Recent Posts block, displayed in the sidebar by default, as well as a list
on the front page and a view on /blog.

Portfolio pieces behave in a very similar way. Those portfolio pieces that are
promoted to the front page will appear in the "Featured Projects" block, 
displayed on the home page by default.


DESIGN DECISIONS
----------------

Q:  Why include feature modules in addition to aqueduct.install?
A:  Aqueduct makes the distinction between "hard" and "soft" configuration:
    that is, configuration that is mandatory for the install profile to
    function, and a set of sane defaults intended to be overwritten by the site
    owner. Feature-based exports are ideal for setting hard configuration, as
    it is easy to tell when they are overriden and rever them. By contrast,
    default configuration not intended to be tracked should be done either in
    custom modules or the profile's hook_install(), depending on the scope of
    the change.

Q:  Why is Aqueduct Slideshow its own feature?
A:  In short, so it is easier for other modules to leverage. As a number of
    modules make use of this functionality, it makes more sense to define the
    presets once and have each other feature depend on them as necessary.
