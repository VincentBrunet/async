#include <stdlib.h>
#include <stdio.h>

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
  void (*call)(void *);
} value_function;
value_function *value_function_make(void (*call)(void *), void*closure) {
  value_function *value = malloc(sizeof(value_function));
  value->call = call;
  value->closure = closure;
  return value;
}
void value_function_call(value_function *function) {
  function->call(function->closure);
}

typedef struct lambda_inner_closure {
  value_int *num;
} lambda_inner_closure;
void lambda_inner_logic(lambda_inner_closure* closure) {
  printf("%d\n", closure->num->number);
}

typedef struct lambda_hello_closure {
  value_int *num;
} lambda_hello_closure;
void lambda_hello_logic(lambda_hello_closure* closure) {

  lambda_inner_closure *lambda_inner = malloc(sizeof(lambda_inner_closure));
  lambda_inner->num = closure->num;

  value_function *f = value_function_make(lambda_inner_logic, lambda_inner);

  value_function_call(f);
}

void module_load() {
  value_int *num = value_int_make(42);

  lambda_hello_closure* lambda_hello = malloc(sizeof(lambda_hello_closure));
  lambda_hello->num = num;

  value_function *world = value_function_make(lambda_hello_logic, lambda_hello);

  value_function_call(world);
}

int main() {
  module_load();
}
