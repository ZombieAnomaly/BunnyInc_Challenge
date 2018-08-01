<?php
require 'TwitterAPISettings.php';

$post = $_POST['data'];

$status = $connection->post("statuses/update", ["status" => $post['content'] . ' ' . $post['url'] ]);
echo json_encode($status);

//echo json_encode($post);
?>