<?php
namespace TataTravels;

use TataTravels\FlightSearch;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Shortcodes {

	public static function init() {
		$self = new self();
		FlightSearch::init();
	}
}
