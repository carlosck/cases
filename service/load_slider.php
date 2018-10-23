<?php
session_start();

$items= (object)[
	'item1'=>(object)[
		'bg'=>'bg_1.png',
		'case'=>'case_1.png'
	],
	'item2'=>(object)[
		'bg'=>'bg_2.png',
		'case'=>'case_2.png'
	],
	'item3'=>(object)[
		'bg'=>'bg_3.png',
		'case'=>'case_3.png'
	]
];

/*foreach ($items as $key => $item) {		
	$items[]=(object)[
		'imagen'=>$item->save_image,
		'uid'=>$item->code,
		'brand'=>$item->form_data['brand'],
		'model'=>$item->form_data['model'],
		'price'=>350,
		'type'=>$item->form_data['type'],
	];
}	
*/

echo json_encode(['action'=>'done','items'=>$items]);

