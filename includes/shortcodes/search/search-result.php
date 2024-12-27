<?php
namespace TataTravels;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class SearchResult {

	public static function init() {
		$self = new self();
		add_shortcode( 'tt_search_result', array( $self, 'tt_search_result_shortcode' ) );
	}

    public function tt_search_result_shortcode( $atts ) {
            $unique_key = 'tt-search-result'.uniqid();
    		$atts = shortcode_atts(
    			$atts,
    			'tt_search_result'
    		);

    		return '<div id="tt-wrapper" class="tt-search-result" data-id="' . esc_attr( $unique_key ) . '"></div>';
    }
}
