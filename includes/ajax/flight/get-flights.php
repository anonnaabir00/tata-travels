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
        $leave_date = $_POST['additionalParams']['departureDate'];

        // Define the API endpoint

        $api_url = add_query_arg(
                array(
                    'leaveDate' => $leave_date,
                ),
                'https://ixigo-api.onrender.com/fetch/flights'
        );

        // Fetch data from the API using wp_remote_get
        $response = wp_remote_get( $api_url, array(
                    'timeout' => 120,
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
//         $flight_journeys = isset( $data['data']['flightJourneys'][0] ) ? $data['data']['flightJourneys'][0] : null;
//         $trip_filter = isset( $data['data']['tripFilter'] ) ? $data['data']['tripFilter'] : null;
//
//
//         $response_data = array(
//             'flight_journeys' => $flight_journeys,
//             'trip_filter'     => $trip_filter,
//         );

        $flight_journeys = isset($data['data']['flightJourneys'][0]) ? $data['data']['flightJourneys'][0] : null;
        $trip_filter = isset($data['data']['tripFilter']) ? $data['data']['tripFilter'] : null;

        // Process each fare from flightFare
        $processed_fares = [];

        if (isset($flight_journeys['flightFare'])) {
            foreach ($flight_journeys['flightFare'] as $fare) {
                // Get the first items from arrays (since they contain single items)
                $fare_details = isset($fare['fares'][0]) ? $fare['fares'][0] : null;
                $fare_metadata = isset($fare['fares'][0]['fareMetadata'][0]) ? $fare['fares'][0]['fareMetadata'][0] : null;
                $flight_detail = isset($fare['flightDetails'][0]) ? $fare['flightDetails'][0] : null;

                $processed_fare = array(
                    'chips' => isset($fare['chips']) ? $fare['chips'] : null,
                    'flightKeys' => isset($fare['flightKeys']) ? $fare['flightKeys'] : null,
                    'fareDisplayText' => isset($fare_details['fareDisplayText']) ? $fare_details['fareDisplayText'] : null,
                    'airlineCode' => isset($flight_detail['airlineCode']) ? $flight_detail['airlineCode'] : null,
                    'arrivalTime' => isset($flight_detail['arrivalTime']) ? $flight_detail['arrivalTime'] : null,
                    'departureTime' => isset($flight_detail['departureTime']) ? $flight_detail['departureTime'] : null,
                    'destination' => isset($flight_detail['destination']) ? $flight_detail['destination'] : null,
                    'providerId' => isset($fare_metadata['providerId']) ? $fare_metadata['providerId'] : null,
                    'cabinClass' => isset($fare_metadata['cabinClass']) ? $fare_metadata['cabinClass'] : null,
                    'displayFare' => isset($fare_details['fareDetails']['displayFare']) ? $fare_details['fareDetails']['displayFare'] : null,
                    'fareToken' => isset($fare_details['fareDetails']['fareToken']) ? $fare_details['fareDetails']['fareToken'] : null,
                    'offerText' => isset($fare_details['offerText']) ? $fare_details['offerText'] : null,
                    'duration' => isset($flight_detail['duration']) ? array(
                        'hour' => $flight_detail['duration']['text'],
                        'time' => $flight_detail['duration']['time']
                    ) : null,
                    'headerText' => isset($flight_detail['headerText']) ? $flight_detail['headerText'] : null,
                    'headerTextWeb' => isset($flight_detail['headerTextWeb']) ? $flight_detail['headerTextWeb'] : null,
                    'subHeaderTextWeb' => isset($flight_detail['subHeaderTextWeb']) ? $flight_detail['subHeaderTextWeb'] : null,
                    'origin' => isset($flight_detail['origin']) ? $flight_detail['origin'] : null,
                    'stopText' => isset($flight_detail['stopText']) ? $flight_detail['stopText'] : null,
                    'stop' => isset($flight_detail['stop']) ? $flight_detail['stop'] : null,
                    'fareDetails' => array(
                        'refundableType' => isset($fare['refundableType']) ? $fare['refundableType'] : null,
                        'seatRemaining' => isset($fare_metadata['seatRemaining']) ? $fare_metadata['seatRemaining'] : null,
                        'isFreeMealAvailable' => isset($fare['isFreeMealAvailable']) ? $fare['isFreeMealAvailable'] : null,
                        'checkInBaggage' => isset($fare_metadata['baggageDetails']['checkInBaggage']) ? $fare_metadata['baggageDetails']['checkInBaggage'] : null,
                        'handBaggage' => isset($fare_metadata['baggageDetails']['handBaggage']) ? $fare_metadata['baggageDetails']['handBaggage'] : null
                    ),
                    'sort' => isset($fare['sort']) ? $fare['sort'] : null
                );

                $processed_fares[] = $processed_fare;
            }
        }

        // Add total flights count to trip_filter
        if (isset($trip_filter)) {
            $trip_filter['total_flights'] = count($processed_fares);
        }

        // Prepare the JSON response
        $response_data = array(
            'flight_details' => array(
                'fare' => $processed_fares,
                'key' => isset($flight_journeys['key']) ? $flight_journeys['key'] : null
            ),
            'trip_filter' => $trip_filter ?? null
        );

        wp_send_json_success( $response_data );
        wp_die();
    }

}
