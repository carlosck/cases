<?php
session_start();
//require_once('ResponseClass.php');
//
$images= $_GET['images'];
$base = $_GET['base'];
/*/
echo '<pre>';
var_dump($images);
var_dump($base['width']);
var_dump($base['height']);
die();
//*/
$IMG_BASE = imagecreatetruecolor($base['width'],$base['height']);
$black = imagecolorallocate($IMG_BASE, 0, 0, 0);
$white = imagecolorallocate($IMG_BASE, 255, 255, 255);

imagefilledrectangle($IMG_BASE, 0, 0, $base['width'], $base['height'], $white);
//*/
foreach ($images as $key => $image) {
	$IMG   = imagecreatefromjpeg($image['src']);
	if(isset($image['angle']))
	{
		
		$IMG_RESIZED = imagescale($IMG,$image['width'],$image['height']);
		$pngTransparency = imagecolorallocatealpha($IMG_RESIZED , 0, 0, 0, 127);
		imagealphablending($IMG_RESIZED, false);
    	imagesavealpha($IMG_RESIZED, true);
		$IMG_ROTATE = imagerotate($IMG_RESIZED, 360-(rad2deg ($image['angle'])), $pngTransparency);
		imagealphablending($IMG_ROTATE, false);
    	imagesavealpha($IMG_ROTATE, true);
    	$IMAGE_WIDTH = imagesx($IMG_ROTATE);
    	$IMAGE_HEIGHT = imagesy($IMG_ROTATE);
    	imagecopy($IMG_BASE, $IMG_ROTATE,  $image['position']['left'],  $image['position']['top'], 0, 0, $IMAGE_WIDTH, $IMAGE_HEIGHT);
	}
	else{
		$IMG_RESIZED = imagescale($IMG,$image['width'],$image['height']);
		$IMG_ROTATE = $IMG;
		$IMAGE_WIDTH = $image['width'];
    	$IMAGE_HEIGHT =  $image['height'];
    	list($width, $height) = getimagesize($image['src']);
    	imagecopyresampled($IMG_BASE, $IMG_ROTATE, $image['position']['left'], $image['position']['top'], 0, 0,$IMAGE_WIDTH,$IMAGE_HEIGHT , $width, $height );
}
	}
	
	
	/*/
	echo '<pre>';
	var_dump($image);
	var_dump($width);
	var_dump($height);
	die();
	//*/
	
//*/



/*
imagecopyresampled($base, $img, $x_scale, $y_scale, 0, 0,$w_scale, $h_scale , $WIDTH_FINAL, $HEIGHT_FINAL );
imagecopy($base, $filtro_blanco, 0, 0, 0, 0, $WIDTH_FINAL, $HEIGHT_FINAL);
*/
//header('Content-Type: image/jpeg');
$ext='jpg';
$code_string='ABCDEFGHIJKLMNOPQRSTUVWXZ0123456789';
$initial='ABCDEFGHIJKLMNOPQRSTUVWXZ';
$usr_code  = create_name(8,$initial,$code_string);
$image_name= $usr_code.'.'.$ext;
$image_full_name= '../img/img_t/'.$image_name;

header("Content-type: application/json; charset=utf-8");
imagejpeg($IMG_BASE, $image_full_name,95);
if(!isset($_SESSION['items'])){
	$_SESSION['items']=[];
}
$_SESSION['items'][$usr_code]=(object)[
		"code"=>$usr_code,
		"save_image"=>$image_full_name,
		'form_data'=>$_GET['form_data'] 
	];
echo json_encode(['imagen'=>$image_full_name]);
//imagejpeg($img, NULL, 75);
/*
$src= $_GET['img']; 
$x= (int)$_GET['ix']; 
$y= (int)$_GET['iy']; 
$w= (int)$_GET['iw']; 
$h= (int)$_GET['ih']; 
$filter_id= (int)$_GET['ifilter']; 
$is_mobile= (int)$_GET['ism']; 


if($is_mobile==1)
{
	$img_container_w = 320;
	$img_container_h = 320;	
}
else
{
	$img_container_w = 500;
	$img_container_h = 500;
}
$WIDTH_FINAL= 600;
$HEIGHT_FINAL= 600;



switch($filter_id)
{
	case 1:$filtro = imagecreatefrompng('filtros/filtro_01.png');
	break;
	case 2:$filtro = imagecreatefrompng('filtros/filtro_02.png');
	break;
	case 3:$filtro = imagecreatefrompng('filtros/filtro_03.png');
	break;
	case 4:$filtro = imagecreatefrompng('filtros/filtro_04.png');
	break;
	case 5:$filtro = imagecreatefrompng('filtros/filtro_05.png');
	break;
	case 6:$filtro = imagecreatefrompng('filtros/filtro_06.png');
	break;
}
$base = imagecreatetruecolor($WIDTH_FINAL,$HEIGHT_FINAL); 
$img   = imagecreatefromjpeg('../images/'.url_ecode($src));
$filtro_blanco = imagecreatefrompng('filtros/blanco.png');

imagealphablending($img, true);
imagealphablending($base, true);
imagealphablending($filtro_blanco, true);
imagealphablending($filtro, true);

$w_scale = ($WIDTH_FINAL  * $w )  / $img_container_w;
$h_scale = ($HEIGHT_FINAL * $h )  / $img_container_h;

$x_scale = ($WIDTH_FINAL  * $x ) / $img_container_w;
$y_scale = ($HEIGHT_FINAL * $y ) / $img_container_h;

imagecopyresampled($base, $img, $x_scale, $y_scale, 0, 0,$w_scale, $h_scale , $WIDTH_FINAL, $HEIGHT_FINAL );
imagecopy($base, $filtro_blanco, 0, 0, 0, 0, $WIDTH_FINAL, $HEIGHT_FINAL);
imagecopy($base, $filtro, 0, 0, 0, 0, $WIDTH_FINAL, $HEIGHT_FINAL);
//imagefilter($base, IMG_FILTER_BRIGHTNESS, 0);
//imagefilter($base, IMG_FILTER_CONTRAST, 5);

//ob_start();
imagejpeg($base, NULL, 75);
//$imagedata = ob_get_contents();

//ob_end_clean();
//echo 'data:image/png;base64,' . base64_encode($imagedata);

//imagejpeg($base, NULL, 75);

*/
function get_file_name(){
	$filename = $_FILES['imagen']['name'];
	$ext = pathinfo($filename, PATHINFO_EXTENSION);

	$data= new stdClass();
	switch($ext)
	{
		case 'jpg':
		case 'JPG':
		case 'JPEG':
		case 'jpeg':$imagen = imagecreatefromjpeg($_FILES['imagen']['tmp_name']);
		break;
		case 'PNG':
		case 'png':$imagen = imagecreatefrompng($_FILES['imagen']['tmp_name']);
		break;
		default: $data->error= 1;
			$data->msg = "extension no reconocida";
			$response->setData($data);
			$response->printAsJson();
			die();
		break;	
		
	}
}
function create_name($length,$initial,$code_string)
{

	$rand_initial=rand(0,strlen($initial)-1);
	$result =$initial[$rand_initial];
	$result.=generate_code(floor($length/2),$initial,$code_string);
	$result.='_'.generate_code(floor($length/2),$initial,$code_string);
	return $result;

}

function generate_code($length,$initial,$code_string)
{

	$result='';
	for($i=0;$i<$length;$i++)
	{
		$rand=rand(0,strlen($code_string)-1);
		$result.=$code_string[$rand];
	}
	return $result;
}

?>