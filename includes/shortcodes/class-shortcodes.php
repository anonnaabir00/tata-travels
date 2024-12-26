<?php
namespace TataTravels;

use TataTravels\FlightSearch;
use TataTravels\SearchResult;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Shortcodes {

	public static function init() {
		$self = new self();
		FlightSearch::init();
		SearchResult::init();
	}
}
