<?php
session_start();

$items= (object)[
	//brand
	'samsung'=>(object)[
		'name'=>'Samsung',
		'items'=>(object)[
			//model
			'galaxy_8'=>(object)[
				'name'=>'Galaxy S8',
				'items'=>(object)[
					//type
					'laser'=>(object)[
						'name'=>'Laser',
						'price'=>350,
						'image'=>'cases/samsung/galaxy_8/laser/case_1.png'
					],
					'relieve'=>(object)[
						'name'=>'En relieve',
						'price'=>250,
						'image'=>'cases/samsung/galaxy_8/laser/case_1.png'
					],
				]
			],
			'galaxy_7'=>(object)[
				'name'=>'Galaxy S7',
				'items'=>(object)[
					//type
					'laser'=>(object)[
						'name'=>'Laser',
						'price'=>350,
						'image'=>'cases/samsung/galaxy_7/laser/case_1.png'
					],
					'relieve'=>(object)[
						'name'=>'En relieve',
						'price'=>250,
						'image'=>'cases/samsung/galaxy_7/laser/case_1.png'
					],
				]
			]
		]
	],
	'Iphone'=>(object)[
		'name'=>'Iphone',
		'items'=>(object)[
			//model
			'iphonex'=>(object)[
				'name'=>'Iphone X',
				'items'=>(object)[
					//type
					'laser'=>(object)[
						'name'=>'Laser',
						'price'=>350,
						'image'=>'cases/iphone/iphonex/laser/case_1.png'
					],
					'relieve'=>(object)[
						'name'=>'En relieve',
						'price'=>250,
						'image'=>'cases/iphone/iphonex/laser/case_1.png'
					],
				]
			],
			'iphone8'=>(object)[
				'name'=>'iphone 8',
				'items'=>(object)[
					//type
					'laser'=>(object)[
						'name'=>'Laser',
						'price'=>300,
						'image'=>'cases/iphone/iphone8/laser/case_1.png'
					],
					'relieve'=>(object)[
						'name'=>'En relieve',
						'price'=>200,
						'image'=>'cases/iphone/iphone8/laser/case_1.png'
					],
				]
			]
		]
	],
	'huawei'=>(object)[
		'name'=>'Huawei',
		'items'=>(object)[
			//model
			'p20'=>(object)[
				'name'=>'P 20',
				'items'=>(object)[
					//type
					'laser'=>(object)[
						'name'=>'Laser',
						'price'=>250,
						'image'=>'cases/huawei/p20/laser/case_1.png'
					],
					'relieve'=>(object)[
						'name'=>'En relieve',
						'price'=>150,
						'image'=>'cases/huawei/p20/laser/case_1.png'
					],
				]
			],
			'mate_10'=>(object)[
				'name'=>'Mate 10',
				'items'=>(object)[
					//type
					'laser'=>(object)[
						'name'=>'Laser',
						'price'=>350,
						'image'=>'cases/huawei/mate10/laser/case_1.png'
					],
					'relieve'=>(object)[
						'name'=>'En relieve',
						'price'=>250,
						'image'=>'cases/huawei/mate10/laser/case_1.png'
					],
				]
			]
		]
	],
];


echo json_encode(['action'=>'done','items'=>$items]);

