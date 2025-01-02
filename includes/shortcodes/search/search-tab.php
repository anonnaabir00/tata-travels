<?php
namespace TataTravels;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class SearchTab {

	public static function init() {
		$self = new self();
		add_shortcode( 'tt_search_tab', array( $self, 'tt_search_tab_shortcode' ) );
	}

    public function tt_search_tab_shortcode( $atts ) {
            $unique_key = 'tt-search-tab'.uniqid();
    		$atts = shortcode_atts(
    			$atts,
    			'tt_search_tab'
    		);

    		return '<div class="tt-search-tab" data-id="' . esc_attr( $unique_key ) . '"></div>';
    }
}
