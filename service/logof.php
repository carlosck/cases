<?php
session_start();
header("Content-type: application/json; charset=utf-8");
if(isset($_SESSION['id_user']))
{
	unset($_SESSION['id_user']);
	echo json_encode(['action'='done']);
}
else{
	echo json_encode(['action'=>'error']);
}