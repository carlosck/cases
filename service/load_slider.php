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


echo json_encode(['action'=>'done','items'=>$items]);

