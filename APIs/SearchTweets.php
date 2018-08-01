<?php
require 'TwitterAPISettings.php';

$post = $_POST['data'];
$location = $post['location']['coords']['latitude'] . ',' . $post['location']['coords']['longitude'] . ',100mi';
$statuses = $connection->get("search/tweets", ["q" => $post['search'] . " filter:links url:youtube -filter:retweets", "result_type"=>"recent", "count"=>100,"geocode"=> $location,'include_entities' => true,"tweet_mode" => "extended"] );
echo json_encode($statuses);

//echo json_encode($post);
?>