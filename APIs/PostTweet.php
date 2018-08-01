<?php
require 'TwitterAPISettings.php';

$post = $_POST['data'];
$content = $post['content'];
$hashtag = "";
if (strpos($content, '#NowPlaying') == false) {
    $hashtag = '#NowPlaying ';
}
$status = $connection->post("statuses/update", ["status" => $hashtag . $content . ' ' . $post['url'] ]);
echo json_encode($status);

//echo json_encode($post);
?>