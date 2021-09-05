#include <stdio.h>

#include "entry.h"

#include "values.h"

/**
 * Entrypoint
 */
int main() {
  types_init();
  values_init();

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
  printf("sizeof(t_boolean): %ld\n", sizeof(t_boolean));

  printf(" -- value type -- \n");
  printf("sizeof(t_type): %ld\n", sizeof(t_type));
  printf("sizeof(t_content): %ld\n", sizeof(t_content));
  printf("sizeof(t_value): %ld\n", sizeof(t_value));

  printf(" -- runtime type -- \n");
  printf("sizeof(t_object): %ld\n", sizeof(t_object));
  printf("sizeof(t_variable): %ld\n", sizeof(t_variable));

  printf(" -- type hierachy -- \n");
  printf("type_is(type_object, type_root): %hhu\n", type_is(type_object, type_root));
  printf("type_is(type_boolean, type_root): %hhu\n", type_is(type_boolean, type_root));
  printf("type_is(type_null, type_root): %hhu\n", type_is(type_null, type_root));
  printf("type_is(type_string, type_root): %hhu\n", type_is(type_string, type_root));
  printf("type_is(type_null, type_string): %hhu\n", type_is(type_null, type_string));

  if (main_module != NULL) {
    printf(" -- main module -- \n");
    main_module();
    printf(" -- end module -- \n");
  }
}

/**
 * TestModule
 */
void f_block(t_object *stack) {

}

t_value *f_lambda(t_object *closure) {
  return object_get(closure, 0x001)->value;
}

t_value *hello_lambda(t_object *closure) {
  // object prep
  return value_null;
}

t_value *lal_module(t_object *module) {
  // module prep
  t_value *__module_value = value_factory_object(type_object, 3);
  t_object *__module_object = (t_object *)__module_value;
  object_key(__module_object, 0, 0x000); // world
  object_key(__module_object, 1, 0x001); // num
  object_key(__module_object, 2, 0x002); // hello
  // statements
  object_get(__module_object, 0x001)->value = value_factory_i32(42);
  object_get(__module_object, 0x002)->value = value_factory_i32(22); // TODO (should be a function alloc)
  object_get(__module_object, 0x000)->value = object_get(__module_object, 0x002)->value;

  printf("world key: %d\n", __module_object->variables[0].key);
  printf("world value: %d\n", __module_object->variables[0].value->content.i32);
  printf("num key: %d\n", __module_object->variables[1].key);
  printf("num value: %d\n", __module_object->variables[1].value->content.i32);
  printf("hello key: %d\n", __module_object->variables[2].key);
  printf("hello value: %d\n", __module_object->variables[2].value->content.i32);

  printf("returned value: %d\n", f_lambda(__module_object)->content.i32);
  return __module_value;
}

