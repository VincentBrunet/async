#include <stdlib.h>
#include <stdio.h>

typedef struct value_void {
} value_void;



typedef struct value_int {
  int number;
} value_int;

value_int *value_int_make(int number) {
  value_int *value = malloc(sizeof(value_int));
  value->number = number;
  return value;
}

typedef struct value_function {
  void *closure;
  void *(*call)(void *);
} value_function;

value_function *value_function_make(void *(*call)(void *), void*closure) {
  value_function *value = malloc(sizeof(value_function));
  value->call = call;
  value->closure = closure;
  return value;
}

value_void *value_function_call(value_function *function) {
  function->call(function->closure);
}



typedef struct value_class {
  void *closure;
} value_class;



typedef struct value_class_anon_closure {
  value_int *toto;
} value_class_anon_closure;

typedef struct value_class_anon {
  value_class_anon_closure* closure;
} value_class_anon;

value_class_anon *value_class_anon_make(value_class_anon_closure* closure) {
  value_class_anon *value = malloc(sizeof(value_class_anon));
  return value;
}

void module_load() {
  value_int *toto = value_int_make(42);

  value_class_anon_closure* lambda_class_anon = malloc(sizeof(value_class_anon_closure));
  lambda_class_anon->toto = toto;

  value_class_anon *cl = value_class_anon_make(lambda_class_anon);
}

int main() {
  module_load();
}
