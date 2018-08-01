<?php
require 'TwitterAPISettings.php';
$content = $connection->get("account/verify_credentials");
echo json_encode($content);
?>