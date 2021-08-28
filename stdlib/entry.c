
#include "entry.h"

#include <stdlib.h>
#include <stdio.h>

/**
 * Utils
 */
t_value *value_number_factory_i32(t_i32 number) {
  t_value *value = calloc(1, sizeof(t_value));
  value->type = type_i32;
  value->data.i32 = number;
  return value;
}

/**
 * Entrypoint
 */
int main() {
  type_i32 = type_factory(0);
  type_i64 = type_factory(0);
  type_string = type_factory(0);

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
  printf("sizeof(t_f128): %ld\n", sizeof(t_f128));

  printf(" -- runtime -- \n");
  printf("sizeof(t_object): %ld\n", sizeof(t_object));
  printf("sizeof(t_value): %ld\n", sizeof(t_value));
  printf("sizeof(t_type): %ld\n", sizeof(t_type));
  printf("sizeof(t_data): %ld\n", sizeof(t_data));
  printf("sizeof(t_variable): %ld\n", sizeof(t_variable));
  printf("sizeof(t_function): %ld\n", sizeof(t_function));

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
  self->fields_count = 2;
  self->fields_array = calloc(2, sizeof(t_value));
  // variables
  t_variable *a = &self->fields_array[0];
  t_variable *b = &self->fields_array[1];

  a->value = value_number_factory_i32(42);

  b->value = value_number_factory_i32(20);
  b->value = value_number_factory_i32(10);

  printf("a: %ld\n", a->value->data.i32);
  printf("b: %ld\n", b->value->data.i32);
  return NULL;
}
t_object *(*main_module)() = lal_module;

