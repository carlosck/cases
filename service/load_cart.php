<?php
session_start();
/*
echo '<pre>';

var_dump($_SESSION);
*/
$items= [];
if(isset($_SESSION['items']))
{
	foreach (array_reverse($_SESSION['items']) as $key => $item) {		
		$items[]=(object)[
			'imagen'=>$item->save_image,
			'uid'=>$item->code,
			'brand'=>$item->form_data['brand'],
			'model'=>$item->form_data['model'],
			'price'=>350,
			'type'=>$item->form_data['type'],
		];
	}	
}

echo json_encode(['items'=>$items]);

