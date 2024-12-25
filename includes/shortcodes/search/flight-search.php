<?php
namespace TataTravels;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class FlightSearch {

	public static function init() {
		$self = new self();
		add_shortcode( 'tt_flight_search', array( $self, 'tt_flight_search_shortcode' ) );
	}

    public function tt_flight_search_shortcode( $atts ) {
            $unique_key = 'tt-flight-search-'.uniqid();
    		$atts = shortcode_atts(
    			$atts,
    			'tt_flight_search'
    		);

    		return '<div class="tt-flight-search" data-id="' . esc_attr( $unique_key ) . '"></div>';
    }
}
