<?php

require "./vendor/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;

class settings {
    public $consumer_key;
    public $consumer_secret_key;
    public $access_token;
    public $access_secret_token;

    public function __construct ($consumerKey, $consumerSecretKey, $accessToken, $accessSecretToken){
        $this->consumer_key = $consumerKey;
        $this->consumer_secret_key = $consumerSecretKey;
        $this->access_token = $accessToken;
        $this->access_secret_token = $accessSecretToken;
    }
}
$Settings = new settings('Hm5IZ0Ao2RDo1Sfaa6QUppUDx','SxMsY0fxD7ISJVaDP9D9BxKndpVf31IWuM0QHYJTeeYnUe6LSh','1024689014232600576-UvrRxdRIunbz1CgIK3i4hopj4ZyLpV','TXcNwMV5vnv0BpXA6aTnvj1ptlProCB3l8IWDcqh3xEyv');

$connection = new TwitterOAuth($Settings->consumer_key, $Settings->consumer_secret_key, $Settings->access_token, $Settings->access_secret_token);
?>