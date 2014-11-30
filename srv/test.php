<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");   

    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit();
    }

    sleep(1);

    $res = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21);
    shuffle($res);

    echo json_encode($res);
    return;
?>