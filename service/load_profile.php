<?php
session_start();
header("Content-type=> application/json; charset=utf-8");
if(isset($_SESSION['id_user']))
{
	require('clases.php');
	require('conectar.php');
	$id_user=(int) mysql_real_escape_string($_SESSION['id_user']);
	$q='select * from users where id='.$id_user;
	$con= new Consulta($q,$db);
	$con->sacar_U();
	
	$items=(object)[
		'correo'=> $con->m['correo'],		
		'nombres'=> $con->m['nombres'],
		'apellidos'=> $con->m['apellidos'],
		'celular'=> $con->m['celular'],
		'calle'=> $con->m['calle'],
		'numero'=> $con->m['numero'],
		'colonia'=> $con->m['colonia'],
		'cp'=> $con->m['ciudad'],
		'ciudad'=> $con->m['ciudad'],
		'estado'=> $con->m['estado'],
		'estatus'=> $con->m['estatus']
	];
	echo json_encode(['action'=>'done','items'=>$items]);
}
else{
	echo json_encode(['action'=>'error']);
}