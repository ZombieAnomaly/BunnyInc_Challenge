<?php
require 'TwitterAPISettings.php';
$function = $_POST['function'];
echo json_encode($function);
$content = $connection->get("account/verify_credentials");
echo $content;
?>