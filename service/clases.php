<?php
/* le agregue 
last insert id el 8 de marzo del 2007 
depues de como 3 años de crear estas clases
le agrege la funcion de <<go first>> que se va al inicio del mysql_fetch_array 

cuenta_mod regresa el parametro 4 de febrero del 2008

agregue los throw y modifique sacar por m en 04 jun 2008 
*/

/*******************************                        CONSULTA                       

Se usa 
$instancia=new Consulta();
 o
$variable=new Consulta("select * from tabla");   
para sacar una sola matriz
$matriz=$instancia->sacar->U
1786
en un while
while($matriz=$instancia->sacar_V)
{
	echo $matriz->m["nombre"];
	echo $matriz->m["id"];
}

para saber cuantos registros trajo
echo "trajo    ".$instancia->cuantos_S()." registros";
echo "modifico ".$instancia->cuantos_M()." registros";
*/

 class Consulta{
    //  atributos
	var $cuantos_r;
	var $cuantos_m;
	var $q;
	var $error;
	var $res;
	var $m;
	var $last_insertid;
	var $db;
	// metodo contructor
	function __construct($q,$link){	         	 
			 $this->q=$q;
			 $this->db=$link;
			 if(!$this->res=$this->db->query($q))
			 {
			 	printf("Error: %s\n",$this->db->error);
			 }
			 // if (!mysqli_query($this->db, $this->q)) {
			 //     printf("Errormessage: %s\n", mysqli_error($db));
			 // }
			 //if(!$this->res=mysqli_query($db,$this->q))
		//	if(!$this->res=mysql_query($q))

			    //throw new Exception("error en la bd ".' por '.$q.'->'.mysql_error(),001);
				
			 	 }
	// metodo que hace la consulta 
	function query($qq){
	        
	       // echo "q ".$this->q;
	         if(!$this->res=mysqli_query($this->db,$qq)){
	         	//printf("Errormessage: %s\n", mysqli_error($link)
			    throw new Exception("error en la bd ".' por '.$qq.mysql_error(),002);
			
				}
			}
	 //metodo para ver cuantos registros trajo la consulta		
	function cuantos_S(){
	         $this->cuantos_r=mysql_num_rows($this->res);
			 return($this->cuantos_r);
			 }
	// metodo para ver cuantos registros modifico
	function cuantos_M(){
	         $this->cuantos_m=mysql_affected_rows();
			return($this->cuantos_m);
			 }
	
	// metodo para sacar una sola matriz asociativa
	function sacar_U(){
	         $this->m=mysqli_fetch_array($this->db,$this->res);
	         }
	// metodo para sacar una matriz asociativa en while 
	function sacar_V(){
	        if($this->m=mysqli_fetch_array($this->res,MYSQLI_ASSOC))
			   return(true);
			 else
			   return(false);
			   } 
	function set_Q($qu)
	  {
	  $this->q=$qu;
	  }// fin de la clase set_Q
	  //function para saber el ultim id insertado para los autoincementales
	  function last_insert()
	{
		$this->last_insertid=mysql_insert_id();
       return($this->last_insertid);
	}
	
	function go_first()
	{
	mysql_data_seek($this->res,0);
	}//fin de la funcion gofirst
	 
	function close()
	{
	  //mysql_close($this->res);
	} 
}// fin de la clase consulta


?>