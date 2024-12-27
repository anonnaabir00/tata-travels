<?php

namespace TataTravels;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Enqueue {

	public static function init() {
		$self = new self();
		add_action( 'wp_enqueue_scripts', array( $self, 'tt_assets' ) );
	}

	public function tt_assets() {
			wp_enqueue_style( 'tt-style', TT_ROOT_DIR_URL . 'includes/assets/build/frontend.css' );
			wp_enqueue_script( 'tt-script', TT_ROOT_DIR_URL . 'includes/assets/build/frontend.js', 'jquery', '0.0.5', true );
			wp_localize_script(
				'tt-script',
				'tt_settings',
				array(
					'ajax_url' => admin_url( 'admin-ajax.php' ),
					'nonce'    => wp_create_nonce( 'tt_nonce' ),
				)
			);

		add_filter( 'script_loader_tag', array( $this, 'add_module_type_to_script' ), 10, 3 );
	}

	public function add_module_type_to_script( $tag, $handle, $src ) {
		if ( 'tt-script' === $handle ) {
			$tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
		}
		return $tag;
	}
}
