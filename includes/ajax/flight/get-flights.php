<?php
namespace TataTravels;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class GetFlights {

	public static function init() {
		$self = new self();
		add_action( 'wp_ajax_tt/flight/fetch', array( $self, 'get_flights' ) );
		add_action( 'wp_ajax_nopriv_tt/flight/fetch', array( $self, 'get_flights' ) );
	}

	public function get_flights() {
        check_ajax_referer( 'tt_nonce' );

        // Define the API endpoint
        $api_url = "https://ixigo-api.onrender.com/fetch/flights";

        // Fetch data from the API using wp_remote_get
        $response = wp_remote_get( $api_url, array(
                    'timeout' => 60,
        ) );

        // Check for errors in the response
        if ( is_wp_error( $response ) ) {
            wp_send_json_error( array(
                'error' => 'Unable to fetch flights',
                'message' => $response->get_error_message(),
            ) );
            wp_die();
        }

        // Parse the response body
        $body = wp_remote_retrieve_body( $response );

        // Decode JSON response
        $data = json_decode( $body, true );

        if ( empty( $data ) || ! isset( $data['data'] ) ) {
            wp_send_json_error( array(
                'error' => 'Invalid API response',
            ) );
            wp_die();
        }

        // Extract required fields
        $flight_journeys = isset( $data['data']['flightJourneys'][0] ) ? $data['data']['flightJourneys'][0] : null;
        $trip_filter = isset( $data['data']['tripFilter'] ) ? $data['data']['tripFilter'] : null;

        // Prepare the JSON response
        $response_data = array(
            'flight_journeys' => $flight_journeys,
            'trip_filter'     => $trip_filter,
        );

        wp_send_json_success( $response_data );
        wp_die();
    }

}
