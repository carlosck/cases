<?php
session_start();
$uid = $_GET['uid'];
$items= [];
if(isset($_SESSION['items']))
{
	if(isset($_SESSION['items'][$uid]))
	{
		unset($_SESSION['items'][$uid]);
	}
}

echo json_encode(['result'=>'done']);

