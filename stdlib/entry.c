#include "entry.h"

#include <stdio.h>

/**
 * Utils
 */
t_value *value_number_factory_i32(t_i32 number) {
  t_value *value = calloc(1, sizeof(t_value));
  value->type = type_i32;
  value->content.i32 = number;
  return value;
}

/**
 * Entrypoint
 */
int main() {
  type_init();

  printf(" -- interfaces -- \n");
  printf("type_i32: %p\n", (void*)type_i32);
  printf("type_i64: %p\n", (void*)type_i64);
  printf("type_string: %p\n", (void*)type_string);

  printf(" -- unsigned integers -- \n");
  printf("sizeof(t_u8): %ld\n", sizeof(t_u8));
  printf("sizeof(t_u16): %ld\n", sizeof(t_u16));
  printf("sizeof(t_u32): %ld\n", sizeof(t_u32));
  printf("sizeof(t_u64): %ld\n", sizeof(t_u64));

  printf(" -- signed integers -- \n");
  printf("sizeof(t_i8): %ld\n", sizeof(t_i8));
  printf("sizeof(t_i16): %ld\n", sizeof(t_i16));
  printf("sizeof(t_i32): %ld\n", sizeof(t_i32));
  printf("sizeof(t_i64): %ld\n", sizeof(t_i64));

  printf(" -- floating points -- \n");
  printf("sizeof(t_f32): %ld\n", sizeof(t_f32));
  printf("sizeof(t_f64): %ld\n", sizeof(t_f64));

  printf(" -- content types -- \n");
  printf("sizeof(t_object): %ld\n", sizeof(t_object));
  printf("sizeof(t_function): %ld\n", sizeof(t_function));
  printf("sizeof(t_string): %ld\n", sizeof(t_string));

  printf(" -- value type -- \n");
  printf("sizeof(t_type): %ld\n", sizeof(t_type));
  printf("sizeof(t_content): %ld\n", sizeof(t_content));
  printf("sizeof(t_value): %ld\n", sizeof(t_value));

  printf(" -- runtime type -- \n");
  printf("sizeof(t_scope): %ld\n", sizeof(t_scope));
  printf("sizeof(t_variable): %ld\n", sizeof(t_variable));

  if (main_module != NULL) {
    main_module();
  }
}

/**
 * TestModule
 */
t_object *lal_module() {
  // module header
  t_object *self = calloc(1, sizeof(t_object));
  self->fields.size = 2;
  self->fields.variables = calloc(2, sizeof(t_value));
  // variables
  t_variable *a = &self->fields.variables[0];
  t_variable *b = &self->fields.variables[1];

  a->value = value_number_factory_i32(42);

  b->value = value_number_factory_i32(20);
  b->value = value_number_factory_i32(10);

  self->fields.variables[0].value = value_number_factory_i32(32);

  printf("a: %d\n", a->value->content.i32);
  printf("b: %d\n", b->value->content.i32);
  return NULL;
}
t_object *(*main_module)() = lal_module;

