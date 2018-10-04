<?php
session_start();
require('conectar.php');
require('clases.php');
//header("Content-type: application/json; charset=utf-8");
$correo= mysql_real_escape_string($_GET['mail']);
$pass= mysql_real_escape_string($_GET['pass']);
$repass= mysql_real_escape_string($_GET['repass']);
$names= mysql_real_escape_string($_GET['names']);
$apellidos= mysql_real_escape_string($_GET['apellidos']);
$mobilephone= mysql_real_escape_string($_GET['mobilephone']);
$calle= mysql_real_escape_string($_GET['calle']);
$numerocasa= mysql_real_escape_string($_GET['numerocasa']);
$colonia= mysql_real_escape_string($_GET['colonia']);
$cp= mysql_real_escape_string($_GET['ciudad']);
$ciudad= mysql_real_escape_string($_GET['ciudad']);
$estado= mysql_real_escape_string($_GET['estado']);
//validate field lenght

$q_is_registered='select * from users where correo=\''.$correo.'\'';

$con=new Consulta($q_is_registered,$db);
$res= $con->sacar_U();
if($con->m!==false){
	echo json_encode(
		[
			'estatus'=>'error',
			'message'=> 'Ya existe un usuario con ese correo',
		]
	);
}
else{
	$q_insert = 'insert into users(`correo`, `pass`, `nombres`, `apellidos`, `celular`, `calle`, `numero`, `colonia`, `cp`, `ciudad`, `estado`,  `estatus`)values';
	$q_insert.='("'.$correo.'","'.$pass.'","'.$names.'","'.$apellidos.'","'.$mobilephone.'","'.$calle.'","'.$numerocasa.'","'.$colonia.'","'.$cp.'","'.$ciudad.'","'.$estado.'",1)';	
	$con->query($q_insert);
	$id = $con->last_insert();
	$_SESSION['id_user']=$id;
	echo json_encode(['estatus'=>'done','message'=>$id]);
}