#include <stdio.h>

#include "entry.h"

#include "values.h"

/**
 * Entrypoint
 */
int main() {
  types_init();
  values_init();
  scopes_init();

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

  printf(" -- type hierachy -- \n");
  printf("type_is(type_object, type_value): %hhu\n", type_is(type_object, type_value));
  printf("type_is(type_boolean, type_value): %hhu\n", type_is(type_boolean, type_value));
  printf("type_is(type_null, type_value): %hhu\n", type_is(type_null, type_value));
  printf("type_is(type_null, type_string): %hhu\n", type_is(type_null, type_string));

  printf(" -- main module -- \n");
  if (main_module != NULL) {
    main_module();
  }
}

/**
 * TestModule
 */
t_value *lal_module() {
  // module header
  t_object *self = calloc(1, sizeof(t_object));
  self->fields.size = 2;
  self->fields.items = calloc(2, sizeof(t_value));
  // items
  t_variable *a = &self->fields.items[0].variable;
  t_variable *b = &self->fields.items[1].variable;

  a->value = value_factory_i32(42);

  b->value = value_factory_i32(20);
  b->value = value_factory_i32(10);

  self->fields.items[0].variable.value = value_factory_i32(32);

  printf("a: %d\n", a->value->content.i32);
  printf("b: %d\n", b->value->content.i32);
  return NULL;
}
t_value *(*main_module)() = lal_module;

