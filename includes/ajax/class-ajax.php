<?php
namespace TataTravels;

use TataTravels\GetFlights;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Ajax {

	public static function init() {
		$self = new self();
		GetFlights::init();
	}
}
