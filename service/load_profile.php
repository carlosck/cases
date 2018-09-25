<?php
session_start();
header("Content-type: application/json; charset=utf-8");
if(isset($_SESSION['id_user']))
{
	require('clases.php');
	require('conectar.php');
	$id_user=(int) mysql_escape_string($_SESSION['id_user']);
	$q='select * from users where id='.$id_user;
	$items[]=(object)[
		'imagen'=>$item->save_image,
		'uid'=>$item->code,
		'brand'=>$item->form_data['brand'],
		'model'=>$item->form_data['model'],
		'price'=>350,
		'type'=>$item->form_data['type'],
	];
	echo json_encode(['items'=>$items]);
}
else{
	echo json_encode(['user'=>'none']);
}