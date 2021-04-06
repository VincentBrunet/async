
typedef struct lambda_inner_closure {
  void *dudu;
  int (*functionPtr)(int,int);
} lambda_inner_closure;
void lambda_inner_logic(lambda_inner_closure* closure) {
  // log(dudu)
}

typedef struct lambda_hello_closure {
  void *dudu;
  
} lambda_hello_closure;
void lambda_hello_logic(lambda_hello_closure* closure) {

  lambda_inner_closure *clos2;
  clos2->dudu = closure->dudu;

  void *f = clos2;


}


void module_load() {
  void *dudu = make_string("id");

  lambda_hello_closure* clos1;
  clos1->dudu = dudu;

  void *world = clos1;

  world.call(world.closure)
}
