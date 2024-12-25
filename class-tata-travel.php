<?php

	/**
	 *
	 * @link              https://rageblog.online/
	 * @since             0.0.1
	 * @package           Tata Travels
	 *
	 * @wordpress-plugin
	 * Plugin Name:       Tata Travels
	 * Plugin URI:        https://rageblog.online/
	 * Description:       Core Plugin & Functions For Tata Travels
	 * Version:           0.0.1
	 * Author:            Tata Travels
	 * Author URI:        https://rageblog.online/
	 * License:           GPL-2.0+
	 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
	 * Text Domain:       tata-travels
	 * Domain Path:       /languages
	 * Tested up to:      6.7
	 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class TataTravels {

	private function __construct() {
		$this->define_constants();
		$this->load_dependency();
		register_activation_hook( __FILE__, array( $this, 'activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
		add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
	}

	public static function init() {
		static $instance = false;

		if ( ! $instance ) {
			$instance = new self();
		}

			return $instance;
	}

	public function define_constants() {
		define( 'TT_VERSION', '0.0.1' );
		define( 'TT_PLUGIN_FILE', __FILE__ );
		define( 'TT_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
		define( 'TT_ROOT_DIR_PATH', plugin_dir_path( __FILE__ ) );
		define( 'TT_ROOT_DIR_URL', plugin_dir_url( __FILE__ ) );
		define( 'TT_INCLUDES_DIR_PATH', TT_ROOT_DIR_PATH . 'includes/' );
		define( 'TT_PLUGIN_SLUG', 'tata-travels' );
	}

	public function on_plugins_loaded() {
		do_action( 'tt_loaded' );
	}

	public function init_plugin() {
		$this->load_textdomain();
		$this->dispatch_hooks();
	}

	public function dispatch_hooks() {
		TataTravels\Autoload::init();
		TataTravels\Enqueue::init();
		TataTravels\Shortcodes::init();
	}

	public function load_textdomain() {
		load_plugin_textdomain(
			'tata-travels',
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languages/'
		);
	}

	public function load_dependency() {
		require_once TT_INCLUDES_DIR_PATH . 'class-autoload.php';
	}

	public function activate() {
	}

	public function deactivate() {
	}
}

function tt_start() {
	return TataTravels::init();
}


    tt_start();