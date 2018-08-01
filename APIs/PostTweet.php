<?php
require 'TwitterAPISettings.php';

$post = $_POST['data'];
$content = $post['content'];
if (strpos($content, '#NowPlaying') !== false) {
    $content = $content . ' #NowPlaying';
}
$status = $connection->post("statuses/update", ["status" => $content . ' ' . $post['url'] ]);
echo json_encode($status);

//echo json_encode($post);
?>