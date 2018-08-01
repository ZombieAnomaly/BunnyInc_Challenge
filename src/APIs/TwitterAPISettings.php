<?php

require "./vendor/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;

class settings {
    public $consumer_key;
    public $consumer_secret_key;
    public $access_token;
    public $access_secret_token;

    public function __constructor($consumerKey, $consumerSecretKey, $accessToken, $accessSecretToken){
        $this->consumer_key = $consumerKey;
        $this->consumer_secret_key = $consumerSecretKey;
        $this->access_token = $accessToken;
        $this->access_secret_token = $accessSecretToken;
    }
}
$Settings = new settings('A5AlPIXn0nCbHs039diLYPRWg','ot42FKy4tDkm35zfyfjsDVexbWzhNYZTydia3jMUMtne9ULmsv','4hTRqcUstM9y9C9lfVotYMaMCAujhg','K4Ql9gmJx4sq4JUy05c4A2W4lUC0MEp72MLWAk3ZFEIbd');

$connection = new TwitterOAuth($Settings->consumer_key, $Settings->consumer_secret_key, $Settings->access_token, $Settings->access_secret_token);
$content = $connection->get("account/verify_credentials");
echo json_encode($content);
?>